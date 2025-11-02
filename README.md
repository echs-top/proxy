### 模板更新原则

1.填入订阅即用，可多个订阅

2.完善分流策略，按地区分组

3.模板主要自用，激进风格……

### 链接指引

模板: [mihomo](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml)、[mihomo_smart](https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml)

更多推荐: [代理软件](https://github.com/echs-top/proxy/blob/main/proxyapplication.md)、[机场推荐](https://github.com/echs-top/proxy/blob/main/proxyairport.md)

### 自用规则

强制直连：direct_domain(cn规则未收录)、direct_ip

强制代理：proxy_domain(强制代理的域名，目前只有ipwho.is)、proxy_ip

补充类：fake-ip_add(补充少量fake-ip域名)、ai_add(补充ai相关域名)

欢迎网友一起补充完善

### 问题参考

1.关于dns泄露: 首先是尽可能减少国外流量直接获取到你的网络ip；其次是国内网站尽可能用国内dns查询，国外网站尽可能用国外dns查询，很难完美解决(或许你可以自建dns服务)

2.tun模式下无法劫持局域网dns(大多客户端都会自动处理)：推荐手动替换设备对于wifi/宽带的dns，如223.5.5.5、8.8.8.8 (2400:3200::1、2001:4860:4860::8888)

3.为什么推荐fakeip模式：多代理节点时dns查询缓存与节点不相近

4.关于测速链接方面：延迟仅供参考，仅代表访问测速链接的延迟

5.禁用国外QUIC: 国外QUIC容易被GFW及运营商(qos)阻断，造成报错ERR_CONNECTION_CLOSED
