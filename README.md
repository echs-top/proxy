### 更新

跟随mihomo版本更新……

### 模板

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)、[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

### 占用

裸核：约50～150MB(smart分支占用偏高)

MRS：约1.1MB(含DNS分流dnsmasq-china约550KB)

### 备注

自用优先、TUN/VPN、地区策略、完善设置、严谨分流

规则：[MetaCubeX](https://github.com/MetaCubeX/meta-rules-dat)(部分)、[DustinWin](https://github.com/DustinWin/ruleset_geodata)(部分)、ads([秋风](https://awavenue.top)+[217heidai](https://github.com/217heidai/adblockfilters)+[PATREON](https://pgl.yoyo.org/adservers/)合并去重)、cn-lite([cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list)+[备案域名](https://www.nodeseek.com/post-464238-1)合并去重)、cn('cn-lite'+[apple-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/apple-cn.list)+[microsoft-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/microsoft-cn.list)+[game-cn](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/games-cn.list)+[自用补充](https://github.com/echs-top/proxy/blob/main/work/list/direct_domain.list)-ads合并去重)、proxy([proxy](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/proxy.list)+[github](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.list)+[自用补充](https://github.com/echs-top/proxy/blob/main/work/list/proxy_domain.list)-[自用补充2](https://github.com/echs-top/proxy/blob/main/work/list/google-direct_domain.list)-ads合并去重)、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、[dnsmasq-china](https://github.com/felixonmars/dnsmasq-china-list)、dnsmasq-china-lite('dnsmasq-china'-cn-ads)、[人机验证](https://github.com/echs-top/proxy/blob/main/list/domain/captcha.list)

图标：[flag-icons](https://github.com/lipis/flag-icons)、[HOMOMIX](https://github.com/Vbaethon/HOMOMIX) ===> 使用[cloudflare](https://cloudflare.com)/[vercel](https://vercel.com)/[netlify](https://netlify.com)混合加速

DOH: 直连([阿里DNS](https://www.aliyun.com/product/dns)+[腾讯DNS](https://www.dnspod.cn/products/publicdns))、代理([Quad9](https://quad9.net)+[谷歌DNS](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)、[常见UA](https://config.net.cn/tools/UserAgent.html)、[ClashVergeRev](https://www.clashverge.dev/guide/term.html#ua)

### 推文:

[科学上网-雨夜回廊](https://myql.eu.org/article/%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91)

### 客户端

**Android**：[Box(root)](https://github.com/boxproxy/box)(通用)、[Bettbox](https://github.com/appshubcc/Bettbox)、[Flyclash](https://github.com/GtxFury/FlyClash-Android)(smart)

**Windows**：[minihomo(裸核)](https://github.com/bestruirui/minihomo)(通用)[uwp管理](https://github.com/Kindness-Kismet/WINUI3-loopback_manager)、[ClashVergeRev](https://github.com/clash-verge-rev/clash-verge-rev)

**OpenClash**：[𝕄𝕀ℍ𝕆𝕄𝕆 的千种配置](https://github.com/HenryChiao/MIHOMO_YAMLS/blob/main/THEDOC/THE_REAL_README.md)
