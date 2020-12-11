import webUrl from './url.js';
let debug = webUrl.debug;
import {
    aesEncrypt,
    aesDecrypt,
    initAesKey,
    rsaEncrypt,
    Encrypt,
    Decrypt,
    decryptedKey
} from '@/js_sdk/encryption/utils.js';
import JSEncrypt from '@/js_sdk/encryption/jsencrypt/jsencrypt';
const asskey = initAesKey(16);
const pako = require('pako');
// console.log(asskey,'888888888888888888888888888888888888888888888888888888')
// const encrypted = rsaEncrypt(asskey, 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxOaol0y8/6pEFdxayuu/o9fY1U8iFrakrDornwLKgNhDrbIHYVoG/+7WcczzuUbee8KVj8UkBRAg578iw0O/654KB34CEzgsIH444aTQhJwvgBT8L4DkO/rPjpa4rkzfHjWGMrlG1Y4/FFKX4dJwDgBIRfS1xarEQARHv4ZhW867Eh3hgKLOigH3+OFDyjQfa7e1xlsLhnHvlgp1GC/ONhYzFktuCS8sHTa7qUuJAY8Bd2oJWaHBpSEjkaqvMOIn/Xiliset7M1mkufkBWkZLC1xa0SPIgGq3I2GPL2/G09LKztZ6HMHXaoId67OIKnSj05JTtv4GESqcWXtW0Q7mQIDAQAB')
/**
 * 加密
 */
function AesEncrypt(data) {


    let Data = Encrypt(JSON.stringify(data), asskey);
    // rsa加密
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ9s1qlOyv9qpuaTqauW6fUftzE50rVk3yVPZwv1aO1Ch/XSEz76xCwkyvqpaqceRXrPpdBmO5+ruJ+I8osOHo7L5GWEOcMOO+8izp9hXKBBrmRMD4Egpn00k9DhVIEKp/vyddZPS/doxB8onhN6poTJDLdFLFVEicMf52caN9GQIDAQAB'
    );
    var encrypted = encrypt.encrypt(asskey);
    // 创建json对象
    return {
        "requestData": Data,
        "encrypted": encrypted
    }
}
/*
aes解密
AES解密
*/
function AesDecrypt(result) {
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(
        'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL2KSsvFr9yAtldC6AFAWF3EI9CYRn2P2Fp2trzUyoDGZGRzd4XBE4AeT/7f1+GYPCC2MT/Dhw7pcNpsv+aLlXfuKgHJLVCmi8XxmUmDP9GO9XdMRqe/GW6uJ1eU1N853jm4L35OZHYPNGTmnblTUXvjAXsrYpIa/aDKpm+23Gt/AgMBAAECgYBqtFMdWsKBkZiVkZ4JLk9RIl3DTibJA1UawKBpuCX0zzuvbW3JSAQRaX9BjoT7hPe8trUNH6eGFpeo7/Ys9UIEU61c33Q49NBPEVXH2+PhefIE74b8/H9cu1iYQyn9NSGKt0clo5/CU2G3OA7h+xqD9b7ifd4+DtdrS3KDpTPa0QJBAPhBkdpomvIWmUfI69WerwZHrzMZEFYHThG9SbWw0UgIjdKmSiQmrXawPZLe/o3BxPSIIXDzxiVAimdjVJcfC4kCQQDDc9nUvbLt4TryCfnR7x2KECh3BDEv/cuw/e67m0HYOdooV4KQ4aVous/TbbpcyPGcC180XCHjF11gqVa6hdTHAkBpEJcBsDOjMR093DKy/a1lIwFqxri7L+xCZbHES0jHC5e6BtZp5lSTXpMwjV997vvD4bkFbKX3LhFlIAy0yFbBAkAgvjC43gqypS+9yoQKcldtgKV2wsIGuyq7fN7YmPrf4Vk1tutNoC+YqusUDWbSEmu/a3xIhkK7C3f+MIAyASeTAkEA6CalrJUYBeDcaSHKhmJIceQ7baf8Q7uMYY5gRYuQ4rGudcXXaLi+o2I9f9in5qxE/SM/y9LuBmkzrCuy0tlNXA=='
    );
    let data = atob(result.encrypted);
    // console.log('9999999999999999999999999999是否周到整理')
    // 将base64解码后的字符串解压
    data = pako.inflate(data, {
        to: 'string'
    });
    var aesKey = decrypt.decrypt(data);
    
    // 用aes秘钥进行解密
    // var resultData = Decrypt(result.responseData, aesKey);
    // console.log(resultData)
    // alert("解密的数据：" + resultData);
    // console.log(resultData)
    return aesKey;
}

