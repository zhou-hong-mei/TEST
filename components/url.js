//开发

var ISHTTPS = false;
// #ifdef APP-PLUS
var version = uni.getStorageSync('app_versions')||('v'+plus.runtime.version);
var uuid =  plus.device.uuid;
var platform = uni.getSystemInfoSync().platform;
// #endif
// #ifndef APP-PLUS
var version = "v1.26";
var uuid =version;
var platform = uni.getSystemInfoSync().platform;

// #endif

// const IP='www.akmax.one'
// const Websocket_IP='www.akmax.one'
// 测试
// const IP='121.196.20.170:8201'
// const Websocket_IP='121.196.20.170:8888'



// const IP='www.radarstarlab.org'
// 正式
// const IP="app.a-radar.cn";
// const Websocket_IP='ws.a-radar.cn';

  // const IP="211.110.12.196";
  // const Websocket_IP='211.110.12.196';
  
//本地
// const IP='192.168.0.185:8002'
// const Websocket_IP='192.168.0.185:8084'
// const dt_IP = '192.168.0.201:2010'
// const dt_Websocket_IP = '192.168.0.201:2010/'

// 测试
// const IP = "211.110.12.196"
// const Websocket_IP = '211.110.12.196'
var IP = '';
var Websocket_IP = '';
var webDtUrl = '';
// process.env.NODE_ENV === 'development'
if (process.env.NODE_ENV === 'development') {
    // 开发环境'
    // IP = '211.110.12.196';
    // Websocket_IP = '211.110.12.196';
    IP="app.a-radar.cn";
    Websocket_IP = 'ws.a-radar.cn';
    
    
    //李子本地
    // IP='192.168.0.250:8081';
    // Websocket_IP='192.168.0.250:8083';
    webDtUrl = (ISHTTPS ? 'https://' : 'http://') +  '192.168.0.223';
    // webDtUrl = 'https://192.168.0.182:43443';
    
} else {
    IP="app.a-radar.cn";
    Websocket_IP = 'ws.a-radar.cn';
    // IP = '211.110.12.196';
    // Websocket_IP = '211.110.12.196';
    webDtUrl = (ISHTTPS ? 'https://' : 'http://') + '192.168.0.223';
}

const webUrl = (ISHTTPS ? 'https://' : 'http://') + IP;
// const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + IP;
// const webDtUrl = (ISHTTPS ? 'https://' : 'http://') + 'php-api.a-radar.cn';
// const webDtUrl = (ISHTTPS ? 'https://' : 'http://') +  '192.168.0.101';
// 开发
const websocketUrl = (ISHTTPS ? 'wss://' : 'ws://') + Websocket_IP;
const slideURL = webUrl + "/search/downloadSlide?id=";
const currnecyURL = webUrl + "/search/currencyById?id=";
const currnecyNameURL = webUrl + "/search/currencyByName?name=";
const basePthURL = "";
const basePthURL2 = webUrl + "/search/download?path=";
export default {
    webUrl: webUrl,
    webDtUrl: webDtUrl,
    websocketUrl: websocketUrl,
    slideURL: slideURL,
    currnecyURL: currnecyURL,
    currnecyNameURL: currnecyNameURL,
    basePthURL: basePthURL,
    basePthURL2: basePthURL2,
    version: version,
    platform:platform,
    uuid:uuid,
    debug: true , // true 未加密，false, 加密
}
