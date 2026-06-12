import os, requests
os.makedirs('work/list', exist_ok=True)
url = "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=plain&showintro=0&mimetype=plaintext"
print(f"LOG: Fetching {url}")
r = requests.get(url, timeout=20, headers={'User-Agent': 'Mozilla/5.0'})
r.raise_for_status()
ad_list = [f"+.{line.strip()}" for line in r.text.splitlines() if line.strip()]
with open('work/list/ad_peter_domain.list', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ad_list) + '\n')
print("✅ yoyo adservers processed.")
