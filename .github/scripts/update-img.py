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

# 将状态文件存放在操作系统的独立缓存目录，彻底远离 Git 仓库
STATE_DIR = os.path.expanduser("~/.cache/img_state")
STATE_FILE = os.path.join(STATE_DIR, "versions.json")
os.makedirs(STATE_DIR, exist_ok=True)

if not os.path.exists(IMG_CONFIG_PATH):
    print(f"配置文件 {IMG_CONFIG_PATH} 不存在，跳过图片更新。")
    sys.exit(0)

# 读取缓存的 Commit Hash 记录
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
    
    temp_dir = f"temp_{local_folder}"
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
        
    try:
        # 【此处已修复】修正为双减号 --filter=blob:none
        clone_cmd = [
            "git", "clone", "--no-checkout", "--depth", "1", 
            "--filter=blob:none", "-b", branch
        ]
        
        if clean_remote_path:
            clone_cmd.append("--sparse")
            
        clone_cmd.extend([f"https://github.com/{repo}.git", temp_dir])
            
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
        err_msg = e.stderr.decode('utf-8', errors='ignore') if e.stderr else "未知错误"
        print(f"  ❌ [{local_folder}] Git 拉取失败: {err_msg}")
    except Exception as e:
        print(f"  ❌ [{local_folder}] 覆盖失败: {e}")
    finally:
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

# 若有更新，保存最新的 commit 状态至独立缓存目录
if changed:
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)
