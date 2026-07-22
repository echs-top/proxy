> 暂缓更新，忙于找工作中

### 前言/声明

本项目仅供技术交流与学术研究使用，模板跟随内核维护更新。

欢迎issues共同维护(如增加/删除分流域名、增加广告域名/删除误杀、更多规则建议等等)

**自用优先、TUN/VPN、激进设置、完善分流、多订阅组、地区策略**

### 模板 (多订阅)

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/refs/heads/main/mihomo.yaml)、[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/refs/heads/main/mihomo_smart.yaml)

### 脚本 (单订阅)
[https://mihomo.echs.top/mihomo.js](https://mihomo.echs.top/mihomo.js)

[https://mihomo.echs.top/mihomo_smart.js](https://mihomo.echs.top/mihomo_smart.js)

### 预览

| ![](img/readme/zashboard1.webp) | ![](img/readme/zashboard2.webp) | ![](img/readme/zashboard3.webp) |
| :---: | :---: | :---: |
| ![](img/readme/bettbox1.webp) | ![](img/readme/bettbox2.webp) | ![](img/readme/bettbox3.webp) |

### 占用

裸核：约40～150MB(smart分支占用偏高)

MRS：`939.68KB` `169984` (含dnsmasq-china DNS分流规则)

### 更新日志

[Github Commits](https://github.com/echs-top/proxy/commits/main)、[Telegram Channel](https://t.me/echsfxy_proxy)

### Zashboard

增加了霞鹜文楷，更新至 `3.12.1`

dist.zip `11.98MB`

[https://github.com/echs-top/proxy/releases/download/zashboard/dist.zip](https://github.com/echs-top/proxy/releases/download/zashboard/dist.zip)

dist-lxgwwenkai-only.zip `5.60MB`

[https://github.com/echs-top/proxy/releases/download/zashboard/dist-lxgwwenkai-only.zip](https://github.com/echs-top/proxy/releases/download/zashboard/dist-lxgwwenkai-only.zip)

### 规则

可引用规则：

- ads：[秋风](https://awavenue.top) + [217heidai](https://github.com/217heidai/adblockfilters)+[PATREON](https://pgl.yoyo.org/adservers/) + [增加](https://github.com/echs-top/proxy/blob/main/work/list/ad_add_domain.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/ad_del_domain.list)  
  较精简的国内外去广告域名规则  
  Update：`2026.07.23` `8804`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/ads.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ads.mrs)

- proxy@direct：[补充](https://github.com/echs-top/proxy/blob/main/work/list/proxy%40direct_domain.list) + [microsoft-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/microsoft-cn.list) + [apple-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/apple-cn.list) - '+.cn'  
  国外域名前置直连规则，如FCM  
  Update：`2026.07.11` `290`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/proxy@direct.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy@direct.mrs)

- ai：[ai](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/ai.list) + [category-ai-!cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.list) - [category-ai-cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-cn.list)  
  国外AI域名规则  
  Update：`2026.07.16` `179`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/ai.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ai.mrs)

- download：[补充](https://github.com/echs-top/proxy/blob/main/work/list/download_domain.list) + [pikpak](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/pikpak.list) + [docker](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/docker.list)  
  下载相关域名规则  
  Update：`2026.07.15` `32`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/download.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/download.mrs)

- safe：[补充](https://github.com/echs-top/proxy/blob/main/work/list/safe_domain.list) + [category-finance](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-finance.list) - [category-finance@cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-finance@cn.list) + [twitter](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/twitter.list) + [paypal](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/paypal.list) + [stripe](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/stripe.list) + [category-cryptocurrency](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-cryptocurrency.list) + [reddit](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/reddit.list) - '+.cn'  
  风控、支付、节点高要求域名规则  
  Update：`2026.07.22` `1094`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/safe.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/safe.mrs)

- google：[google](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.list) - ([google-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/google-cn.list) - '+.cn') - [youtube](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.list)  
  GOOGLE域名规则  
  Update：`2026.07.15` `626`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/google.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/google.mrs)

- media：[category-media](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-media.list) - [category-media-cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-media-cn.list) + [netflix](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.list) + [youtube](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.list) - '+.cn'  
  海外媒体规则  
  Update：`2026.07.02` `1773`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/media.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/media.mrs)

- proxy：[proxy](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/proxy.list) + ([tld-not-cn](https://raw.githubusercontent.com/wwqgtxx/clash-rules/release/tld-not-cn.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/tld-not-cn@del_domain.list)) +[github api](https://api.github.com/meta) + [增加](https://github.com/echs-top/proxy/blob/main/work/list/proxy_add_domain.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/proxy_del_domain.list)  
  代理域名规则  
  Update：`2026.07.23` `20595`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/proxy.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy.mrs)

- cn：[cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list) + [备案域名](https://www.nodeseek.com/post-464238-1)  
  国内域名规则  
  Update：`2026.07.23` `31589`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/cn.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/cn.mrs)

- direct：cn + [games-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/games-cn.list) + [apple-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/apple-cn.list) + [microsoft-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/microsoft-cn.list) + [private](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/private.list) + [增加](https://github.com/echs-top/proxy/blob/main/work/list/direct_add_domain.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/direct_del_domain.list)  
  直连域名规则  
  Update：`2026.07.23` `31998`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/direct.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/direct.mrs)

- dnsmasq-china：[dnsmasq-china](https://github.com/felixonmars/dnsmasq-china-list)  
  dnsmasq-china域名规则，可作为DNS分流补充规则  
  Update：`2026.07.21` `111429`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/dnsmasq-china.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/dnsmasq-china.mrs)

- telegram_ip：[telegram api](https://core.telegram.org/resources/cidr.txt)  
  TELEGRAM IP规则  
  Update：`2026.06.01` `11`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/telegram.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/telegram.mrs)

- enhanced-FaaS-in-China_ip：[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)  
  少量vercel/netlify/cloudflare优选IP规则  
  Update：`2026.07.23` `17`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/enhanced-FaaS-in-China.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/enhanced-FaaS-in-China.mrs)

- safe_ip：[twitter](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/twitter.list)  
  风控、支付、节点高要求IP规则  
  Update：`2026.07.17` `20`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/safe.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/safe.mrs)

- media_ip：[netflix](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/netflix.list)  
  海外媒体IP规则  
  Update：`2026.07.17` `108`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/media.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/media.mrs)

