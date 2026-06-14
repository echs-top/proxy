import os
import yaml
import requests
import ipaddress
import re

# ================= 域名结构定义 =================
class DomainRule:
    def __init__(self, raw):
        self.raw = raw
        if raw.startswith('+.'):
            self.base = raw[2:]
            self.exact = True
            self.sub = True
            self.weight = 0  # 排序权重最高
        elif raw.startswith('*.'):
            self.base = raw[2:]
            self.exact = False
            self.sub = True
            self.weight = 1
        else:
            self.base = raw
            self.exact = True
            self.sub = False
            self.weight = 2  # 排序权重最低
        self.parts = self.base.split('.')[::-1]

class TrieNode:
    def __init__(self):
        self.children = {}
        self.exact = False
        self.sub = False

def insert_trie(root, rule_obj):
    node = root
    for part in rule_obj.parts:
        if part not in node.children:
            node.children[part] = TrieNode()
        node = node.children[part]
    if rule_obj.exact: node.exact = True
    if rule_obj.sub: node.sub = True

def is_covered_by_trie(root, rule_obj):
    node = root
    for i, part in enumerate(rule_obj.parts):
        if part not in node.children:
            return False
        node = node.children[part]
        if i < len(rule_obj.parts) - 1:
            if node.sub: return True
        else:
            if (not rule_obj.exact or node.exact) and (not rule_obj.sub or node.sub):
                return True
    return False

# ================= 智能获取模块 =================
def fetch_and_parse(target, fmt, output_dir):
    # 1. 嗅探内联多项规则: '+.cn','www.baidu.com'
    if ',' in target and ('"' in target or "'" in target):
        items = re.findall(r"['\"]([^'\"]+)['\"]", target)
        if items:
            print(f"    [内联] 获取多项规则: {items}")
            return set(items)

    # 2. 嗅探单条内联规则: '+.cn'
    if target.startswith(("'", '"')) and target.endswith(("'", '"')):
        rule = target.strip("'\" ")
        print(f"    [内联] 获取单条规则: {rule}")
        return {rule} if rule else set()

    content = ""
    # 3. 嗅探网络直链
    if target.startswith('http://') or target.startswith('https://'):
        try:
            response = requests.get(target, timeout=15)
            response.raise_for_status()
            content = response.text
        except Exception as e:
            print(f"    [错误] 下载失败 {target}: {e}")
            return set()
    # 4. 嗅探本地完整路径与元规则兜底
    else:
        clean_target = target.lstrip('/')
        if os.path.exists(clean_target):
            local_path = clean_target
        else:
            local_path = os.path.join(output_dir, target)

        try:
            with open(local_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"    [错误] 读取本地失败 {local_path}: {e}")
            return set()

    result = set()
    if fmt == 'yaml':
        try:
            data = yaml.safe_load(content)
            if data and isinstance(data, dict) and 'payload' in data:
                for item in data['payload']:
                    item_str = str(item).strip("'\" ")
                    if item_str and not item_str.startswith('#'):
                        result.add(item_str)
        except Exception as e:
            print(f"    [错误] YAML 格式解析异常: {e}")
    elif fmt == 'list':
        for line in content.splitlines():
            clean_line = line.split('#')[0].strip("'\" ")
            if clean_line:
                result.add(clean_line)
    return result

# ================= 词法分析器 (支持 [ ] 块级) =================
def parse_lines_to_batches(lines):
    batches = []
    current_op = None
    current_items = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line or line.startswith('#'):
            i += 1
            continue
        
        parts = line.split(maxsplit=2)
        # 检测是否是 [ 开始的代码块
        if len(parts) >= 3 and parts[2].startswith('['):
            op = parts[0]
            block_lines = []
            i += 1
            # 持续抓取，直到遇到 ]
            while i < len(lines) and not lines[i].strip().startswith(']'):
                block_lines.append(lines[i].strip())
                i += 1
            
            if op == current_op:
                current_items.append(('block', block_lines))
            else:
                if current_op is not None:
                    batches.append((current_op, current_items))
                current_op = op
                current_items = [('block', block_lines)]
        elif len(parts) >= 3:
            op, fmt, target = parts[0], parts[1], parts[2]
            if op == current_op:
                current_items.append((fmt, target))
            else:
                if current_op is not None:
                    batches.append((current_op, current_items))
                current_op = op
                current_items = [(fmt, target)]
        i += 1
        
    if current_op is not None:
        batches.append((current_op, current_items))
    return batches

