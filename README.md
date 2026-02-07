### 模板

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)、[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

### 备注

多订阅、追求精准、地区分组、Android/Windows

自定义: 
```
# 设置区
proxy-providers:
  link1: { <<: *providers, url: '订阅链接1', path: ./providers/link1.yaml }
  link2: { <<: *providers, url: '订阅链接2', path: ./providers/link2.yaml }
  link3: { <<: *providers, url: '订阅链接3', path: ./providers/link3.yaml }
# 策略分组
use: &use { use: [link1,link2] }
# 手动选择
select: &select { use: [link3] }
# 直连规则：cn-lite/cn-all 分应用代理优先轻量，tun优先全量
cn: &cn { <<: *cn-all }
# 代理规则：gfw/all 匹配到规则的代理域名能避免本地dns查询
proxy: &proxy { <<: *all }
# dns方案: dns-lite/dns-all 如果你不在乎DNS分流用dns-lite
scheme: &scheme { <<: *dns-all }
```

规则：[MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat)(部分)、[DustinWin/ruleset_geodata](https://github.com/DustinWin/ruleset_geodata)(部分)、[秋风去广告](https://awavenue.top)、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、cn_domain(合并去重:[cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn.list)与[备案域名](https://static-file-global.353355.xyz/rules/cn-additional-list-clash.yaml))、[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)、一些自用补充

图标：[lipis/flag-icons](https://github.com/lipis/flag-icons)、[Vbaethon/HOMOMIX](https://github.com/Vbaethon/HOMOMIX)

GITHUB加速：[gh-proxy](https://gh-proxy.com)

FCM hosts规则推荐: [Mice-Tailor-Infra/fcm-hosts-next](https://github.com/Mice-Tailor-Infra/fcm-hosts-next)

### 软件

**Android**:
[Box(magisk)](https://github.com/boxproxy/box)
[LiClash](https://t.me/appshub_channel)

**Windows**:
[minihomo(裸核)](https://github.com/bestruirui/minihomo)
[ClashVergeRev](https://github.com/clash-verge-rev/clash-verge-rev)

### 测速

mihomo缺少下载测速，找gemini写了一个本地sh脚本，通过mihomo api测速，默认使用 https://speed.cloudflare.com

脚本：[speedtest.sh](https://raw.githubusercontent.com/echs-top/proxy/heads/main/speedtest.sh)

环境需要: curl、jq

软件推荐：[MSYS2(windows)](https://github.com/msys2/msys2-installer)、[termux(android)](https://github.com/termux/termux-app)
