import os
import re
import subprocess
from datetime import datetime

total_rules_sum = 0
total_size_bytes = 0

if os.path.exists('mihomo.yaml'):
    with open('mihomo.yaml', 'r', encoding='utf-8') as f:
        yaml_lines = f.readlines()
        
    provider_names = []
    in_providers = False
    indent_level = None
    
    for line in yaml_lines:
        if line.strip().startswith('#'): 
            continue
        if line.startswith('rule-providers:'):
            in_providers = True
            continue
        if in_providers:
            if len(line.strip()) > 0 and not line.startswith(' '):
                in_providers = False
                continue
            match = re.match(r'^(\s+)([a-zA-Z0-9\-@_]+):', line)
            if match:
                current_indent = len(match.group(1))
                if indent_level is None:
                    indent_level = current_indent
                if current_indent == indent_level:
                    provider_names.append(match.group(2))

    for provider in provider_names:
        is_ip = provider.endswith('_ip')
        base_name = provider[:-3] if is_ip else provider
        
        list_dir = 'list/ip' if is_ip else 'list/domain'
        list_filepath = os.path.join(list_dir, f"{base_name}.list")
        if os.path.exists(list_filepath):
            with open(list_filepath, 'r', encoding='utf-8') as f:
                total_rules_sum += sum(1 for line in f if line.strip())
                
        mrs_dir = 'mrs/ip' if is_ip else 'mrs/domain'
        mrs_filepath = os.path.join(mrs_dir, f"{base_name}.mrs")
        if os.path.exists(mrs_filepath):
            total_size_bytes += os.path.getsize(mrs_filepath)

total_size_kb = f"{total_size_bytes / 1024:.2f}" if total_size_bytes > 0 else "0.00"

def get_file_info(filepath):
    if not os.path.exists(filepath):
        return None, None
    
    # 统计行数
    with open(filepath, 'r', encoding='utf-8') as f:
        count = sum(1 for line in f if line.strip())
        
    try:
        # 1. 先检查文件在当前工作区是否被修改了 (未提交的变动)
        status_result = subprocess.run(
            ['git', 'status', '--porcelain', filepath], 
            capture_output=True, text=True, check=True
        )
        
        # 如果有输出，说明文件被修改了或是新增的，那更新日期就是当前时间
        if status_result.stdout.strip():
            date_str = datetime.now().strftime("%Y.%m.%d")
        else:
            # 2. 如果没被修改，说明这次没更新它，去 Git 历史里查上一次提交的日期
            log_result = subprocess.run(
                ['git', 'log', '-1', '--format=%cd', '--date=format:%Y.%m.%d', filepath], 
                capture_output=True, text=True, check=True
            )
            date_str = log_result.stdout.strip()
            
            # 如果什么都没查到（异常情况防范）
            if not date_str:
                date_str = datetime.now().strftime("%Y.%m.%d")
                
    except Exception as e:
        # 任何报错兜底
        date_str = datetime.now().strftime("%Y.%m.%d")
        
    return count, date_str

with open('README.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_rule = None
new_lines = []

for line in lines:
    if line.startswith('MRS：'):
        match = re.search(r'([(（].*)', line)
        tail = match.group(1) if match else ""
        if tail and not tail.startswith(' '):
            tail = ' ' + tail
        new_line = f"MRS：`{total_size_kb}KB` `{total_rules_sum}`{tail}\n"
        new_lines.append(new_line)
        continue

    match = re.match(r'^-\s+([a-zA-Z0-9\-@_]+)[：:]', line)
    if match:
        current_rule = match.group(1)
        new_lines.append(line)
        continue
        
    if 'Update：' in line and current_rule:
        if current_rule.endswith('_ip'):
            filename = current_rule[:-3] + '.list'
            filepath = os.path.join('list/ip', filename)
        else:
            filename = current_rule + '.list'
            filepath = os.path.join('list/domain', filename)
            
        count, date_str = get_file_info(filepath)
        
        if count is not None:
            indent_match = re.match(r'^(\s*)Update：', line)
            indent = indent_match.group(1) if indent_match else "  "
            new_line = f"{indent}Update：`{date_str}` `{count}`  \n"
            new_lines.append(new_line)
        else:
            new_lines.append(line)
        current_rule = None
    else:
        new_lines.append(line)

with open('README.md', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