# ================= 递归运算引擎 =================
def compute_rules(batches, rule_type, list_dir, depth=0):
    indent = "  " * depth
    if rule_type == 'domain':
        master_rules = []
        batch_num = 1
        for op, items in batches:
            print(f"{indent}  -> 批次 {batch_num} [{op}] ({len(items)} 条源)")
            batch_num += 1
            batch_raw_set = set()
            
            for fmt, target in items:
                if fmt == 'block':
                    print(f"{indent}    [子块开启] 发现局部内联块，进入子集计算...")
                    inner_batches = parse_lines_to_batches(target)
                    inner_rules = compute_rules(inner_batches, rule_type, list_dir, depth + 1)
                    batch_raw_set.update(inner_rules)
                    print(f"{indent}    [子块结束] 局部推演完成，抛出 {len(inner_rules)} 条独立结果。")
                else:
                    batch_raw_set.update(fetch_and_parse(target, fmt, list_dir))
            
            if op == '+':
                new_rules = [DomainRule(x) for x in batch_raw_set]
                combined = master_rules + new_rules
                combined.sort(key=lambda r: (len(r.parts), not r.sub, not r.exact))
                trie = TrieNode()
                next_master = []
                for r in combined:
                    if not is_covered_by_trie(trie, r):
                        next_master.append(r)
                        insert_trie(trie, r)
                master_rules = next_master
            
            elif op == '-':
                exc_rules = [DomainRule(x) for x in batch_raw_set]
                exc_trie = TrieNode()
                for r in exc_rules: insert_trie(exc_trie, r)
                master_rules = [r for r in master_rules if not is_covered_by_trie(exc_trie, r)]

        return {r.raw for r in master_rules}

    elif rule_type == 'ip':
        master_ips_v4 = []
        master_ips_v6 = []
        batch_num = 1
        for op, items in batches:
            print(f"{indent}  -> 批次 {batch_num} [{op}] ({len(items)} 条源)")
            batch_num += 1
            batch_raw_set = set()
            
            for fmt, target in items:
                if fmt == 'block':
                    print(f"{indent}    [子块开启] 发现局部内联块，进入子集计算...")
                    inner_batches = parse_lines_to_batches(target)
                    inner_rules = compute_rules(inner_batches, rule_type, list_dir, depth + 1)
                    batch_raw_set.update(inner_rules)
                    print(f"{indent}    [子块结束] 局部推演完成，抛出 {len(inner_rules)} 条独立结果。")
                else:
                    batch_raw_set.update(fetch_and_parse(target, fmt, list_dir))
            
            batch_nets_v4 = []
            batch_nets_v6 = []
            for x in batch_raw_set:
                try:
                    net = ipaddress.ip_network(x, strict=False)
                    if net.version == 4: batch_nets_v4.append(net)
                    else: batch_nets_v6.append(net)
                except ValueError:
                    pass
            
            if op == '+':
                master_ips_v4 = list(ipaddress.collapse_addresses(master_ips_v4 + batch_nets_v4))
                master_ips_v6 = list(ipaddress.collapse_addresses(master_ips_v6 + batch_nets_v6))
            
            elif op == '-':
                next_master_v4 = []
                for inc in master_ips_v4:
                    if not any(inc.subnet_of(exc) for exc in batch_nets_v4):
                        next_master_v4.append(inc)
                master_ips_v4 = next_master_v4
                
                next_master_v6 = []
                for inc in master_ips_v6:
                    if not any(inc.subnet_of(exc) for exc in batch_nets_v6):
                        next_master_v6.append(inc)
                master_ips_v6 = next_master_v6

        return {str(net) for net in (master_ips_v4 + master_ips_v6)}

# ================= 顶层汇编流水线 =================
def process_file(filepath, out_filepath, rule_type, list_dir):
    print(f"\n>> 正在执行 [{rule_type}] 规则树: {os.path.basename(filepath)}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    batches = parse_lines_to_batches(lines)
    # 调用全新的递归推演引擎
    final_set = compute_rules(batches, rule_type, list_dir, depth=0)
    
    if rule_type == 'domain':
        final_rules = [DomainRule(x) for x in final_set]
        final_rules.sort(key=lambda r: (r.parts, r.weight))
        final_list = [r.raw for r in final_rules]
        
    elif rule_type == 'ip':
        nets_v4 = []
        nets_v6 = []
        for x in final_set:
            net = ipaddress.ip_network(x, strict=False)
            if net.version == 4: nets_v4.append(net)
            else: nets_v6.append(net)
        final_list = [str(net) for net in sorted(nets_v4)] + [str(net) for net in sorted(nets_v6)]
    
    with open(out_filepath, 'w', encoding='utf-8') as f:
        for item in final_list:
            f.write(item + '\n')
    print(f"  ✅ [构建完成] 合并去重排除后保留: {len(final_list)} 条规则\n")

# ================= 目录扫描与分段控制 =================
def process_directory(work_dir, list_dir, rule_type):
    if not os.path.exists(work_dir):
        return
    os.makedirs(list_dir, exist_ok=True)

    all_files = [f for f in os.listdir(work_dir) if f.endswith('.list')]
    special_files = [f for f in all_files if f.endswith('-ltsc.list') or f.endswith('-lite.list')]
    normal_files = [f for f in all_files if f not in special_files]

    if normal_files:
        print(f"\n==================== 第一阶段: [{rule_type}] 基础层级编译 ====================")
    for filename in normal_files:
        filepath = os.path.join(work_dir, filename)
        out_filepath = os.path.join(list_dir, filename)
        process_file(filepath, out_filepath, rule_type, list_dir)

    if special_files:
        print(f"\n==================== 第二阶段: [{rule_type}] 复合组件总装 ====================")
    for filename in special_files:
        filepath = os.path.join(work_dir, filename)
        out_filepath = os.path.join(list_dir, filename)
        process_file(filepath, out_filepath, rule_type, list_dir)

if __name__ == '__main__':
    process_directory('work/domain', 'list/domain', 'domain')
    process_directory('work/ip', 'list/ip', 'ip')
