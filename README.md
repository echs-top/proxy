### 声明

本项目仅供技术交流与学术研究使用，模板跟随内核维护更新，欢迎issues共同维护(如增加分流域名、广告拦截误杀、更好的方案建议等等)

自用优先、TUN模式、激进设置、完善分流、简单策略、地区分组

### 模板

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/refs/heads/main/mihomo.yaml)、[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/refs/heads/main/mihomo_smart.yaml)

### 脚本
[https://mihomo.echs.top/mihomo.js](https://mihomo.echs.top/mihomo.js)

[https://mihomo.echs.top/mihomo_smart.js](https://mihomo.echs.top/mihomo_smart.js)

### 预览

| ![](https://raw.githubusercontent.com/echs-top/proxy/main/img/preview3.webp) | ![](https://raw.githubusercontent.com/echs-top/proxy/main/img/preview4.webp) |
| :---: | :---: |

### 占用

裸核：约40～150MB(smart分支占用偏高)

MRS：`909.01KB` `161455` (含dnsmasq-china DNS分流规则)

### 规则

可引用规则：

- ads：[秋风](https://awavenue.top) + [217heidai](https://github.com/217heidai/adblockfilters)+[PATREON](https://pgl.yoyo.org/adservers/) + [增加](https://github.com/echs-top/proxy/blob/main/work/list/ad_add_domain.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/ad_del_domain.list)  
  较精简的国内外去广告域名规则  
  Update：`2026.06.14` `8666`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/ads.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ads.mrs)

- proxy@direct：[补充](https://github.com/echs-top/proxy/blob/main/work/list/proxy%40direct_domain.list) + [google-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/google-cn.list) + [apple-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/apple-cn.list) - '+.cn'  
  国外域名前置直连规则，如FCM  
  Update：`2026.06.09` `313`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/proxy@direct.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy@direct.mrs)

- ai：[ai](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/ai.list) + [category-ai-!cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.list) - [category-ai-cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-cn.list)  
  国外AI域名规则  
  Update：`2026.06.06` `172`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/ai.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ai.mrs)

- google：[google](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.list) - ([google-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/google-cn.list) - '+.cn')  
  GOOGLE域名规则  
  Update：`2026.06.14` `797`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/google.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/google.mrs)

- download：[补充](https://github.com/echs-top/proxy/blob/main/work/list/download_domain.list) + [pikpak](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/pikpak.list)  
  下载相关域名规则  
  Update：`2026.06.14` `7`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/download.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/download.mrs)

- safe：[补充](https://github.com/echs-top/proxy/blob/main/work/list/safe_domain.list) + [category-finance](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-finance.list) - [category-finance@cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-finance@cn.list) + [twitter](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/twitter.list) + [paypal](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/paypal.list) - '+.cn'  
  风控、支付、节点高要求域名规则  
  Update：`2026.06.14` `846`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/safe.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/safe.mrs)

- media：[category-media](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-media.list) - [category-media-cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-media-cn.list) + [netflix](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.list) - '+.cn'  
  海外媒体规则  
  Update：`2026.06.14` `1596`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/media.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/media.mrs)

- proxy：[proxy](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/proxy.list) + ([tld-not-cn](https://raw.githubusercontent.com/wwqgtxx/clash-rules/release/tld-not-cn.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/tld-not-cn@del_domain.list)) +[github api](https://api.github.com/meta) + [增加](https://github.com/echs-top/proxy/blob/main/work/list/proxy_add_domain.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/proxy_del_domain.list)  
  代理域名规则  
  Update：`2026.06.14` `20422`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/proxy.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy.mrs)

- cn：[cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list) + [备案域名](https://www.nodeseek.com/post-464238-1)  
  国内域名规则  
  Update：`2026.06.14` `31448`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/cn.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/cn.mrs)

- direct：cn + [games-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/games-cn.list) + [apple-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/apple-cn.list) + [microsoft-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/microsoft-cn.list) + [private](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/private.list) + [增加](https://github.com/echs-top/proxy/blob/main/work/list/direct_add_domain.list) - [删除](https://github.com/echs-top/proxy/blob/main/work/list/direct_del_domain.list)  
  直连域名规则  
  Update：`2026.06.14` `31834`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/direct.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/direct.mrs)

- dnsmasq-china：[dnsmasq-china](https://github.com/felixonmars/dnsmasq-china-list)  
  dnsmasq-china域名规则，可作为DNS分流补充规则  
  Update：`2026.06.14` `112150`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/dnsmasq-china.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/dnsmasq-china.mrs)

- telegram_ip：[telegram api](https://core.telegram.org/resources/cidr.txt)  
  TELEGRAM IP规则  
  Update：`2026.06.01` `11`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/telegram.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/telegram.mrs)

- enhanced-FaaS-in-China_ip：[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)  
  少量vercel/netlify/cloudflare优选IP规则  
  Update：`2026.06.14` `23`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/enhanced-FaaS-in-China.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/enhanced-FaaS-in-China.mrs)

