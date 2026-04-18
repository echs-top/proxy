### 更新

跟随mihomo更新调整(如无必要则不更)

### 模板

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)、[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

### 占用

裸核运存：约50～150MB(smart分支占用多)

MRS规则：约950KB(含DNS分流规则dnsmasq-china约500KB)

### 备注

优先自用、TUN/VPN、地区策略、完善设置、严谨分流

规则：[MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat)(部分)、[DustinWin/ruleset_geodata](https://github.com/DustinWin/ruleset_geodata)(部分)、[秋风去广告](https://awavenue.top)、cn_domain([cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list)+[备案域名](https://www.nodeseek.com/post-464238-1)合并去重)、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、[dnsmasq-china_domain](https://github.com/felixonmars/dnsmasq-china-list)、dnsmasq-china-add_domain(排除了cn_domain)、[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)、[人机验证(测试)](https://github.com/echs-top/proxy/blob/main/rules/list/captcha_domain.list)、自用补充(直连[域名](https://github.com/echs-top/proxy/blob/main/rules/list/direct_domain.list) [ip](https://github.com/echs-top/proxy/blob/main/rules/list/direct_ip.list),代理[域名](https://github.com/echs-top/proxy/blob/main/rules/list/proxy_domain.list) [ip](https://github.com/echs-top/proxy/blob/main/rules/list/proxy_ip.list),[fcm](https://github.com/echs-top/proxy/blob/main/rules/list/fcm_domain.list))

图标：[lipis/flag-icons](https://github.com/lipis/flag-icons)、[Vbaethon/HOMOMIX](https://github.com/Vbaethon/HOMOMIX)

DOH: 直连([alidns](https://www.aliyun.com/product/dns)+[腾讯公共DNS](https://www.dnspod.cn/products/publicdns)+[doh-hosts](https://github.com/echs-top/doh))、代理([Quad9](https://quad9.net)+[google dns](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)、[常见UA汇总](https://config.net.cn/tools/UserAgent.html)

### 推文:

[科学上网-雨夜回廊(很nice)](https://myql.eu.org/article/%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91)

### 客户端

**Android**：[Box(magisk)](https://github.com/boxproxy/box)(通用)、[Bettbox](https://github.com/appshubcc/Bettbox)、[Flyclash](https://github.com/GtxFury/FlyClash-Android)(smart分支)

**Windows**：[minihomo(裸核)](https://github.com/bestruirui/minihomo)(通用)|[uwp管理](https://github.com/Kindness-Kismet/WINUI3-loopback_manager)、[ClashVergeRev](https://github.com/clash-verge-rev/clash-verge-rev)

**OpenClash**：[𝕄𝕀ℍ𝕆𝕄𝕆 的千种配置](https://github.com/HenryChiao/MIHOMO_YAMLS/blob/main/THEDOC/THE_REAL_README.md)
