> 重构workflows，请更新模板(2026.05.26)

### 更新

跟随mihomo版本更新……

### 模板

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)、[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

### 预览

| ![](https://raw.githubusercontent.com/echs-top/proxy/main/img/zashboard.webp) | ![](https://raw.githubusercontent.com/echs-top/proxy/main/img/zashboard2.webp) |
| :---: | :---: |

### 占用

裸核：约40～150MB(smart分支占用偏高)

MRS：约980KB(含DNS分流dnsmasq-china-lite约480KB)

### 备注

自用优先、TUN/VPN、地区策略、完善设置、严谨分流

规则：[MetaCubeX](https://github.com/MetaCubeX/meta-rules-dat)(部分)、[DustinWin](https://github.com/DustinWin/ruleset_geodata)(部分)、ads([秋风](https://awavenue.top)+[217heidai](https://github.com/217heidai/adblockfilters)+[PATREON](https://pgl.yoyo.org/adservers/))、cn-lite([cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list)+[备案域名](https://www.nodeseek.com/post-464238-1))、cn(详见[合并去重排除](https://github.com/echs-top/proxy/blob/main/work/domain/cn.list))、proxy([proxy](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/proxy.list)+[github](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.list))、proxy-lite(详见[合并去重排除](https://github.com/echs-top/proxy/blob/main/work/domain/proxy-lite.list))、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、[dnsmasq-china](https://github.com/felixonmars/dnsmasq-china-list)、dnsmasq-china-lite(详见[合并去重排除](https://github.com/echs-top/proxy/blob/main/work/domain/dnsmasq-china-lite.list))、google([google](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.list)-[自用排除](https://github.com/echs-top/proxy/blob/main/work/list/google-direct_domain.list))、[人机验证](https://github.com/echs-top/proxy/blob/main/list/domain/captcha.list)

注意：cn、proxy-lite、dnsmasq-china-lite为此模板定制(减少规则量)，若要改动规则请替换为cn-lite、proxy、dnsmasq-china。此外不建议将cn与proxy-lite调换顺序！

图标：[flag-icons](https://github.com/lipis/flag-icons)、[HOMOMIX](https://github.com/Vbaethon/HOMOMIX) ===> 使用[cloudflare](https://cloudflare.com)/[vercel](https://vercel.com)/[netlify](https://netlify.com)混合加速

DOH: 直连([阿里DNS](https://www.aliyun.com/product/dns)+[腾讯DNS](https://www.dnspod.cn/products/publicdns))、代理([Quad9](https://quad9.net)+[谷歌DNS](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)、[常见UA](https://config.net.cn/tools/UserAgent.html)、[ClashVergeRev](https://www.clashverge.dev/guide/term.html#ua)

### 推文:

[科学上网-雨夜回廊](https://myql.eu.org/article/%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91)

### 客户端

**Android**：[Box(root)](https://github.com/boxproxy/box)(通用)、[Bettbox](https://github.com/appshubcc/Bettbox)、[Flyclash](https://github.com/GtxFury/FlyClash-Android)(smart)

**Windows**：[minihomo(裸核)](https://github.com/bestruirui/minihomo)(通用)[uwp管理](https://github.com/Kindness-Kismet/WINUI3-loopback_manager)、[ClashVergeRev](https://github.com/clash-verge-rev/clash-verge-rev)

**OpenClash**：[𝕄𝕀ℍ𝕆𝕄𝕆 的千种配置](https://github.com/HenryChiao/MIHOMO_YAMLS/blob/main/THEDOC/THE_REAL_README.md)

### 解释

1.关于禁用代理QUIC：没有完美方案，过度拦截/重复匹配规则 必须接受一样,故放弃。

2.我在最后兜底前添加了“DST-PORT,10000-65535,TRACKER”这条激进的规则用以BT下载等分流，若有影响(如国外p2p下载、国外游戏等)可删除。

3.关于fake-ip-filter、nameserver-policy、sniffer为什么写这么详细：为了尽可能和规则同步分流……

4.关于smart分支：若使用高质量节点，那么smart分支带来的收益可能非常小。当代理体验不好时应优先选择提高节点质量，其次才是通过软件/配置/选择/分流进行设置。

5.smart策略组的“asn”开启时会让所有连接都产生本地dns查询，获取ip辅助分析asn选择节点(我模板默认关闭)，是否要开启取决于两种情况：若是中转节点请务必关闭，若是直连节点且质量很差时开启asn或许有正向提升。

6.关于hosts：如非必要不推荐添加hosts规则，比如添加了'baidu.com: 1.1.1.1'时，它会使用1.1.1.1去匹配规则而不是baidu.com(开启sniffer可能会对此现象有缓解)。一般只推荐添加doh域名相关host。
