### 模板下载
mihomo: https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo.yaml

mihomo_smart: https://raw.githubusercontent.com/echs-top/proxy/heads/main/mihomo_smart.yaml

### 代理软件推荐

https://github.com/echs-top/proxy/blob/main/proxyapplication.md

### 代理机场推荐

https://github.com/echs-top/proxy/main/proxyairport.md

### 问题参考

1.关于dns泄露: 我更倾向于代理流量部分(nameserver)仅使用国外dns代理查询，不能通过dns泄露检测到自己网络ip即可。国内域名分流查询即可，局域网相关域名使用系统dns查询。

2.tun模式下无法劫持局域网dns，我推荐的解决方案是手动替换wifi dns为0.0.0.0和223.5.5.5(::和2400:3200::1)

3.更推荐fakeip模式，除非你代理节点固定为一个(或者两三个且ip相对距离较近)。
