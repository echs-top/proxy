*注：用mihomo_smart快半年了感觉尚可，我是裸核不是很在乎占用(再多也不会超过150MB)。我的想法让两个模板差异逐渐扩大不好维护，遂停止mihomo.yaml更新*

### 更新

跟随mihomo更新调整(如无必要则不更)

### 模板

[mihomo.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)(停止更新)

[mihomo_smart.yaml](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

### 备注

自用优先、Windows/Android、TUN/VPN、地区策略、极简分组、严谨分流

规则：[DustinWin/ruleset_geodata](https://github.com/DustinWin/ruleset_geodata)(部分)、[秋风去广告](https://awavenue.top)、cn_domain([cn-lite](https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/cn-lite.list)+[备案域名](https://static-file-global.353355.xyz/rules/cn-additional-list-clash.yaml)合并去重)、[telegram_ip](https://core.telegram.org/resources/cidr.txt)、[dnsmasq-china_domain](https://github.com/felixonmars/dnsmasq-china-list/master/accelerated-domains.china.conf)、dnsmasq-china-add_domain(排除了cn_domain)、[enhanced-FaaS-in-China](https://github.com/xingpingcn/enhanced-FaaS-in-China)、自用补充

图标：[lipis/flag-icons](https://github.com/lipis/flag-icons)、[Vbaethon/HOMOMIX](https://github.com/Vbaethon/HOMOMIX)

GITHUB加速：[gh-proxy](https://gh-proxy.com)

FCM hosts规则推荐: [Mice-Tailor-Infra/fcm-hosts-next](https://github.com/Mice-Tailor-Infra/fcm-hosts-next)

### 软件

**Android**:
[Box(magisk)](https://github.com/boxproxy/box)
[Flyclash](https://github.com/GtxFury/FlyClash-Android)

**Windows**:
[minihomo(裸核)](https://github.com/bestruirui/minihomo)|[uwp管理](https://github.com/Kindness-Kismet/WINUI3-loopback_manager)
