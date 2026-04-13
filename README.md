### 更新

跟随mihomo更新调整(如无必要则不更)

### 模板

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)、[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

### 占用

裸核运存占用：约50～150MB(smart分支占用较多)

MRS规则文件：约950KB(包含DNS解析分流规则dnsmasq-china约500KB)

其他：zashboard文件约10MB(默认不下载)、ASN.mmdb约11MB(默认不下载)、Model-large.bin约30MB(smart分支)

### 备注

优先自用、TUN/VPN、地区策略、完善设置、严谨分流

规则：[MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat)(部分)、[DustinWin/ruleset_geodata](https://github.com/DustinWin/ruleset_geodata)(部分)、[秋风去广告](https://awavenue.top)、cn_domain([cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list)+[备案域名](https://www.nodeseek.com/post-464238-1)合并去重)、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、[dnsmasq-china_domain](https://github.com/felixonmars/dnsmasq-china-list)、dnsmasq-china-add_domain(排除了cn_domain)、[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)、[人机验证(测试)](https://github.com/echs-top/proxy/blob/main/rules/list/captcha_domain.list)、自用补充(直连[域名](https://github.com/echs-top/proxy/blob/main/rules/list/direct_domain.list) [ip](https://github.com/echs-top/proxy/blob/main/rules/list/direct_ip.list),代理[域名](https://github.com/echs-top/proxy/blob/main/rules/list/proxy_domain.list) [ip](https://github.com/echs-top/proxy/blob/main/rules/list/proxy_ip.list),[fcm](https://github.com/echs-top/proxy/blob/main/rules/list/fcm_domain.list))

图标：[lipis/flag-icons](https://github.com/lipis/flag-icons)、[Vbaethon/HOMOMIX](https://github.com/Vbaethon/HOMOMIX)

DOH: 直连([alidns](https://www.aliyun.com/product/dns)+[腾讯公共DNS](https://www.dnspod.cn/products/publicdns)+[doh-hosts](https://github.com/echs-top/doh))、代理([Quad9](https://quad9.net)+[google dns](https://developers.google.com/speed/public-dns?hl=zh-cn))

UA参考：[chromiumdash](https://chromiumdash.appspot.com/releases)

### 客户端

**Android**:
[Box(magisk)](https://github.com/boxproxy/box)(通用)、[LiClash](https://t.me