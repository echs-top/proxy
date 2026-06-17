// update: 2026-06-18
// 简介: https://github.com/echs-top/proxy


function main(config) {
  const subscriptionProxies = config.proxies || [];
  const ipAnchor = { "type": "http", "interval": 86400, "proxy": "代理连接", "behavior": "ipcidr", "format": "mrs" };
  const domainAnchor = { "type": "http", "interval": 86400, "proxy": "代理连接", "behavior": "domain", "format": "mrs" };
  const fakeipDns = ["rcode://success"];
  const directDns = ["https://dns.alidns.com/dns-query#直接连接", "https://doh.pub/dns-query#直接连接&h3=false"];
  const proxyDns = ["https://dns.google/dns-query#代理DNS", "https://dns.quad9.net/dns-query#代理DNS"];
  const balAnchor = { "type": "load-balance", "strategy": "round-robin", "include-all-providers": true, "empty-fallback": "REJECT", "hidden": true };
  const fallAnchor = { "type": "fallback", "include-all-providers": true, "empty-fallback": "REJECT", "hidden": true };
  const dlAnchor = { "type": "select", "proxies": ["代理连接", "直接连接", "最低延迟", "故障转移", "香港|故障转移", "台湾|故障转移", "新加坡|故障转移", "日本|故障转移", "美国|故障转移", "德国|故障转移", "英国|故障转移", "荷兰|故障转移", "香港|轮询下载", "新加坡|轮询下载", "日本|轮询下载", "美国|轮询下载"], "include-all-providers": true, "empty-fallback": "REJECT" };
  const originDns = config.dns || {};
  const appendDirectTag = (val) => { if (typeof val === 'string') { return val.split('#')[0] + '#直接连接'; } return val; };
  const formatDnsValues = (dnsValue) => { if (Array.isArray(dnsValue)) return dnsValue.map(appendDirectTag); return appendDirectTag(dnsValue); };
  let finalProxyServerNameserver = directDns;
  const originPsn = originDns['proxy-server-nameserver'];
  if (originPsn != null && originPsn !== '' && (!Array.isArray(originPsn) || originPsn.length > 0)) { finalProxyServerNameserver = formatDnsValues(originPsn); }
  let finalProxyServerNameserverPolicy = undefined;
  const originPolicy = originDns['proxy-server-nameserver-policy'];
  if (originPolicy && typeof originPolicy === 'object' && !Array.isArray(originPolicy) && Object.keys(originPolicy).length > 0) { finalProxyServerNameserverPolicy = {}; for (const [domain, servers] of Object.entries(originPolicy)) { finalProxyServerNameserverPolicy[domain] = formatDnsValues(servers); } }
  const originHosts = config.hosts || {};
  const defaultHosts = {
    "dns.alidns.com": ["223.5.5.5", "223.6.6.6", "2400:3200::1", "2400:3200:baba::1"],
    "doh.pub": ["120.53.53.53", "1.12.12.21"],
    "dns.google": ["8.8.8.8", "8.8.4.4", "2001:4860:4860::8888", "2001:4860:4860::8844"],
    "dns.quad9.net": ["9.9.9.9", "149.112.112.112", "2620:fe::fe", "2620:fe::9"],
    "services.googleapis.cn": "services.googleapis.com",
    "google.cn": "google.com",
    "cn.bing.com": "global.bing.com"
  };
  const finalHosts = { ...originHosts, ...defaultHosts };
  const quic = "AND,((NETWORK,udp),(DST-PORT,443)),代理QUIC";
  return { 
    // 节点IP优先级：ip-version: ipv6-prefer
    "proxy-providers": { "节点": { "type": "inline", "health-check": { "enable": true, "url": "https://dns.google/generate_204", "expected-status": 204, "interval": 600, "timeout": 3000, "max-failed-times": 2, "lazy": false }, "override": { "ip-version": "dual" }, "exclude-filter": "(?i)套餐|剩余|流量|到期|重置|频道|订阅|官网|禁止|客户端|有效|联系|测试|节点|日期|群组|加入|通知|维护|网址|地址|下载|更新|APP|登录|严禁|恢复|处理|谢谢", "payload": subscriptionProxies } },
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
    "keep-alive-idle": 600,
    "etag-support": true,
    // "global-ua": "Mozilla/5.0 (Linux; Android 16; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.217 Mobile Safari/537.36",
    // "global-ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.257 Safari/537.36",
    // "external-controller": "[::]:9090",
    // "secret": "密码",
    // "external-doh-server": "/dns-query",
    // "external-ui": "./zashboard",
    // "external-ui-url": "https://github.com/echs-top/proxy/releases/download/zashboard/dist.zip",
    "profile": { "store-selected": true, "store-fake-ip": true },
    "experimental": { "quic-go-disable-gso": false, "quic-go-disable-ecn": true, "dialer-ip4p-convert": false },
    "port": 0,
    "socks-port": 0,
    "mixed-port": 0,
    "redir-port": 0,
    "tproxy-port": 0,
    "tun": {
      "enable": true,
      // Android dummy9 / Windows "以太网 9" / MacOS utun9
      // "device": "dummy9",
      "stack": "mixed",
      "auto-route": true,
      "auto-redirect": true,
      "auto-detect-interface": true,
      "strict-route": true,
      "disable-icmp-forwarding": true,
      // "endpoint-independent-nat": true,
      "dns-hijack": ["any:53", "tcp://any:53"],
      "udp-timeout": 600
    },
    "hosts": finalHosts,
    "dns": {
      "enable": true,
      "ipv6": true,
      "ipv6-timeout": 300,
      "cache-algorithm": "arc",
      "use-hosts": true,
      "use-system-hosts": false,
      "prefer-h3": true,
      "respect-rules": false,
      // "listen": "[::]:1053",
      "enhanced-mode": "fake-ip",
      "fake-ip-range": "198.18.0.0/15",
      "fake-ip-range6": "fd00:a4c5:9b12:d3f8:e760:00df::/96",
      "fake-ip-ttl": 1,
      "fake-ip-filter-mode": "rule",
      "fake-ip-filter": [
        "RULE-SET,ads,fake-ip",
        "RULE-SET,proxy@direct,real-ip",
        "RULE-SET,ai,fake-ip",
        "RULE-SET,download,fake-ip",
        "RULE-SET,safe,fake-ip",
        "RULE-SET,google,fake-ip",
        "RULE-SET,media,fake-ip",
        "RULE-SET,proxy-lite,fake-ip",
        "RULE-SET,direct-lite,real-ip",
        "MATCH,fake-ip"
      ],
      "default-nameserver": ["223.6.6.6", "119.29.29.29"],
      "proxy-server-nameserver": finalProxyServerNameserver,
      ...(finalProxyServerNameserverPolicy !== undefined && { "proxy-server-nameserver-policy": finalProxyServerNameserverPolicy }),
      "nameserver": proxyDns,
      "nameserver-policy": {
        "rule-set:ads": ["rcode://name_error"],
        "rule-set:proxy@direct": directDns,
        "rule-set:ai,download,safe,google,media,proxy-lite": fakeipDns,
        "rule-set:direct-lite,dnsmasq-china-lite": directDns
      },
      "direct-nameserver": directDns,
      "direct-nameserver-follow-policy": true
    },
    "sniffer": {
      "enable": true,
      "force-dns-mapping": true,
      "parse-pure-ip": true,
      "override-destination": false,
      "sniff": { "HTTP": { "ports": [80, "8080-8880"], "override-destination": true }, "TLS": { "ports": [443, 8443] }, "QUIC": { "ports": [443, 8443] } },
      "skip-domain": ["rule-set:ads,proxy@direct,ai,download,safe,google,media,proxy-lite,direct-lite,dnsmasq-china-lite"],
      "skip-src-address": ["rule-set:telegram_ip,safe_ip,google_ip,media_ip,direct_ip"]
    },
    "rule-providers": {
      "ads": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ads.mrs", "path": "./rules/ads.mrs" },
      "proxy@direct": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy@direct.mrs", "path": "./rules/proxy@direct.mrs" },
      "ai": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ai.mrs", "path": "./rules/ai.mrs" },
      "download": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/download.mrs", "path": "./rules/download.mrs" },
      "safe": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/safe.mrs", "path": "./rules/safe.mrs" },
      "google": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/google.mrs", "path": "./rules/google.mrs" },
      "media": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/media.mrs", "path": "./rules/media.mrs" },
      "proxy-lite": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy-lite.mrs", "path": "./rules/proxy-lite.mrs" },
      "direct-lite": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/direct-lite.mrs", "path": "./rules/direct-lite.mrs" },
      "dnsmasq-china-lite": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/dnsmasq-china-lite.mrs", "path": "./rules/dnsmasq-china-lite.mrs" },
      "telegram_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/telegram.mrs", "path": "./rules/telegram_ip.mrs" },
      "safe_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/safe.mrs", "path": "./rules/safe_ip.mrs" },
      "google_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/google.mrs", "path": "./rules/google_ip.mrs" },
      "media_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/media.mrs", "path": "./rules/media_ip.mrs" },
      "direct_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/direct.mrs", "path": "./rules/direct_ip.mrs" }
    },
    "rules": [
      "DST-PORT,5228-5230,直接连接",
      "SUB-RULE,(RULE-SET,telegram_ip,no-resolve),sub-telegram",
      "RULE-SET,ads,REJECT",
      "RULE-SET,proxy@direct,直接连接",
      "SUB-RULE,(RULE-SET,ai),sub-ai",
      "SUB-RULE,(RULE-SET,download),sub-download",
      "SUB-RULE,(RULE-SET,safe),sub-safe",
      "SUB-RULE,(RULE-SET,google),sub-google",
      "SUB-RULE,(RULE-SET,media),sub-media",
      "SUB-RULE,(RULE-SET,proxy-lite),sub-proxy",
      "RULE-SET,direct-lite,直接连接",
      "SUB-RULE,(RULE-SET,safe_ip),sub-safe",
      "SUB-RULE,(RULE-SET,google_ip),sub-google",
      "SUB-RULE,(RULE-SET,media_ip),sub-media",
      "RULE-SET,direct_ip,直接连接",
      quic,
      "MATCH,代理连接"
    ],
    "sub-rules": {
      "sub-telegram": [quic, "MATCH,TELEGRAM"],
      "sub-ai": [quic, "MATCH,国外AI"],
      "sub-download": [quic, "MATCH,下载相关"],
      "sub-safe": [quic, "MATCH,风控安全"],
      "sub-google": [quic, "MATCH,GOOGLE"],
      "sub-media": [quic, "MATCH,海外媒体"],
      "sub-proxy": [quic, "MATCH,代理连接"]
    },
    "proxies": [{ "name": "IPV4优先", "type": "direct", "udp": true, "ip-version": "ipv4-prefer" },{ "name": "IPV6优先", "type": "direct", "udp": true, "ip-version": "ipv6-prefer" },{ "name": "仅IPV4", "type": "direct", "udp": true, "ip-version": "ipv4" },{ "name": "仅IPV6", "type": "direct", "udp": true, "ip-version": "ipv6" }],
    "proxy-groups": [
      { "name": "代理连接", "type": "select", "proxies": ["最低延迟", "故障转移", "香港|故障转移", "台湾|故障转移", "新加坡|故障转移", "日本|故障转移", "美国|故障转移", "德国|故障转移", "英国|故障转移", "荷兰|故障转移", "香港|轮询下载", "新加坡|轮询下载", "日本|轮询下载", "美国|轮询下载"], "include-all-providers": true, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Universal/StreamingSE.png" },
      { "name": "直接连接", "type": "select", "proxies": ["DIRECT", "IPV4优先", "IPV6优先", "仅IPV4", "仅IPV6"], "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Accommodation/Online_Booking.png" },
      { "name": "代理DNS", ...dlAnchor, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Universal/Streaming.png" },
      { "name": "代理QUIC", "type": "select", "proxies": ["PASS-RULE", "REJECT"], "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Google_Suite/Admin.png" },
      { "name": "TELEGRAM", ...dlAnchor, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Social_Media/Telegram.png" },
      { "name": "国外AI", ...dlAnchor, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Fitness/Chat.png" },
      { "name": "下载相关", ...dlAnchor, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Google_Suite/Drive.png" },
      { "name": "风控安全", ...dlAnchor, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Google_Suite/Account.png" },
      { "name": "GOOGLE", ...dlAnchor, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Google_Suite/Google.png" },
      { "name": "海外媒体", ...dlAnchor, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Universal/Video.png" },
      { "name": "最低延迟", "type": "url-test", "tolerance": 30, "include-all-providers": true, "empty-fallback": "REJECT", "hidden": true, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Universal/Auto_Speed.png" },
      { "name": "故障转移", ...fallAnchor, "filter": "(?i)🇭🇰|香港|\\bHK\\b|\\bhongkong\\b|\\bhong\s?kong\\b|🇸🇬|新加坡|狮城|\\bSG\\b|\\bsingapore\\b|🇯🇵|日本|\\bJP\\b|\\bjapan\\b|🇺🇸|美国|\\bUS\\b|\\bunitedstates\\b|\\bunited\s?states\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Universal/Final.png" },
      { "name": "香港|故障转移", ...fallAnchor, "filter": "(?i)🇭🇰|香港|\\bHK\\b|\\bhongkong\\b|\\bhong\\s?kong\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Hong_Kong.png" },
      { "name": "台湾|故障转移", ...fallAnchor, "filter": "(?i)🇹🇼|台湾|\\bTW\\b|\\btaiwan\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Taiwan.png" },
      { "name": "新加坡|故障转移", ...fallAnchor, "filter": "(?i)🇸🇬|新加坡|狮城|\\bSG\\b|\\bsingapore\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Singapore.png" },
      { "name": "日本|故障转移", ...fallAnchor, "filter": "(?i)🇯🇵|日本|\\bJP\\b|\\bjapan\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Japan.png" },
      { "name": "美国|故障转移", ...fallAnchor, "filter": "(?i)🇺🇸|美国|\\bUS\\b|\\bunitedstates\\b|\\bunited\\s?states\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/United_States.png" },
      { "name": "德国|故障转移", ...fallAnchor, "filter": "(?i)🇩🇪|德国|\\bDE\\b|\\bgermany\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Germany.png" },
      { "name": "英国|故障转移", ...fallAnchor, "filter": "(?i)🇬🇧|英国|\\bUK\\b|\\bGB\\b|\\bunitedkingdom\\b|\\bunited\\s?kingdom\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/United_Kingdom.png" },
      { "name": "荷兰|故障转移", ...fallAnchor, "filter": "(?i)🇳🇱|荷兰|\\bNL\\b|\\bnetherlands?\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Netherlands.png" },
      { "name": "香港|轮询下载", ...balAnchor, "filter": "(?i)🇭🇰|香港|\\bHK\\b|\\bhongkong\\b|\\bhong\\s?kong\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Hong_Kong.png" },
      { "name": "新加坡|轮询下载", ...balAnchor, "filter": "(?i)🇸🇬|新加坡|狮城|\\bSG\\b|\\bsingapore\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Singapore.png" },
      { "name": "日本|轮询下载", ...balAnchor, "filter": "(?i)🇯🇵|日本|\\bJP\\b|\\bjapan\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/Japan.png" },
      { "name": "美国|轮询下载", ...balAnchor, "filter": "(?i)🇺🇸|美国|\\bUS\\b|\\bunitedstates\\b|\\bunited\\s?states\\b", "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Rounded_Rectangle/United_States.png" },
      { "name": "GLOBAL", "type": "select", "proxies": ["最低延迟", "故障转移", "香港|故障转移", "台湾|故障转移", "新加坡|故障转移", "日本|故障转移", "美国|故障转移", "德国|故障转移", "英国|故障转移", "荷兰|故障转移", "香港|轮询下载", "新加坡|轮询下载", "日本|轮询下载", "美国|轮询下载", "代理连接", "直接连接", "代理DNS", "代理QUIC", "TELEGRAM", "国外AI", "下载相关", "风控安全", "GOOGLE", "海外媒体"], "include-all-providers": true, "hidden": true, "icon": "https://mihomo.echs.top/img/Hand-Painted-icon/Google_Suite/Browser.png" }
    ]
  };
}
