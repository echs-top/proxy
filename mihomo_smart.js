// update: 2026-06-11
// 简介: https://github.com/echs-top/proxy


function main(config) {
  const subscriptionProxies = config.proxies || [];
  const ipAnchor = { "type": "http", "interval": 86400, "proxy": "代理连接", "behavior": "ipcidr", "format": "mrs" };
  const domainAnchor = { "type": "http", "interval": 86400, "proxy": "代理连接", "behavior": "domain", "format": "mrs" };
  const fakeipDns = ["rcode://success"];
  // ["119.29.29.29#直接连接", "223.5.5.5#直接连接", "[2402:4e00::]#直接连接", "[2400:3200::1]#直接连接"];
  const directDns = ["119.29.29.29#直接连接", "223.5.5.5#直接连接"];
  // ["8.8.8.8#代理DNS", "9.9.9.9#代理DNS", "[2001:4860:4860::8888]#代理DNS", "[2620:fe::fe]#代理DNS"];
  const directDoh = ["https://dns.alidns.com/dns-query#直接连接", "https://doh.pub/dns-query#直接连接&h3=false"];
  const proxyDns = ["8.8.8.8#代理DNS", "9.9.9.9#代理DNS"];
  const proxyDoh = ["https://dns.google/dns-query#代理DNS", "https://dns.quad9.net/dns-query#代理DNS"];
  const smartAnchor = { "type": "smart", "strategy": "sticky-sessions", "uselightgbm": true, "collectdata": false, "sample-rate": "1", "prefer-asn": false, "include-all-providers": true, "hidden": true };
  const dlAnchor = { "type": "select", "proxies": ["代理连接", "直接连接", "最低延迟", "香港|智能选择", "台湾|智能选择", "新加坡|智能选择", "日本|智能选择", "韩国|智能选择", "美国|智能选择", "加拿大|智能选择", "德国|智能选择", "英国|智能选择", "法国|智能选择", "荷兰|智能选择"], "include-all-providers": true, "empty-fallback": "REJECT" };
  const originDns = config.dns || {};
  const appendDirectTag = (val) => { if (typeof val === 'string') { return val.split('#')[0] + '#直接连接'; } return val; };
  const formatDnsValues = (dnsValue) => { if (Array.isArray(dnsValue)) return dnsValue.map(appendDirectTag); return appendDirectTag(dnsValue); };
  let finalProxyServerNameserver = directDoh;
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
  return { 
    // 节点IP优先级：ip-version: ipv6-prefer
    // 测速细分/筛选：https://8.8.8.8/generate_204、https://[2001:4860:4860::8888]/generate_204
    "proxy-providers": { "节点": { "type": "inline", "health-check": { "enable": true, "url": "https://dns.google/generate_204", "expected-status": 204, "interval": 600, "timeout": 3000, "max-failed-times": 2, "lazy": true }, "override": { "ip-version": "dual" }, "exclude-filter": "(?i)套餐|剩余|流量|到期|重置|频道|订阅|官网|禁止|客户端|有效|联系|测试|节点|日期|群组|加入|通知|维护|网址|地址|下载|更新|APP|登录|严禁|恢复|处理|谢谢", "payload": subscriptionProxies } },
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
    // "global-ua": "Mozilla/5.0 (Linux; Android 16; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.217 Mobile Safari/537.36",
    // "global-ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.257 Safari/537.36",
    // "external-controller": "127.0.0.1:9090",
    // "secret": "密码",
    // "external-doh-server": "/dns-query",
    // "external-ui": "./zashboard",
    // "external-ui-url": "https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip",
    "lgbm-auto-update": true,
    "lgbm-update-interval": 72,
    "lgbm-url": "https://github.com/vernesong/mihomo/releases/download/LightGBM-Model/Model-large.bin",
    "profile": { "store-selected": true, "store-fake-ip": true, "smart-collector-size": 100 },
    "experimental": { "quic-go-disable-gso": false, "quic-go-disable-ecn": true, "dialer-ip4p-convert": false },
    "port": 0,
    "socks-port": 0,
    "mixed-port": 0,
    "redir-port": 0,
    "tproxy-port": 0,
    // "authentication": ["用户:密码"],
    "tun": {
      "enable": true,
      // Android dummy9 / Windows "以太网 9"
      // "device": "dummy9",
      // Android15+ gvisor / Windows mixed
      "stack": "mixed",
      "auto-route": true,
      "auto-redirect": true,
      "auto-detect-interface": true,
      "strict-route": true,
      "disable-icmp-forwarding": true,
      // "endpoint-independent-nat": true,
      "dns-hijack": ["any:53", "tcp://any:53"],
      // "mtu": 9000,
      "udp-timeout": 300
    },
    "hosts": finalHosts,
    "dns": {
      "enable": true,
      "ipv6": true,
      "cache-algorithm": "arc",
      "use-hosts": true,
      "use-system-hosts": false,
      "prefer-h3": true,
      "respect-rules": false,
      // "listen": "0.0.0.0:1053",
      "enhanced-mode": "fake-ip",
      "fake-ip-range": "198.18.0.0/15",
      "fake-ip-range6": "fd00:dcba:9876::/64",
      "fake-ip-ttl": 1,
      "fake-ip-filter-mode": "rule",
      "fake-ip-filter": [
        "RULE-SET,ads,fake-ip",
        "RULE-SET,ai,fake-ip",
        "RULE-SET,telegram,fake-ip",
        "RULE-SET,proxy@direct,real-ip",
        "RULE-SET,proxy,fake-ip",
        "RULE-SET,direct,real-ip",
        "MATCH,fake-ip"
      ],
      "default-nameserver": directDns,
      "proxy-server-nameserver": finalProxyServerNameserver,
      ...(finalProxyServerNameserverPolicy !== undefined && { "proxy-server-nameserver-policy": finalProxyServerNameserverPolicy }),
      "nameserver": proxyDns,
      "nameserver-policy": {
        "rule-set:ads": ["rcode://name_error"],
        "rule-set:ai": fakeipDns,
        "rule-set:telegram": fakeipDns,
        "rule-set:proxy@direct": directDoh,
        "rule-set:proxy": fakeipDns,
        "rule-set:direct": directDns,
        "rule-set:dnsmasq-china-lite": directDns
      },
      "direct-nameserver": directDns,
      "direct-nameserver-follow-policy": true
    },
    "sniffer": {
      "enable": true,
      "force-dns-mapping": true,
      "parse-pure-ip": true,
      "override-destination": false,
      "sniff": { "HTTP": { "ports": ["80", "8080-8880"], "override-destination": true }, "TLS": { "ports": ["443", "8443"] }, "QUIC": { "ports": ["443", "8443"] } },
      "skip-domain": ["rule-set:ads", "rule-set:ai", "rule-set:telegram", "rule-set:proxy@direct", "rule-set:proxy", "rule-set:direct", "rule-set:dnsmasq-china-lite"],
      "skip-src-address": ["rule-set:telegram_ip", "rule-set:direct_ip"]
    },
    "rule-providers": {
      "ads": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ads.mrs", "path": "./rules/ads.mrs" },
      "ai": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/ai.mrs", "path": "./rules/ai.mrs" },
      "telegram": { ...domainAnchor, "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs", "path": "./rules/telegram.mrs" },
      "proxy@direct": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy@direct.mrs", "path": "./rules/proxy@direct.mrs" },
      "proxy": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/proxy.mrs", "path": "./rules/proxy.mrs" },
      "direct": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/direct.mrs", "path": "./rules/direct.mrs" },
      "dnsmasq-china-lite": { ...domainAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/domain/dnsmasq-china-lite.mrs", "path": "./rules/dnsmasq-china-lite.mrs" },
      "telegram_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/telegram.mrs", "path": "./rules/telegram_ip.mrs" },
      "direct_ip": { ...ipAnchor, "url": "https://raw.githubusercontent.com/echs-top/proxy/main/mrs/ip/direct.mrs", "path": "./rules/direct_ip.mrs" }
    },
    "rules": [
      "DST-PORT,5228-5230,直接连接",
      "SUB-RULE,(RULE-SET,telegram_ip,no-resolve),sub-telegram",
      "RULE-SET,ads,REJECT",
      "SUB-RULE,(RULE-SET,ai),sub-ai",
      "SUB-RULE,(RULE-SET,telegram),sub-telegram",
      "RULE-SET,proxy@direct,直接连接",
      "SUB-RULE,(RULE-SET,proxy),sub-proxy",
      "RULE-SET,direct,直接连接",
      "RULE-SET,direct_ip,直接连接",
      "AND,((NETWORK,udp),(DST-PORT,443)),代理QUIC",
      "MATCH,代理连接"
    ],
    "sub-rules": {
      "sub-ai": ["AND,((NETWORK,udp),(DST-PORT,443)),代理QUIC", "MATCH,国外AI" ],
      "sub-telegram": ["AND,((NETWORK,udp),(DST-PORT,443)),代理QUIC", "MATCH,TELEGRAM" ],
      "sub-proxy": ["AND,((NETWORK,udp),(DST-PORT,443)),代理QUIC", "MATCH,代理连接"]
    },
    "proxies": [{ "name": "IPV4优先", "type": "direct", "udp": true, "ip-version": "ipv4-prefer" },{ "name": "IPV6优先", "type": "direct", "udp": true, "ip-version": "ipv6-prefer" },{ "name": "仅IPV4", "type": "direct", "udp": true, "ip-version": "ipv4" },{ "name": "仅IPV6", "type": "direct", "udp": true, "ip-version": "ipv6" }],
    "proxy-groups": [
      { "name": "代理连接", "type": "select", "proxies": ["最低延迟", "香港|智能选择", "台湾|智能选择", "新加坡|智能选择", "日本|智能选择", "韩国|智能选择", "美国|智能选择", "加拿大|智能选择", "德国|智能选择", "英国|智能选择", "法国|智能选择", "荷兰|智能选择"], "include-all-providers": true, "icon": "https://mihomo.echs.top/img/icon/Global.webp" },
      { "name": "直接连接", "type": "select", "proxies": ["DIRECT", "IPV6优先", "IPV4优先", "仅IPV4", "仅IPV6"], "icon": "https://mihomo.echs.top/img/icon/DIRECT.webp" },
      { "name": "代理DNS", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/Server.webp" },
      { "name": "代理QUIC", "type": "select", "proxies": ["PASS-RULE", "REJECT"], "icon": "https://mihomo.echs.top/img/icon/Settings.webp" },
      { "name": "国外AI", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/AI.webp" },
      { "name": "TELEGRAM", ...dlAnchor, "icon": "https://mihomo.echs.top/img/icon/Telegram.webp" },
      { "name": "最低延迟", "type": "url-test", "tolerance": 30, "include-all-providers": true, "empty-fallback": "REJECT", "hidden": true, "icon": "https://mihomo.echs.top/img/icon/Fast.webp" },
      { "name": "香港|智能选择", ...smartAnchor, "filter": "(?i)🇭🇰|香港|\\bHK\\b|\\bhongkong\\b|\\bhong\\s?kong\\b", "icon": "https://mihomo.echs.top/img/flags/hk.svg" },
      { "name": "台湾|智能选择", ...smartAnchor, "filter": "(?i)🇹🇼|台湾|\\bTW\\b|\\btaiwan\\b", "icon": "https://mihomo.echs.top/img/flags/tw.svg" },
      { "name": "新加坡|智能选择", ...smartAnchor, "filter": "(?i)🇸🇬|新加坡|狮城|\\bSG\\b|\\bsingapore\\b", "icon": "https://mihomo.echs.top/img/flags/sg.svg" },
      { "name": "日本|智能选择", ...smartAnchor, "filter": "(?i)🇯🇵|日本|\\bJP\\b|\\bjapan\\b", "icon": "https://mihomo.echs.top/img/flags/jp.svg" },
      { "name": "韩国|智能选择", ...smartAnchor, "filter": "(?i)🇰🇷|韩国|\\bKR\\b", "icon": "https://mihomo.echs.top/img/flags/kr.svg" },
      { "name": "美国|智能选择", ...smartAnchor, "filter": "(?i)🇺🇸|美国|\\bUS\\b|\\bunitedstates\\b|\\bunited\\s?states\\b", "icon": "https://mihomo.echs.top/img/flags/us.svg" },
      { "name": "加拿大|智能选择", ...smartAnchor, "filter": "(?i)🇨🇦|加拿大|\\bCA\\b|\\bcanada\\b", "icon": "https://mihomo.echs.top/img/flags/ca.svg" },
      { "name": "德国|智能选择", ...smartAnchor, "filter": "(?i)🇩🇪|德国|\\bDE\\b|\\bgermany\\b", "icon": "https://mihomo.echs.top/img/flags/de.svg" },
      { "name": "英国|智能选择", ...smartAnchor, "filter": "(?i)🇬🇧|英国|\\bUK\\b|\\bGB\\b|\\bunitedkingdom\\b|\\bunited\\s?kingdom\\b", "icon": "https://mihomo.echs.top/img/flags/gb.svg" },
      { "name": "法国|智能选择", ...smartAnchor, "filter": "(?i)🇫🇷|法国|\\bFR\\b", "icon": "https://mihomo.echs.top/img/flags/fr.svg" },
      { "name": "荷兰|智能选择", ...smartAnchor, "filter": "(?i)🇳🇱|荷兰|\\bNL\\b|\\bnetherlands?\\b", "icon": "https://mihomo.echs.top/img/flags/nl.svg" },
      { "name": "GLOBAL", "type": "select", "proxies": ["最低延迟", "香港|智能选择", "台湾|智能选择", "新加坡|智能选择", "日本|智能选择", "韩国|智能选择", "美国|智能选择", "加拿大|智能选择", "德国|智能选择", "英国|智能选择", "法国|智能选择", "荷兰|智能选择", "代理连接", "直接连接", "代理DNS", "代理QUIC", "国外AI", "TELEGRAM"], "include-all-providers": true, "hidden": true, "icon": "https://mihomo.echs.top/img/icon/Globefish.webp" }
    ]
  };
}