- google_ip：[google api](https://www.gstatic.com/ipranges/goog.txt)  
  GOOGLE IP规则  
  Update：`2026.07.21` `114`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/google.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/google.mrs)

- cn_ip：[china-operator-ip](https://gaoyifan.github.io/china-operator-ip/china46.txt) + [苍狼山庄](https://ispip.clang.cn) + [metowolf/iplist](https://raw.githubusercontent.com/metowolf/iplist/master/data/special/china.txt) + [zhufengme/block_cn_files](https://raw.githubusercontent.com/zhufengme/block_cn_files/master/cn_ip_list.txt)  
  国内IP规则  
  Update：`2026.07.23` `8629`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/cn.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/cn.mrs)

- direct_ip：cn_ip + 'enhanced-FaaS-in-China_ip' + [private_ip](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/privateip.list)  
  直连IP规则  
  Update：`2026.07.23` `8665`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/direct.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/direct.mrs)

谨慎引用！lite规则：

- proxy-lite：proxy - ads - google - media  
  精简代理域名规则  
  Update：`2026.07.23` `18957`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/proxy-lite.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy-lite.mrs)

- direct-lite：direct - ads - proxy@direct - proxy  
  精简直连域名规则  
  Update：`2026.07.23` `31421`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/direct-lite.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/direct-lite.mrs)

- dnsmasq-china-lite：'dnsmasq-china' - ads - proxy@direct - proxy - direct  
  精简dnsmasq-china域名规则  
  Update：`2026.07.23` `97890`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/dnsmasq-china-lite.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/dnsmasq-china-lite.mrs)

更多规则推荐：

- [MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat)
- [DustinWin/ruleset_geodata](https://github.com/DustinWin/ruleset_geodata)
- [wwqgtxx/clash-rules](https://github.com/wwqgtxx/clash-rules)

### 引用参考

图标：[lipis/flag-icons](https://github.com/lipis/flag-icons)、[Semporia/Hand-Painted-icon](https://github.com/Semporia/Hand-Painted-icon)、[Vbaethon/HOMOMIX](https://github.com/Vbaethon/HOMOMIX)

DOH: 直连([阿里DNS](https://www.aliyun.com/product/dns)+[腾讯DNS](https://www.dnspod.cn/products/publicdns))、代理([Quad9](https://quad9.net)+[谷歌DNS](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)、[常见UA](https://config.net.cn/tools/UserAgent.html)、[ClashVergeRev](https://www.clashverge.dev/guide/term.html#ua)

CDN加速：[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)

Zashboard: [echs-top/zashboard](https://github.com/echs-top/zashboard)

霞鹜文楷：[lxgw-wenkai-lite-webfont](https://www.npmjs.com/package/lxgw-wenkai-lite-webfont)

Action共同维护：[Gemini](gemini.google.com)、[Deepseek](https://www.deepseek.com)

### 客户端推荐

**Android**：[Box(ROOT裸核)](https://github.com/boxproxy/box)ᵃˡˡ、[Bettbox](https://github.com/appshubcc/Bettbox)、[Prizrak-Box](https://github.com/legiz-ru/Prizrak-Box)ˢᵐᵃʳᵗ

**Windows**：[minihomo(裸核工具)](https://github.com/bestruirui/minihomo)ᵃˡˡ、[Bettbox](https://github.com/appshubcc/Bettbox)、[Prizrak-Box](https://github.com/legiz-ru/Prizrak-Box)ˢᵐᵃʳᵗ

**OpenClash**：[𝕄𝕀ℍ𝕆𝕄𝕆 的千种配置](https://github.com/HenryChiao/MIHOMO_YAMLS/blob/main/THEDOC/THE_REAL_README.md)
