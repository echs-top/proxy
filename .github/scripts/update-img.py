import os
import sys
import json
import shutil
import subprocess
import requests

# 获取 GitHub Token 提升 API 请求速率上限
TOKEN = os.environ.get("GITHUB_TOKEN")
HEADERS = {"Authorization": f"Bearer {TOKEN}"} if TOKEN else {}

IMG_CONFIG_PATH = "work/img.txt"
STATE_FILE = "img/.img_versions.json"

if not os.path.exists(IMG_CONFIG_PATH):
    print(f"配置文件 {IMG_CONFIG_PATH} 不存在，跳过图片更新。")
    sys.exit(0)

# 读取本地保存的 Commit Hash 记录
state = {}
if os.path.exists(STATE_FILE):
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            state = json.load(f)
    except Exception:
        pass

changed = False
os.makedirs("img", exist_ok=True)

with open(IMG_CONFIG_PATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

for line in lines:
    line = line.strip()
    if not line or line.startswith("#"): continue
    
    parts = line.split()
    if len(parts) != 4:
        print(f"  [跳过] 格式不正确: {line}")
        continue
        
    local_folder, repo, branch, remote_path = parts
    clean_remote_path = remote_path.strip("/")
    
    # 1. 调用 API 获取远程仓库对应目录的最新 Commit Hash
    api_url = f"https://api.github.com/repos/{repo}/commits/{branch}"
    if clean_remote_path:
        api_url += f"?path={clean_remote_path}"
        
    try:
        r = requests.get(api_url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        data = r.json()
        
        # 兼容 API 返回列表或单个对象的情况
        if isinstance(data, list) and len(data) > 0:
            latest_sha = data[0]["sha"]
        elif isinstance(data, dict) and "sha" in data:
            latest_sha = data["sha"]
        else:
            print(f"  [警告] [{local_folder}] 在 {repo} 中未找到路径 {remote_path} 的提交记录。")
            continue
    except Exception as e:
        print(f"  [错误] [{local_folder}] API 请求失败 ({repo}): {e}")
        continue
        
    current_sha = state.get(local_folder)
    local_dir_path = os.path.join("img", local_folder)
    
    # 检查是否需要更新
    if latest_sha == current_sha and os.path.exists(local_dir_path):
        print(f"  [跳过] [{local_folder}] 已是最新版本 ({latest_sha[:7]})。")
        continue
        
    print(f"\n>> 正在拉取 [{local_folder}] 从 {repo} (Commit: {latest_sha[:7]})...")
    
    # 2. 利用 Git 的 Sparse Checkout 进行极速局部下载
    temp_dir = f"temp_{local_folder}"
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
        
    try:
        clone_cmd = [
            "git", "clone", "--no-checkout", "--depth", "1", 
            "--filter=blob:none", "-b", branch, 
            f"https://github.com/{repo}.git", temp_dir
        ]
        if clean_remote_path:
            clone_cmd.insert(4, "--sparse")
            
        subprocess.run(clone_cmd, check=True, capture_output=True)
        
        if clean_remote_path:
            subprocess.run(["git", "sparse-checkout", "set", clean_remote_path], cwd=temp_dir, check=True, capture_output=True)
            
        subprocess.run(["git", "checkout", branch], cwd=temp_dir, check=True, capture_output=True)
        
        # 3. 完整覆盖目标文件夹
        if os.path.exists(local_dir_path):
            shutil.rmtree(local_dir_path)
            
        src_path = os.path.join(temp_dir, clean_remote_path.replace("/", os.sep))
        shutil.copytree(src_path, local_dir_path, ignore=shutil.ignore_patterns(".git"))
        
        state[local_folder] = latest_sha
        changed = True
        print(f"  ✅ [{local_folder}] 更新成功！")
        
    except subprocess.CalledProcessError as e:
        print(f"  ❌ [{local_folder}] Git 拉取失败: {e.stderr.decode('utf-8', errors='ignore')}")
    except Exception as e:
        print(f"  ❌ [{local_folder}] 覆盖失败: {e}")
    finally:
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

# 若有更新，保存最新的 commit 状态
if changed:
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)
