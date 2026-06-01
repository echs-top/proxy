// update: 2026-06-02
// 简介: https://github.com/echs-top/proxy


function main(config) {
  const subscriptionProxies = config.proxies || [];
  const ipAnchor = { "type": "http", "interval": 86400, "proxy": "代理连接", "behavior": "ipcidr", "format": "mrs" };
  const domainAnchor = { "type": "http", "interval": 86400, "proxy": "代理连接", "behavior": "domain", "format": "mrs" };
  const directDns = ["119.29.29.29#直接连接", "223.5.5.5#直接连接"];
  // const directDns = ["119.29.29.29#直接连接", "223.5.5.5#直接连接", "[2402:4e00::]#直接连接", "[2400:3200::1]#直接连接"];
  const directDoh = ["https://dns.alidns.com/dns-query#直接连接", "https://doh.pub/dns-query#直接连接&h3=false"];
  const proxyDns = ["8.8.8.8#代理DNS", "9.9.9.9#代理DNS"];
  // const proxyDns = ["8.8.8.8#代理DNS", "9.9.9.9#代理DNS", "[2001:4860:4860::8888]#代理DNS", "[2620:fe::fe]#代理DNS"];
  const proxyDoh = ["https://dns.google/dns-query#代理DNS", "https://dns.quad9.net/dns-query#代理DNS"];
  const fallAnchor = { "type": "fallback", "include-all-providers": true, "hidden": true };
  const dlAnchor = { "type": "select", "proxies": ["代理连接", "直接连接", "最低延迟", "香港|故障转移", "台湾|故障转移", "新加坡|故障转移", "日本|故障转移", "韩国|故障转移", "美国|故障转移", "加拿大|故障转移", "德国|故障转移", "英国|故障转移", "法国|故障转移", "荷兰|故障转移"], "include-all-providers": true };
  return { 
    // 节点IP优先级：ip-version: ipv6-prefer
    // 测速细分/筛选：https://8.8.8.8/generate_204、https://[2001:4860:4860::8888]/generate_204
    "proxy-providers": {
      "link": {
        "type": "inline",
        "health-check": { "enable": true, "url": "https://dns.google/generate_204", "expected-status": 204, "interval": 600, "timeout": 3000, "max-failed-times": 2, "lazy": true },
        "override": { "ip-version": "dual" },
        "exclude-filter": "(?i)套餐|剩余|流量|到期|重置|频道|订阅|官网|禁止|客户端|有效|联系|测试|节点|日期|群组|加入|通知|维护|网址|地址|下载|更新|APP|登录|严禁|海外|恢复|处理|谢谢",
        "payload": subscriptionProxies
      }
    },
    "ipv6": true,
    "allow-lan": false,
    "bind-address": "*",
    "mode": "rule",
    "log-level": "error",
    "unified-delay": true,
    "tcp-concurrent": true,
    "find-process-mode": "off",
    "disable-keep-alive": false,
    "keep-alive-interval": 15,
    "keep-alive-idle": 300,
    "etag-support": true,
    // "global-ua-android": "Mozilla/5.0 (Linux; Android 16; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.215 Mobile Safari/537.36",
    // "global-ua-windows": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.217 Safari/537.36",
    // "external-controller": "127.0.0.1:9090",
    // "secret": "密码",
    // "external-ui": "./zashboard",
    // "external-ui-url": "https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip",
    "profile": { "store-selected": true, "store-fake-ip": true },
    // "experimental": { "quic-go-disable-gso": true, "quic-go-disable-ecn": true, "dialer-ip4p-convert": false },
    "port": 0,
    "socks-port": 0,
    "mixed-port": 0,
    "tproxy-port": 0,
    "redir-port": 0,
    // "authentication": ["用户:密码"],
    "tun": {
      "enable": true,
      // "device": "meta",
      // Windows mixed, Android15+ gvisor(抗休眠)
      "stack": "mixed",
      "auto-route": true,
      "auto-redirect": true,
      "auto-detect-interface": true,
      "strict-route": true,
      "disable-icmp-forwarding": true,
      "dns-hijack": ["any:53", "tcp://any:53", "any:853", "tcp://any:853"],
      // "mtu": 9000,
      // "udp-timeout": 300,
      // "endpoint-independent-nat": true
    },
    "rule-providers": {
      "private_ip": { ...ipAnchor, "url": "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/privateip.mrs", "path": "./rules/private_ip.mrs" },
      "private": { ...domainAnchor, "url": "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/private.mrs", "path": "./rules/private.mrs" },
      "ads": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ads.mrs", "path": "./rules/ads.mrs" },
      "fcm": { ...domainAnchor, "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/googlefcm.mrs", "path": "./rules/fcm.mrs" },
      "captcha": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/captcha.mrs", "path": "./rules/captcha.mrs" },
      "ai": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ai.mrs", "path": "./rules/ai.mrs" },
      "telegram": { ...domainAnchor, "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs", "path": "./rules/telegram.mrs" },
      "media": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/media.mrs", "path": "./rules/media.mrs" },
      "google": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/google.mrs", "path": "./rules/google.mrs" },
      "trackerslist": { ...domainAnchor, "url": "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/trackerslist.mrs", "path": "./rules/trackerslist.mrs" },
      "proxy-lite": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy-lite.mrs", "path": "./rules/proxy-lite.mrs" },
      "cn": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/cn.mrs", "path": "./rules/cn.mrs" },
      "dnsmasq-china-lite": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/dnsmasq-china-lite.mrs", "path": "./rules/dnsmasq-china-lite.mrs" },
      "telegram_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/telegram.mrs", "path": "./rules/telegram_ip.mrs" },
      "media_ip": { ...ipAnchor, "url": "https://github.com/DustinWin/ruleset_geodata/releases/download/mihomo-ruleset/mediaip.mrs", "path": "./rules/media_ip.mrs" },
      "google_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs", "path": "./rules/google_ip.mrs" },
      "proxy_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/proxy.mrs", "path": "./rules/proxy_ip.mrs" },
      "cn_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/cn.mrs", "path": "./rules/cn_ip.mrs" }
    },
    "rules": [
      "DST-PORT,53/853,DNS劫持",
      "DST-PORT,5228-5230,直接连接",
      "DST-PORT,1337/2710/6881-6999/7777,TRACKER",
      "RULE-SET,private_ip,直接连接,no-resolve",
      "RULE-SET,private,直接连接",
      "RULE-SET,ads,REJECT",
      "RULE-SET,fcm,直接连接",
      "RULE-SET,captcha,人机验证",
      "RULE-SET,ai,国外AI",
      "RULE-SET,telegram,TELEGRAM",
      "RULE-SET,media,国外媒体",
      "RULE-SET,google,GOOGLE",
      "RULE-SET,trackerslist,TRACKER",
      "RULE-SET,proxy-lite,代理连接",
      "RULE-SET,cn,直接连接",
      "RULE-SET,telegram_ip,TELEGRAM",
      "RULE-SET,media_ip,国外媒体",
      "RULE-SET,google_ip,GOOGLE",
      "RULE-SET,proxy_ip,代理连接",
      "RULE-SET,cn_ip,直接连接",
      // 极其激进的bt/tracker兜底
      "DST-PORT,10000-65535,TRACKER",
      "MATCH,代理连接"
    ],
    "hosts": {
      "dns.alidns.com": ["223.5.5.5", "223.6.6.6", "2400:3200::1", "2400:3200:baba::1"],
      "doh.pub": ["120.53.53.53", "1.12.12.21"],
      "dns.google": ["8.8.8.8", "8.8.4.4", "2001:4860:4860::8888", "2001:4860:4860::8844"],
      "dns.quad9.net": ["9.9.9.9", "149.112.112.112", "2620:fe::fe", "2620:fe::9"],
      "services.googleapis.cn": "services.googleapis.com",
      "google.cn": "google.com"
    },
    "dns": {
      "enable": true,
      "cache-algorithm": "arc",
      "ipv6": true,
      "prefer-h3": true,
      "use-hosts": true,
      "use-system-hosts": false,
      "respect-rules": false,
      // "listen": "0.0.0.0:1053",
      "enhanced-mode": "fake-ip",
      "fake-ip-range": "198.18.0.1/16",
      "fake-ip-range6": "fd00:bada:55ed::1/64",
      // "fake-ip-ttl": 1,
      "fake-ip-filter-mode": "rule",
      "fake-ip-filter": [
        "RULE-SET,private,real-ip",
        "RULE-SET,ads,fake-ip",
        "RULE-SET,fcm,real-ip",
        "RULE-SET,captcha,fake-ip",
        "RULE-SET,ai,fake-ip",
        "RULE-SET,telegram,fake-ip",
        "RULE-SET,media,fake-ip",
        "RULE-SET,google,fake-ip",
        "RULE-SET,trackerslist,fake-ip",
        "RULE-SET,proxy-lite,fake-ip",
        "RULE-SET,cn,real-ip",
        "MATCH,fake-ip"
      ],
      // "default-nameserver": directDns,
      "proxy-server-nameserver": directDoh,
      "nameserver-policy": {
        "rule-set:private": directDns,
        "rule-set:ads": ["rcode://name_error"],
        "rule-set:fcm": directDoh,
        "rule-set:captcha": directDoh,
        "rule-set:ai": proxyDns,
        "rule-set:telegram": proxyDns,
        "rule-set:media": proxyDns,
        "rule-set:google": proxyDns,
        "rule-set:trackerslist": proxyDns,
        "rule-set:proxy-lite": proxyDns,
        "rule-set:cn": directDns,
        "rule-set:dnsmasq-china-lite": directDns
      },
      "nameserver": proxyDns,
      "direct-nameserver": directDns,
      "direct-nameserver-follow-policy": true
    },
    "sniffer": {
      "enable": true,
      "force-dns-mapping": true,
      "parse-pure-ip": true,
      "override-destination": false,
      "sniff": { "HTTP": { "ports": ["80", "8080-8880"], "override-destination": true }, "TLS": { "ports": ["443", "8443"] }, "QUIC": { "ports": ["443", "8443"] } },
      "skip-domain": ["rule-set:private", "rule-set:ads", "rule-set:fcm", "rule-set:captcha", "rule-set:ai", "rule-set:telegram", "rule-set:media", "rule-set:google", "rule-set:trackerslist", "rule-set:proxy-lite", "rule-set:cn", "rule-set:dnsmasq-china-lite"],
      "skip-src-address": ["rule-set:private_ip", "rule-set:telegram_ip", "rule-set:media_ip", "rule-set:google_ip", "rule-set:proxy_ip", "rule-set:cn_ip"],
      "skip-dst-address": ["rule-set:private_ip"]
    },
    "proxies": [{ "name": "DNS劫持", "type": "dns" },{ "name": "直接连接", "type": "direct", "udp": true, "ip-version": "dual" }],
    "proxy-groups": [
      { "name": "代理连接", "type": "select", "proxies": ["最低延迟", "香港|故障转移", "台湾|故障转移", "新加坡|故障转移", "日本|故障转移", "韩国|故障转移", "美国|故障转移", "加拿大|故障转移", "德国|故障转移", "英国|故障转移", "法国|故障转移", "荷兰|故障转移"], "include-all-providers": true, "icon": "https://mihomo.echs.top/img/icon/Global.webp" },
      { "name": "代理DNS", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/Server.webp" },
      { "name": "人机验证", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/CloudFlare.webp" },
      { "name": "国外AI", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/AI.webp" },
      { "name": "TELEGRAM", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/Telegram.webp" },
      { "name": "国外媒体", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/Emby.webp" },
      { "name": "GOOGLE", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/Google.webp" },
      { "name": "TRACKER", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/Download_2.webp" },
      { "name": "最低延迟", "type": "url-test", "tolerance": 30, "include-all-providers": true, "hidden": true, "icon": "https://mihomo.echs.top/img/icon/Fast.webp" },
      { "name": "香港|故障转移", ...fallAnchor, "filter": "(?i)🇭🇰|香港|\\bHK\\b|\\bhongkong\\b|\\bhong\\s?kong\\b", "icon": "https://mihomo.echs.top/img/flags/hk.svg" },
      { "name": "台湾|故障转移", ...fallAnchor, "filter": "(?i)🇹🇼|台湾|\\bTW\\b|\\btaiwan\\b", "icon": "https://mihomo.echs.top/img/flags/tw.svg" },
      { "name": "新加坡|故障转移", ...fallAnchor, "filter": "(?i)🇸🇬|新加坡|狮城|\\bSG\\b|\\bsingapore\\b", "icon": "https://mihomo.echs.top/img/flags/sg.svg" },
      { "name": "日本|故障转移", ...fallAnchor, "filter": "(?i)🇯🇵|日本|\\bJP\\b|\\bjapan\\b", "icon": "https://mihomo.echs.top/img/flags/jp.svg" },
      { "name": "韩国|故障转移", ...fallAnchor, "filter": "(?i)🇰🇷|韩国|\\bKR\\b", "icon": "https://mihomo.echs.top/img/flags/kr.svg" },
      { "name": "美国|故障转移", ...fallAnchor, "filter": "(?i)🇺🇸|美国|\\bUS\\b|\\bunitedstates\\b|\\bunited\\s?states\\b", "icon": "https://mihomo.echs.top/img/flags/us.svg" },
      { "name": "加拿大|故障转移", ...fallAnchor, "filter": "(?i)🇨🇦|加拿大|\\bCA\\b|\\bcanada\\b", "icon": "https://mihomo.echs.top/img/flags/ca.svg" },
      { "name": "德国|故障转移", ...fallAnchor, "filter": "(?i)🇩🇪|德国|\\bDE\\b|\\bgermany\\b", "icon": "https://mihomo.echs.top/img/flags/de.svg" },
      { "name": "英国|故障转移", ...fallAnchor, "filter": "(?i)🇬🇧|英国|\\bUK\\b|\\bGB\\b|\\bunitedkingdom\\b|\\bunited\\s?kingdom\\b", "icon": "https://mihomo.echs.top/img/flags/gb.svg" },
      { "name": "法国|故障转移", ...fallAnchor, "filter": "(?i)🇫🇷|法国|\\bFR\\b", "icon": "https://mihomo.echs.top/img/flags/fr.svg" },
      { "name": "荷兰|故障转移", ...fallAnchor, "filter": "(?i)🇳🇱|荷兰|\\bNL\\b|\\bnetherlands?\\b", "icon": "https://mihomo.echs.top/img/flags/nl.svg" },
      { "name": "GLOBAL", "type": "select", "proxies": ["最低延迟", "香港|故障转移", "台湾|故障转移", "新加坡|故障转移", "日本|故障转移", "韩国|故障转移", "美国|故障转移", "加拿大|故障转移", "德国|故障转移", "英国|故障转移", "法国|故障转移", "荷兰|故障转移", "代理连接", "代理DNS", "人机验证", "国外AI", "TELEGRAM", "国外媒体", "GOOGLE", "TRACKER"], "include-all-providers": true, "hidden": true, "icon": "https://mihomo.echs.top/img/icon/Globefish.webp" }
    ]
  };
}
