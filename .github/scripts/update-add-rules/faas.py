import os, requests
os.makedirs('work/list', exist_ok=True)
urls = [
    "https://raw.githubusercontent.com/xingpingcn/enhanced-FaaS-in-China/main/Cf.json",
    "https://raw.githubusercontent.com/xingpingcn/enhanced-FaaS-in-China/main/Netlify.json",
    "https://raw.githubusercontent.com/xingpingcn/enhanced-FaaS-in-China/main/Vercel.json"
]
faas_ips = set()
for url in urls:
    print(f"LOG: Fetching {url}")
    r = requests.get(url, timeout=20, headers={'User-Agent': 'Mozilla/5.0'})
    r.raise_for_status()
    for top_value in r.json().values():
        if isinstance(top_value, dict) and "result" in top_value and isinstance(top_value["result"], dict):
            for ip_list in top_value["result"].values():
                if isinstance(ip_list, list):
                    faas_ips.update({f"{str(ip).strip()}/32" if '/' not in str(ip) else str(ip).strip() for ip in ip_list if str(ip).strip()})
with open('work/list/enhanced-FaaS-in-China_ip.list', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sorted(faas_ips)) + '\n')
print("✅ enhanced-FaaS-in-China processed.")
