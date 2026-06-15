import os
import sys
import json
import shutil
import subprocess
import requests
import tarfile

# 获取 GitHub Token 提升 API 请求速率并获得 Release 写入权限
TOKEN = os.environ.get("GITHUB_TOKEN")
HEADERS = {"Authorization": f"Bearer {TOKEN}"} if TOKEN else {}

# ================= 核心沙盒隔离机制 =================
ENV_DIR = os.path.expanduser("~/.cache/zashboard_env")
os.makedirs(ENV_DIR, exist_ok=True)

STATE_FILE = os.path.join(ENV_DIR, "state.json")
# 【修改点】将版本记录升级为包含版本和体积的 JSON 数据包
INFO_OUT = os.path.join(ENV_DIR, "zash_info.json")
NODE_CACHE = os.path.join(ENV_DIR, "node_modules")
BUN_CACHE = os.path.join(ENV_DIR, "bun_cache")
WORK_DIR = os.path.join(ENV_DIR, "temp_repo")

ZIP_STANDARD = os.path.join(ENV_DIR, "dist.zip")
ZIP_LXGW = os.path.join(ENV_DIR, "dist-lxgwwenkai-only.zip")

os.makedirs(BUN_CACHE, exist_ok=True)

# ================= 1. 检测 Zashboard 是否有更新 =================
zash_api = "https://api.github.com/repos/echs-top/zashboard/commits/main"
try:
    r = requests.get(zash_api, headers=HEADERS, timeout=15)
    r.raise_for_status()
    zash_sha = r.json().get("sha")
except Exception as e:
    print(f"❌ 获取 Zashboard 最新状态失败: {e}")
    sys.exit(1)

state = {}
if os.path.exists(STATE_FILE):
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            state = json.load(f)
    except Exception:
        pass

if state.get("zashboard_sha") == zash_sha:
    print("✅ Zashboard 仓库主分支无更新，停止后续步骤。")
    sys.exit(0)

# ================= 2. 检测并提取最新版 Bun =================
bun_api = "https://api.github.com/repos/echs-top/gonav/releases/latest"
try:
    r = requests.get(bun_api, headers=HEADERS, timeout=15)
    r.raise_for_status()
    bun_tag = r.json().get("tag_name")
except Exception as e:
    print(f"❌ 获取 Bun (gonav) 最新状态失败: {e}")
    sys.exit(1)

bun_bin_path = os.path.join(BUN_CACHE, "bun")
if state.get("bun_tag") != bun_tag or not os.path.exists(bun_bin_path):
    print(f"🔄 发现 Bun 更新或缓存丢失 ({bun_tag})，正在下载...")
    tar_url = "https://github.com/echs-top/gonav/releases/latest/download/gonav-linux_64.tar.gz"
    tar_path = os.path.join(ENV_DIR, "bun_temp.tar.gz")
    
    r = requests.get(tar_url, stream=True)
    with open(tar_path, "wb") as f:
        for chunk in r.iter_content(1024*1024):
            f.write(chunk)
            
    with tarfile.open(tar_path, "r:gz") as tar:
        for member in tar.getmembers():
            if member.name.endswith("bun"):
                member.name = "bun"
                tar.extract(member, path=BUN_CACHE)
                break
                
    os.remove(tar_path)
    os.chmod(bun_bin_path, 0o755)
    print("  ✅ Bun 下载与提取完成")

# ================= 3. 克隆、部署与多重编译 =================
if os.path.exists(WORK_DIR):
    shutil.rmtree(WORK_DIR)

print("\n>> 正在克隆 Zashboard 仓库 (沙盒环境)...")
subprocess.run(["git", "clone", "--depth", "1", "-b", "main", "https://github.com/echs-top/zashboard.git", WORK_DIR], check=True)

if os.path.exists(NODE_CACHE):
    shutil.move(NODE_CACHE, os.path.join(WORK_DIR, "node_modules"))

shutil.copy(bun_bin_path, os.path.join(WORK_DIR, "bun"))

print("\n>> 执行依赖安装 (bun install)...")
subprocess.run(["./bun", "install"], cwd=WORK_DIR, check=True)

print("\n>> 编译标准版本 (bun run build)...")
subprocess.run(["./bun", "run", "build"], cwd=WORK_DIR, check=True)
print("  打包最高压缩率 dist.zip...")
subprocess.run(["zip", "-9", "-r", ZIP_STANDARD, "dist"], cwd=WORK_DIR, check=True)

print("\n>> 编译霞鹜文楷专版 (bun run build:lxgwwenkai-only)...")
shutil.rmtree(os.path.join(WORK_DIR, "dist"))
subprocess.run(["./bun", "run", "build:lxgwwenkai-only"], cwd=WORK_DIR, check=True)
print("  打包最高压缩率 dist-lxgwwenkai-only.zip...")
subprocess.run(["zip", "-9", "-r", ZIP_LXGW, "dist"], cwd=WORK_DIR, check=True)

if os.path.exists(NODE_CACHE):
    shutil.rmtree(NODE_CACHE)
shutil.move(os.path.join(WORK_DIR, "node_modules"), NODE_CACHE)

# ================= 4. 发布与状态更新 =================
with open(os.path.join(WORK_DIR, "package.json"), "r", encoding="utf-8") as f:
    pkg = json.load(f)
    version = pkg.get("version", "unknown")

print(f"\n>> 正在发布到 Releases (Tag: zashboard, 覆盖模式)...")
os.environ["GH_TOKEN"] = TOKEN

check_release = subprocess.run(["gh", "release", "view", "zashboard"], capture_output=True)
if check_release.returncode == 0:
    subprocess.run(["gh", "release", "edit", "zashboard", "--notes", f"v{version}"], check=True)
    subprocess.run(["gh", "release", "upload", "zashboard", ZIP_STANDARD, ZIP_LXGW, "--clobber"], check=True)
else:
    subprocess.run(["gh", "release", "create", "zashboard", ZIP_STANDARD, ZIP_LXGW, "--title", "zashboard", "--notes", f"v{version}"], check=True)

# ================= 5. 沙盒清理与状态固化 =================
# 【修改点】在清理沙盒前，精准计算文件体积并写入 json 给下一个环节
size_standard_mb = f"{os.path.getsize(ZIP_STANDARD) / (1024 * 1024):.2f}MB"
size_lxgw_mb = f"{os.path.getsize(ZIP_LXGW) / (1024 * 1024):.2f}MB"

info = {
    "version": version,
    "dist_size": size_standard_mb,
    "lxgw_size": size_lxgw_mb
}

with open(INFO_OUT, "w", encoding="utf-8") as f:
    json.dump(info, f, ensure_ascii=False)

state["zashboard_sha"] = zash_sha
state["bun_tag"] = bun_tag
with open(STATE_FILE, "w", encoding="utf-8") as f:
    json.dump(state, f, indent=2, ensure_ascii=False)

for temp_target in [WORK_DIR, ZIP_STANDARD, ZIP_LXGW]:
    if os.path.exists(temp_target):
        if os.path.isdir(temp_target):
            shutil.rmtree(temp_target)
        else:
            os.remove(temp_target)

print(f"🚀 Zashboard v{version} 发布全流程执行完毕，沙盒已清理！")
