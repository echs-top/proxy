update: 2026.06.02

### 声明

本项目仅供技术交流与学术研究使用，跟随内核维护更新

### 模板

[mihomo.yaml](https://mihomo.echs.top/mihomo.yaml)、[mihomo_smart.yaml](https://mihomo.echs.top/mihomo_smart.yaml)

### 脚本

[https://mihomo.echs.top/mihomo.js](https://mihomo.echs.top/mihomo.js)

[https://mihomo.echs.top/mihomo_smart.js](https://mihomo.echs.top/mihomo_smart.js)

### 预览

| ![](https://raw.githubusercontent.com/echs-top/proxy/main/img/preview.webp) | ![](https://raw.githubusercontent.com/echs-top/proxy/main/img/preview2.webp) |
| :---: | :---: |

### 占用

裸核：约40～150MB(smart分支占用偏高)

MRS：约970KB(含DNS分流dnsmasq-china-lite约480KB)

### 备注

自用优先、TUN/VPN、地区策略、完善设置、严谨分流

规则：[MetaCubeX](https://github.com/MetaCubeX/meta-rules-dat)(部分)、[DustinWin](https://github.com/DustinWin/ruleset_geodata)(部分)、ads([秋风](https://awavenue.top)+[217heidai](https://github.com/217heidai/adblockfilters)+[PATREON](https://pgl.yoyo.org/adservers/))、[人机验证](https://github.com/echs-top/proxy/blob/main/list/domain/captcha.list)、[ai(work)](https://github.com/echs-top/proxy/blob/main/work/domain/ai.list)、[media(work)](https://github.com/echs-top/proxy/blob/main/work/domain/media.list)、[google(work)](https://github.com/echs-top/proxy/blob/main/work/domain/google.list)、cn-lite([cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list)+[备案域名](https://www.nodeseek.com/post-464238-1))、[cn(work)](https://github.com/echs-top/proxy/blob/main/work/domain/cn.list)、proxy([proxy](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/proxy.list)+[github](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.list))、[proxy-lite(work)](https://github.com/echs-top/proxy/blob/main/work/domain/proxy-lite.list)、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、[dnsmasq-china](https://github.com/felixonmars/dnsmasq-china-list)、[dnsmasq-china-lite(work)](https://github.com/echs-top/proxy/blob/main/work/domain/dnsmasq-china-lite.list)

注意：cn、proxy-lite、dnsmasq-china-lite为此模板定制(减少规则量)，若要改动规则请替换为cn-lite、proxy、dnsmasq-china。此外不建议将cn与proxy-lite调换顺序！

图标：[flag-icons](https://github.com/lipis/flag-icons)、[HOMOMIX](https://github.com/Vbaethon/HOMOMIX) ===> 使用[cloudflare](https://cloudflare.com)/[vercel](https://vercel.com)/[netlify](https://netlify.com)混合加速

DOH: 直连([阿里DNS](https://www.aliyun.com/product/dns)+[腾讯DNS](https://www.dnspod.cn/products/publicdns))、代理([Quad9](https://quad9.net)+[谷歌DNS](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)、[常见UA](https://config.net.cn/tools/UserAgent.html)、[ClashVergeRev](https://www.clashverge.dev/guide/term.html#ua)

### 客户端

**Android**：[Box(root)](https://github.com/boxproxy/box)(通用)、[Bettbox](https://github.com/appshubcc/Bettbox)、[Flyclash](https://github.com/GtxFury/FlyClash-Android)(smart)

**Windows**：[minihomo(裸核)](https://github.com/bestruirui/minihomo)(通用)[uwp管理](https://github.com/Kindness-Kismet/WINUI3-loopback_manager)、[ClashVergeRev](https://github.com/clash-verge-rev/clash-verge-rev)

**OpenClash**：[𝕄𝕀ℍ𝕆𝕄𝕆 的千种配置](https://github.com/HenryChiao/MIHOMO_YAMLS/blob/main/THEDOC/THE_REAL_README.md)
