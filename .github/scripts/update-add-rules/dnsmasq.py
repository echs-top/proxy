import os, requests, re
os.makedirs('work/list', exist_ok=True)
url = "https://raw.githubusercontent.com/felixonmars/dnsmasq-china-list/refs/heads/master/accelerated-domains.china.conf"
print(f"LOG: Fetching {url}")
r = requests.get(url, timeout=20, headers={'User-Agent': 'Mozilla/5.0'})
r.raise_for_status()
domains = re.findall(r'^server=/([^/]+)/', r.text, re.MULTILINE)
with open('work/list/dnsmasq-china_domain.list', 'w', encoding='utf-8') as f:
    f.write('\n'.join([f"+.{d}" for d in domains if d]) + '\n')
print("✅ dnsmasq-china processed.")
