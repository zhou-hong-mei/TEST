<template>
    <view class="content-box" >
       <hearderVue>
           <view slot="title" style="color: #C9EEF2;">{{i18n.text559}}</view>
       </hearderVue>
       <view class="middle">
           <view class="checking">
               <block v-for="(item, index) in List" :key="index">
                   <view  @tap="click(item)" :class="consensusIndex == item.id ? 'active' : 'checking-text ' ">{{item.name}}</view>
               </block>
           </view>
           <!-- 助记词验证 -->
           <view v-if="consensusIndex == 1" class="middle-bottom">
               <view class="middle-bottom-text">
                  {{i18n.text561}}
               </view>
               <textarea class="mnemonic-init" v-model="mnemonicWord" placeholder="请输入您的账户助记词~" />
               <view class="login" @tap="login()">
                   {{i18n.text562}}
               </view>
           </view>
           <!-- 私钥验证 -->
           <view v-if="consensusIndex == 2" class="middle-bottom">
               <view class="middle-bottom-text">
                   {{i18n.text563}}
               </view>
               <textarea class="mnemonic-init" v-model="mnemonicWord" placeholder="请输入您的账户私钥~" />
               <view class="login" @tap="login()">
                   {{i18n.text562}}
               </view>
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
                showTips:true,
                'mnemonicWord': '',
                'consensusIndex': 1,
                "List": [{
                    id : 1,
                    name: "助记词验证"
                },
                {
                    id: 2,
                    name: "私钥验证"
                }]
            }
        },
        components:{
            uniPopup
        },
        methods:{
            click:function(data) {
                if(this.consensusIndex == data.id) {
                    console.log(data)
                    return;
                }
                this.consensusIndex = data.id;
            },
            login(){
                //判断客户端平台
                let {mnemonicWord,version} = this;
                let type = 0;
                const res = uni.getSystemInfoSync();
                if (res.platform == 'ios') {
                    type = 1
                }
                if(mnemonicWord == ''){
                    
                    if(this.consensusIndex == 1) {
                        return uni.showToast({
                            title: "请输入助记词",//'请输入助记词'this.i18n.tt6,
                            icon: 'none'
                        })
                    }
                    if(this.consensusIndex == 2) {
                        return uni.showToast({
                            title: "请输入私钥",//'请输入助记词'this.i18n.tt6,
                            icon: 'none'
                        })
                    }
                }
                if(mnemonicWord != "abc"){
                      this.$refs.popup.open()
                      return
                }
                console.log('gogogogo')
                uni.navigateTo({
                    url:'/pages/activation/activation',
                })
                // this.$Ajax('/front/loginByMnemonicWord',{
                //     mnemonicWord,// (string, optional): 助记词 ,
                //     type,// 手机类型:[0:安卓 1:ios] ,
                //     version,
                //     }, (res) => {
                //         this.$tools.toast(res.msg);
                //         let token = res.obj.token;
                //         // console.log(token,'&&&&&&&&&&&&');
                //         uni.setStorageSync("token", token);
                //         uni.setStorageSync("tokenRe", res.obj.token);
                //         setTimeout(()=>{
                //            uni.switchTab({
                //                url:'/pages/home/home',
                //            })
                //         },1500)
                // })
            },
            closeBtn:function(){
                 this.$refs.popup.close();
            }
        },
        

    }
</script>

<style scoped>
    .content-box{
        padding-top: calc(92rpx + var(--status-bar-height));
       
    }
    .middle {
        min-height: 1242rpx;background-color: #0D0D1A;
    }
    .checking {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20rpx 8% 0 8%;
        width: 84%;
        border-bottom: 2rpx solid #4F90CC;
        color: #31B3DA;
        font-size: 32rpx;
    }
    .checking-text {
        height: 90rpx;
        width: 187rpx;
        text-align: center;
        line-height: 90rpx;
    }
    .active {
        border-bottom: 4rpx solid #CAEFF3;
        height: 90rpx;
        width: 187rpx;
        text-align: center;
        line-height: 90rpx;
    }
    .middle-bottom-text {
        color: #2EA7CD;
        font-size: 28rpx;
        margin: 48rpx 0 32rpx 44rpx;
    }
    .mnemonic-init{
        width: 660rpx;
        height: 320rpx;
        background-color: #12152D;
        border-radius: 20rpx;
        border: 2px solid #39D7FC;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 16rpx 24rpx;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 38rpx;
        color: #81ACBA;
        letter-spacing: 4rpx;
    }
    .uni-textarea-placeholder {
        color: #81ACBA;
    }
    .login {
        height: 84rpx;
        background-color: #2FA9CF;
        border-radius: 42rpx;
        width: 630rpx;
        margin: 540rpx auto 0;
        color: #C9EEF2;
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
