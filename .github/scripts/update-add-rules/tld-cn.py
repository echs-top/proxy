import os
import requests

# 确保输出目录存在
os.makedirs('work/list', exist_ok=True)

url = "https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/tld-cn"
print(f"LOG: Fetching {url}")

# 发起请求
r = requests.get(url, timeout=20, headers={'User-Agent': 'Mozilla/5.0'})
r.raise_for_status()

tld_list = []
for line in r.text.splitlines():
    # 巧妙处理：按 # 切割取第一部分，既能去整行注释，也能去行尾的内联注释
    clean_line = line.split('#')[0].strip()
    
    # 过滤掉空行
    if clean_line:
        tld_list.append(f"+.{clean_line}")

# 保存处理后的文件
output_file = 'work/list/tld-cn_domain.list'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(tld_list) + '\n')

print("✅ tld-cn processed.")