- google_ip：[google api](https://www.gstatic.com/ipranges/goog.txt)  
  GOOGLE IP规则  
  Update：`2026.06.14` `111`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/google.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/google.mrs)

- safe_ip：[twitter](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/twitter.list)  
  风控、支付、节点高要求IP规则  
  Update：`2026.06.14` `21`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/safe.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/safe.mrs)

- media_ip：[netflix](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/netflix.list)  
  海外媒体IP规则  
  Update：`2026.06.14` `83`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/media.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/media.mrs)

- cn_ip：[china-operator-ip](https://gaoyifan.github.io/china-operator-ip/china46.txt) + [苍狼山庄](https://ispip.clang.cn) + [OpenIPDB](https://raw.githubusercontent.com/metowolf/iplist/master/data/special/china.txt) + [zhufengme/block_cn_files](https://raw.githubusercontent.com/zhufengme/block_cn_files/master/cn_ip_list.txt)  
  国内IP规则  
  Update：`2026.06.14` `8387`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/cn.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/cn.mrs)

- direct_ip：cn_ip + 'enhanced-FaaS-in-China_ip' + [private_ip](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/privateip.list)  
  直连IP规则  
  Update：`2026.06.14` `8426`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/ip/direct.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/direct.mrs)

谨慎引用！lite规则：

- proxy-lite：proxy - ads - google - media  
  精简代理域名规则  
  Update：`2026.06.14` `18789`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/proxy-lite.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy-lite.mrs)

- direct-lite：direct - ads - proxy@direct - proxy  
  精简直连域名规则  
  Update：`2026.06.14` `31314`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/direct-lite.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/direct-lite.mrs)

- dnsmasq-china-lite：'dnsmasq-china' - ads - proxy@direct - proxy - direct  
  精简dnsmasq-china域名规则  
  Update：`2026.06.14` `98729`  
  规则链接：[list](https://raw.githubusercontent.com/echs-top/proxy/main/list/domain/dnsmasq-china-lite.list) / [mrs](https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/dnsmasq-china-lite.mrs)

更多规则推荐：

- [MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat)
- [DustinWin/ruleset_geodata](https://github.com/DustinWin/ruleset_geodata)
- [wwqgtxx/clash-rules](https://github.com/wwqgtxx/clash-rules)

### 引用

图标：[lipis/flag-icons](https://github.com/lipis/flag-icons)、[Semporia/Hand-Painted-icon](https://github.com/Semporia/Hand-Painted-icon)、[Vbaethon/HOMOMIX](https://github.com/Vbaethon/HOMOMIX)

DOH: 直连([阿里DNS](https://www.aliyun.com/product/dns)+[腾讯DNS](https://www.dnspod.cn/products/publicdns))、代理([Quad9](https://quad9.net)+[谷歌DNS](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)、[常见UA](https://config.net.cn/tools/UserAgent.html)、[ClashVergeRev](https://www.clashverge.dev/guide/term.html#ua)

CDN加速：[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)

### 客户端

**Android**：[Box(ROOT)](https://github.com/boxproxy/box)(通用)、[Bettbox](https://github.com/appshubcc/Bettbox)、[Flyclash](https://github.com/GtxFury/FlyClash-Android)(smart)

**Windows**：[minihomo(裸核)](https://github.com/bestruirui/minihomo)(通用)[uwp管理](https://github.com/Kindness-Kismet/WINUI3-loopback_manager)、[Bettbox](https://github.com/appshubcc/Bettbox)

**OpenClash**：[𝕄𝕀ℍ𝕆𝕄𝕆 的千种配置](https://github.com/HenryChiao/MIHOMO_YAMLS/blob/main/THEDOC/THE_REAL_README.md)