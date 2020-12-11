<template>
    <view class="page">
       <hearderVue>
           <view slot="title" style="color: #C9EEF2;">划转</view>
       </hearderVue>
       <view class="tab">
           <view class="tabBox">
               <view class="trade1":class="{ type: tradeType == 0 }" @click="changeTrade(0)">USDT</view>
               <view class="trade2":class="{ type2: tradeType == 1 }" @click="changeTrade(1)">DCM</view>
               <view class="trade2":class="{ type2: tradeType == 2 }" @click="changeTrade(2)">DCL</view>
           </view>
       </view>
    <view class="content">
      <view class="infoBox">
        <view class="huzhuanBox">
            <view class="boxDetail">
              <view class="left">
                <view class="from">
                    <view class="fromDetail">
                        <view class="title">从</view>
                        <view class="count">资金账户</view>
                        <image src="../../static/images/right.png"></image>
                    </view>
                </view>
                <view class="from">
                    <view class="fromDetail">
                        <view class="title">到</view>
                        <view class="count">交易账户</view>
                        <image src="../../static/images/right.png"></image>
                    </view>
                </view>
            </view>
            <view class="right" @click="change">
                <image src="../../static/images/change.png"></image>
            </view>
           </view>
           
        </view>
        <view class="info">
            <view class="infoDetail">
              <view class="numberDetail">
                   <view class="title">划转数量</view>
                   <view class="title">可用 0.134678</view>
              </view>
               <view class="input1">
                <view class="numberDetail">
                   <input placeholder="输入划转数量" placeholder-class="plClass"></input>
                   <view class="title">全部</view>
                </view>
               </view>
            </view>
        </view>
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
           change(){
               
           }
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
    .content {
          width: 100%;
     }
    .tab {
        width: 100%;
        border-bottom: 2rpx solid #30ADD3;
        margin-top: 120rpx;
       
        .tabBox {
             height: 100rpx;
             padding-left: 20upx;
             text-align: center;
             display: flex;
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
      
       .infoBox {
           padding: 0upx 30upx;
       }
       .huzhuanBox {
           margin-top: 67upx;
           width: 100%;
           height: 189upx;
           border: 2upx  solid #2FA9CF;
           border-radius: 10upx;
       }
       .boxDetail {
           padding: 22upx 36upx;
           justify-content: space-between;
           display: flex;
           .from {
               margin-bottom: 34upx;
               border-bottom: 2upx solid #30ADD3;
           }
           .fromDetail {
                display: flex;
                 align-items: center;
               margin-bottom: 20upx;
           }
           .count {
               margin-left: 40upx;
               color: #C9EEF2;
               font-size: 28upx;
           }
           image {
               margin-left: 200upx;
               width: 12upx;
               height: 20upx;
           }
       }
       .right {
           width: 198upx;
           height: 150upx;
           border-radius: 10upx;
           background: #2FA9CF;
           position: relative;
               image{
                   align-items: center;
                   position: absolute;
                   width: 86upx;
                   height: 78upx;
                   left: 50%;
                   top: 50%;
                   margin-left: -40upx;
                   margin-top: -40upx;
               }
        
       }
       .infoDetail {
            margin-bottom: 22upx;
       }
       .info {
          margin-top: 60upx;
          border-bottom: 2upx solid #30ADD3;
       }
       .title {
           color: #31B3DA;
           font-size: 24upx;
       }
       .input1 {
           
           margin-top: 40upx;
           
           input{
           	font-size:32rpx;
           	font-weight:bold;
           	color:#C9EEF2;
           }
       }
       .plClass {
         color: #457CB2;
         font-size: 28rpx;
       }
       .detail {
         color: #4780B7;
         font-size: 26upx;
         margin-top: 22upx;
       }
        .numberDetail {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
</style>
