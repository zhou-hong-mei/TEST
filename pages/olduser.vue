<template>
    <view class="content-box">
        <hearderVue>
            <view slot="title" style="color: #C9EEF2;">{{ i18n.text568 }}</view>
        </hearderVue>
        <view class="middle">
            <view class="checking">
                <block v-for="(item, index) in List" :key="index">
                    <view @tap="click(item)" :class="consensusIndex == item.id ? 'active' : 'checking-text '">{{ item.name }}</view>
                </block>
            </view>
            <!-- 助记词验证 -->
            <view v-if="consensusIndex == 1" class="middle-bottom">
                <view class="middle-bottom-text">{{ i18n.text569 }}</view>
                <textarea class="mnemonic-init" v-model="mnemonicWord" placeholder="请输入您的老网体私钥进行验证~" />
                <view class="login" @click="memberPastVerify(0)">{{ i18n.text570 }}</view>
            </view>
            <!-- 私钥验证 -->
            <view v-if="consensusIndex == 2" class="middle-bottom">
                <view class="middle-bottom-text">{{ i18n.text571 }}</view>
                <textarea class="mnemonic-init" v-model="mnemonicWord2" placeholder="请输入您的老网体私钥进行验证~" />
                <view class="login" @click="memberPastVerify(1)">{{ i18n.text570 }}</view>
            </view>
        </view>
        <uni-popup ref="popup" type="center">
            <view class="dialog">
               <view class="box">
                <view class="tip">失败提示</view>
                <view class="message">您验证所使用的私钥有误,请检查确认后 进行验证~</view>
               <view class="btn" @tap="closeBtn">
                <view class="confirm">确认</view>
                </view>
              </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
    data() {
        return {
            goToUrl: '/pages/login/resetPass',
            mnemonicWord: '',
            mnemonicWord2:'',
            consensusIndex: 1,
            List: [
                {
                    id: 1,
                    index: 0,
                    name: '助记词验证',
                    type: 'mnemonic'
                },
                {
                    id: 2,
                    index: 1,
                    type: 'private_key',
                    name: '私钥验证'
                }
            ]
        };
    },
    components:{
        uniPopup
    },
    onShow:function(){
    },
    methods: {
        click: function(data) {
            if (this.consensusIndex == data.id) {
                return;
            }
            this.consensusIndex = data.id;
        },
         memberPastVerify(index) {
            // if (this.consensusIndex != 1 || this.consensusIndex != 2) {
            //     return uni.showToast({
            //         title: '请选择类型',
            //         duration: 2000,
            //         icon: 'none'
            //     });
            // }
            if (this.mnemonicWord == '') {
                return uni.showToast({
                    title: '请输入' + this.List[index].name,
                    duration: 2000,
                    icon: 'none'
                });
            }
            if(this.mnemonicWord != "drama nothing jar marble favorite toss dismiss first silly emotion exist program" && this.consensusIndex == 1){
                  this.$refs.popup.open()
                  return
            }
            this.$Ajax('member/past/verify', { type: this.List[index].type, value: this.mnemonicWord }, (data1) => {
						console.log(data1)
            if (data1.code == 0) {
              if(data1.data.phone){
                  return  uni.navigateTo({
                       url: '/pages/login/resetPass?phone='+data1.data.phone
                   });
              }else{
                  return  uni.navigateTo({
                       url: '/pages/login/bindTel?phone='+data1.data.phone
                   });
              }

            } else {
                return uni.showToast({
                    title: data1.msg,
                    duration: 2000,
                    icon: 'none'
                });
            }
                
            })
 
         
        },
        goToPages: function(url) {
            if (url) {
               return  uni.navigateTo({
                    url: url
                });
            }
        },
        closeBtn:function(){
             this.$refs.popup.close();
        }
    }
};
</script>

<style scoped>
.content-box {
    padding-top: calc(92rpx + var(--status-bar-height));
}
.middle {
    min-height: 1242rpx;
    background-color: #0d0d1a;
}
.checking {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20rpx 8% 0 8%;
    width: 84%;
    border-bottom: 2rpx solid #4f90cc;
    color: #31b3da;
    font-size: 32rpx;
}
.checking-text {
    height: 90rpx;
    width: 187rpx;
    text-align: center;
    line-height: 90rpx;
}
.active {
    border-bottom: 4rpx solid #caeff3;
    height: 90rpx;
    width: 187rpx;
    text-align: center;
    line-height: 90rpx;
}
.middle-bottom-text {
    color: #2ea7cd;
    font-size: 28rpx;
    margin: 48rpx 0 32rpx 44rpx;
}
.mnemonic-init {
    width: 660rpx;
    height: 320rpx;
    background-color: #12152d;
    border-radius: 20rpx;
    border: 2px solid #39d7fc;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 16rpx 24rpx;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 38rpx;
    color: #81acba;
    letter-spacing: 4rpx;
}
.uni-textarea-placeholder {
    color: #81acba;
}
.login {
    height: 84rpx;
    background-color: #2fa9cf;
    border-radius: 42rpx;
    width: 630rpx;
    margin: 540rpx auto 0;
    color: #c9eef2;
    text-align: center;
    line-height: 84rpx;
    font-size: 32rpx;
    letter-spacing: 8rpx;
}
  .dialog {
        width: 580upx;
        height: 340upx;
       background-color: #1C1F46;
       border-radius: 10upx;
    }
    .box {
        padding:40upx 60upx;
    }
    .tip {
        color: #fff;
        font-size: 32upx;
        text-align: center;
    }
    .message {
        margin-top: 46upx;
        font-size: 28upx;
        color: #2FA9CF;
        text-align: center;
        margin-bottom: 40upx;
    }
    .btn {
        padding: 0upx 80upx;
    }
    .confirm {
        background-color: #2FA9CF;
        color: #fff;
        height: 68upx;
        line-height: 68upx;
        border-radius: 34upx;
        text-align: center;
    }
</style>