// console.log(AesDecrypt('t71NGhbMZkWuzkp86W17G+uZc2GXuuumZTIH0zOG/xM='),'流口水打飞机爱丽丝的看法阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬文峰问文案曲蔚然翁');
const ajax = (url, data, successCallback, failCallback, type = "POST") => {
    let lang = uni.getStorageSync('languageRadar')=='zh'?'zh-cn':'en-us';
    var token = uni.getStorageSync('token');


    //  加密过滤列表
    let urlpatten = [
        '/front/otc/kDatacache'
    ];
    if (urlpatten.length) {
        for (let key of urlpatten) {
            if (url == key) {
                debug = true;
                break;
            }
        }
    }
    debug = true;
    uni.request({
        url: webUrl.webDtUrl + url,
        // url: 'http://192.168.0.185:8081/testEncrypt',
        data: debug ? data : AesEncrypt(data),
        method: type || 'POST',
        dataType: 'json',
        header: debug ? {
            "token": token,
            "appVersion": webUrl.version,
            "Accept-Language": lang,
            // "token":'8b53c0d8b3201d9da0803877a86f80c7',
            // "x-requested-with": "XMLHttpRequest",
            "content-type": "application/json",
            "version":webUrl.version,
            'uuid':webUrl.uuid,
           'platform':webUrl.platform
            // "content-type": "application/x-www-form-urlencoded"
        } : {
            "token": token,
            "appVersion": webUrl.version,
            "Accept-Language": lang,
            "content-type": "application/x-www-form-urlencoded",
            // "content-type": "application/json",
            "decode": 1,
            "version":webUrl.version,
            'uuid':webUrl.uuid,
            'platform':webUrl.platform
        },
        success: (res) => {
            // console.log(url+"--->"+JSON.stringify(data)+"--->"+JSON.stringify(res.data));
            // console.log(decryptedKey(res.data.encrypted));
            // console.log(AesDecrypt(res.data),AesDecrypt(res.data).length,'*******************************************');

            if (!debug) {
                res.data = JSON.parse(AesDecrypt(res.data) || '{}');
            }
            
            
            // 调试时打印
            let urls = [
                // '/search/getAppmenu',

            ]
            urls.map((item) => {
                if (url == item) {
                    console.log(res.data);
                    console.log('+++++++++++++++++');
                    console.log(url + '：接口返回的数据', '参数：' + JSON.stringify(data));
                    console.log('------------------');
                }
            })

            var code = res.data.code;
            if (code == 0 || code == -6) {
                // let data = atob(res.data);
                // console.log('9999999999999999999999999999是否周到整理')
                // 将base64解码后的字符串解压
                // data = pako.inflate(data, {
                // 	to: 'string'
                // });
                // res.data = JSON.parse(data);
                // console.log('**********4444444444444444444');
                successCallback(res.data);
            } else if (code == -2) {
                uni.hideLoading();
                uni.removeStorageSync("token");
                uni.reLaunch({
                    url: '/pages/login/login'
                })
                // console.log('**********登录失败');

            } else if (code == -1) {
                if (failCallback) {
                    failCallback(res.data);
                    if (res.data.msg != '当日累计取消交易3笔，当日不可再购买') {
                        uni.showToast({
                            title: res.data.msg,
                            icon: "none",
                            duration: 2000,
                            position: 'bottom'
                        })
                    }
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 2000,
                        position: 'bottom'
                    })
                }

            } else if (code == -4) {
                uni.hideLoading();
                uni.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000,
                    position: 'bottom'
                })
            }
        },
        fail: () => {
            uni.showToast({
                title: lang == 'zh' ? '请稍后重试' : 'Please try again later',
                icon: "none",
                position: 'bottom'
            });
        }
    })
}
export default ajax
