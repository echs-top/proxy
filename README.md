### 模板更新原则

1.填入订阅即可使用，并兼容多订阅

2.较完善的分流策略，偏向裸核使用

3.使用地区分组，偏向性能和速度优化

4.更多的是自用需求，所以……

### 链接指引

模板: [mihomo](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)、[mihomo_smart](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

更多推荐: [代理软件](https://github.com/echs-top/proxy/blob/main/proxyapplication.md)、[机场推荐](https://github.com/echs-top/proxy/blob/main/proxyairport.md)

### 自用规则

自维护部分规则:direct_domain(cn规则未收录)、direct_ip、proxy_domain(强制代理的域名，目前只有ipwho.is)、proxy_ip、fake-ip_add(除cn与direct_domain外不适合fake-ip的补充)

欢迎网友一起补充完善

### 问题参考

1.关于dns泄露: 我更倾向于减少国外流量获取到你的dns，是的这个问题理论是上无法完美解决的(或许你可以自建dns查询)

2.tun模式下无法劫持局域网dns(大多客户端都会自动处理)：推荐手动替换设备对于wifi/宽带的dns，如223.5.5.5、8.8.8.8 (2400:3200::1、2001:4860:4860::8888)

3.为什么推荐fakeip模式：多代理节点时dns查询缓存与节点不相近

4.关于测速链接方面：延迟仅供参考，仅代表访问测速链接的延迟

5.禁用国外QUIC: 国外QUIC容易被GFW及运营商(qos)阻断，造成报错ERR_CONNECTION_CLOSED
