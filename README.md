### 声明

本项目仅供技术交流与学术研究使用，模板跟随内核维护更新，欢迎issues共同维护(如增加分流域名、广告拦截误杀、更好的方案建议等等)

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

自用优先、TUN/VPN、激进设置、严谨分流、地区分组

规则：[MetaCubeX](https://github.com/MetaCubeX/meta-rules-dat)(部分)、[DustinWin](https://github.com/DustinWin/ruleset_geodata)(部分)、ads([秋风](https://awavenue.top)+[217heidai](https://github.com/217heidai/adblockfilters)+[PATREON](https://pgl.yoyo.org/adservers/))、[人机验证](https://github.com/echs-top/proxy/blob/main/list/domain/captcha.list)、ai([ai](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/ai.list)+[category-ai-!cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.list)-[category-ai-cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-cn.list))、media([media](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/media.list)+[category-media](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-media.list)-[category-media-cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-media-cn.list)-[category-media@cn](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-media@cn.list))、[media-lite(work)](https://github.com/echs-top/proxy/blob/main/work/domain/media-lite.list)、google([google](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.list)+[google-play](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google-play.list))、[google-lite(work)](https://github.com/echs-top/proxy/blob/main/work/domain/google-lite.list)、proxy([proxy](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/proxy.list)+[github](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.list))、[proxy-lite(work)](https://github.com/echs-top/proxy/blob/main/work/domain/proxy-lite.list)、cn([cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list)+[备案域名](https://www.nodeseek.com/post-464238-1)+[apple-cb](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/apple-cn.list)+[microsoft-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/microsoft-cn.list)+[games-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/games-cn.list))、[cn-lite(work)](https://github.com/echs-top/proxy/blob/main/work/domain/cn-lite.list)、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、[dnsmasq-china](https://github.com/felixonmars/dnsmasq-china-list)、[dnsmasq-china-lite(work)](https://github.com/echs-top/proxy/blob/main/work/domain/dnsmasq-china-lite.list)

注意：*-lite规则为此模板精简定制版本(尽可能减少规则量)，如需改动请全部替换为不带'-lite'版本(在MT管理器等文本编辑器快速将"-lite"全部替换为""即可)。此外不建议将proxy-lite/proxy与cn-lite/cn调换顺序！

图标：[flag-icons](https://github.com/lipis/flag-icons)、[HOMOMIX](https://github.com/Vbaethon/HOMOMIX)

DOH: 直连([阿里DNS](https://www.aliyun.com/product/dns)+[腾讯DNS](https://www.dnspod.cn/products/publicdns))、代理([Quad9](https://quad9.net)+[谷歌DNS](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)、[常见UA](https://config.net.cn/tools/UserAgent.html)、[ClashVergeRev](https://www.clashverge.dev/guide/term.html#ua)

### 客户端

**Android**：[Box(root)](https://github.com/boxproxy/box)(通用)、[Bettbox](https://github.com/appshubcc/Bettbox)、[Flyclash](https://github.com/GtxFury/FlyClash-Android)(smart)

**Windows**：[minihomo(裸核)](https://github.com/bestruirui/minihomo)(通用)[uwp管理](https://github.com/Kindness-Kismet/WINUI3-loopback_manager)、[ClashVergeRev](https://github.com/clash-verge-rev/clash-verge-rev)

**OpenClash**：[𝕄𝕀ℍ𝕆𝕄𝕆 的千种配置](https://github.com/HenryChiao/MIHOMO_YAMLS/blob/main/THEDOC/THE_REAL_README.md)
