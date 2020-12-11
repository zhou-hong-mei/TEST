<template>
    <view class="page">
        <hearderVue>
            <view slot="title" style="color: #C9EEF2;">充币 </view>
        </hearderVue>
        <view class="tab">
            <view class="tabBox">
                <view class="trade1":class="{ type: tradeType == 0 }" @click="changeTrade(0)">USDT</view>
                <view class="trade2":class="{ type2: tradeType == 1 }" @click="changeTrade(1)">DCM</view>
            </view>
        </view>
      <view class="content">
       <view class="qrBox">
       <view class="address-box">
           <view class="address-title" v-if="tradeType==0">USDT(ERC20)</view>
           <view class="address-title" v-if="tradeType==1">DCM</view>
           <view class="qrcode-box">
               <uni-qrcode class="qrcode-img" cid="qrcode2218" :text="address" :margin="10" :size="size" :makeOnLoad="true" v-if="address"></uni-qrcode>
           </view>
           <view class="address-sm-title">钱包地址</view>
           <view class="address_txt">0xdfsdkfhsdlhfsdfjslkfjsdlfjksdlfjkfdghkdhgdas</view>
           <view class="copy-btn">复制地址</view>
       </view>
        <view class="parse">请勿向上述充值任何非DCM资产,否则资产将不可找回</view>
      </view>
      </view>
    </view>
</template>

<script>
 export default {
    data(){
        return {
            address: '8838383',
            backlogin: false,
            size: uni.upx2px(262),
            tradeType:0,
        }
    },
    methods:{
        changeTrade(index) {
        	this.tradeType = index;
        },
    }
   }
</script>

<style scoped lang="scss">
    .page {
        background-color: #0D0D1A;
        height: 100%;
        width: 100%;
        position: absolute;
      
    }
    .tab {
        width: 100%;
        border-bottom: 2rpx solid #30ADD3;
        margin-top: 120rpx;
       
        .tabBox {
             height: 100rpx;
             padding: 0 203rpx;
             display: flex;
             justify-content: space-between;
             text-align: center;
        }
        .trade1 {
            font-size: 38rpx;
            color: #39D7FC;
            width: 160rpx;
            // margin-right: 40rpx;
          
            
        }
        .type {
            width: 160rpx;
            color: #C9EEF2;
            font-size: 38rpx;
             border-bottom: 1rpx solid #CAEFF3; 
        }
        .type2 {
           font-size: 38rpx;
           color: #C9EEF2 !important;
           width: 160rpx;
           border-bottom: 1rpx solid #CAEFF3; 
        }
        .trade2 {
            width: 160rpx;
            color: #39D7FC;
            font-size: 38rpx;
        }
       }
       .content {
           width: 100%;
       }
       .qrBox {
            padding:0upx 80upx;
       }
        .address-box {
            width: 600upx;
            min-height: 700upx;
            margin: 60upx auto 0;
            background-color: #1c1f46;
            border-radius: 10upx;
            position: relative;
            overflow: hidden;
            text-align: center;
        }
        .address-box::before {
            content: "";
            position: absolute;
            width: 500upx;
            height: 500upx;
            left: -250upx;
            top: -300upx;
            background-color: rgba(255,255,255,0.1);
            border-radius: 50%;
        }
        .address-box::after {
            content: '';
            position: absolute;
            width: 600upx;
            height: 600upx;
            right: -250upx;
            bottom: -180upx;
            background-color: rgba(255,255,255,0.1);
            border-radius: 50%;
        
        }
        .address-title {
            margin-top: 46upx;
            margin-bottom: 56upx;
            color: #C9EEF2;
        }
        .qrcode-box {
            width: 280upx;
            height: 280upx;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10upx;
            margin-bottom: 30upx;
            margin-left: auto;
            margin-right: auto;
        }
        .qrcode-img {
            width: 262upx;
            height: 262upx;
        }
        .address-sm-title {
            font-size: 28upx;
            font-weight: 500;
            color: #39D7FC;
            line-height: 1;
            margin-bottom: 28upx;
            position: relative;
            z-index: 10;
        }
        .address_txt {
            font-size: 26upx;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 40upx;
            margin-bottom: 32upx;
            word-wrap:break-word;
            word-break:break-all;/* 强制英文单词断行  */
            position: relative;
            z-index: 10;
            padding: 0 40upx;
        }
        .copy-btn {
            width: 240upx;
            height: 60upx;
            border: 2rpx solid #39D7FC;
            border-radius: 30upx;
            color: #39D7FC;
            font-size: 26upx;
            margin: 0 auto;
            position: relative;
            z-index: 10;
            line-height: 60upx;
            margin-bottom: 40upx;
        }
        .parse {
            font-size: 22upx;
            font-weight: 500;
            color: #4780B7;
            line-height: 32upx;
            margin: 42upx 30upx 48upx;
            text-align: center;
        }
        .accelerate-btn {
            margin: 0 60upx 0;
        }
</style>
