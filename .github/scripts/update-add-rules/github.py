import os, requests
os.makedirs('work/list', exist_ok=True)
url = "https://api.github.com/meta"
print(f"LOG: Fetching {url}")
r = requests.get(url, timeout=20, headers={'User-Agent': 'Mozilla/5.0'})
r.raise_for_status()
data = r.json()
domains = set()
keys = ['website', 'copilot', 'packages', 'actions', 'codespaces']
if 'domains' in data:
    for k in keys:
        if k in data['domains'] and isinstance(data['domains'][k], list):
            domains.update(data['domains'][k])
    if 'actions_inbound' in data['domains'] and isinstance(data['domains']['actions_inbound'], dict):
        for sub_v in data['domains']['actions_inbound'].values():
            if isinstance(sub_v, list):
                domains.update(sub_v)
final = sorted({('+' + d[1:]) if d.startswith('*.') else d for d in domains})
with open('work/list/github_domain.list', 'w', encoding='utf-8') as f:
    f.write('\n'.join(final) + '\n')
print("✅ GitHub Meta processed.")
