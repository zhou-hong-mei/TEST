import webUrl from './url.js'
const debug = webUrl.debug;
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
    var aesKey = decrypt.decrypt(result.encrypted);
    // 用aes秘钥进行解密
    var resultData = Decrypt(result.responseData, aesKey);
    // alert("解密的数据：" + resultData);
    // console.log(resultData)
    return resultData;
}


const ajax = (url, data, successCallback, failCallback, type = "POST") => {
    var token = uni.getStorageSync('tokenRe');
    //    let requestData = encryptedKey(data);
    //       data = {
    //           requestData,
    //       }
    uni.request({
        url: webUrl.webUrl + url,
        // data: AesEncrypt(data),
        data: debug ? data : AesEncrypt(data),
        method: type || 'POST',
        dataType: 'json',
        header: debug ? {
            "token": token,
            "appVersion": webUrl.version,
            "version": webUrl.version,
            'uuid': webUrl.uuid,
            'platform':webUrl.platform,
            // decode: 1,//后台判断是否加密
            // "token":'8b53c0d8b3201d9da0803877a86f80c7',
            // "x-requested-with": "XMLHttpRequest",
            "content-type": "application/x-www-form-urlencoded"
        } : {
            "token": token,
            "appVersion": webUrl.version,
            "decode": 1,
            "version": webUrl.version,
            'uuid': webUrl.uuid,
             'platform':webUrl.platform
        },
        success: (res) => {
            if (!debug) {
                res.data = JSON.parse(AesDecrypt(res.data));
            }
            // console.log(res.data);
            var code = res.data.code;


            if (code == 0 || code == -6) {
                successCallback(res.data);
            } else if (code == -2) {
                uni.removeStorageSync("token")
                uni.navigateTo({
                    url: '/pages/login/login'
                })

            } else if (code == -1) {
                if (failCallback) {
                    failCallback(res.data);
                    uni.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 2000,
                        position: 'bottom'
                    })
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 2000,
                        position: 'bottom'
                    })
                }

            } else if (code == -4) {
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
                title: '请稍后重试',
                position: 'bottom'
            });
        }
    })
}
export default ajax
