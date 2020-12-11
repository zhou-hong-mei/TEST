<template>
    <view class="page">
       <hearderVue>
           <view slot="title" style="color: #C9EEF2;">提币</view>
       </hearderVue>
       <view class="tab">
           <view class="tabBox">
               <view class="trade1":class="{ type: tradeType == 0 }" @click="changeTrade(0)">USDT</view>
               <view class="trade2":class="{ type2: tradeType == 1 }" @click="changeTrade(1)">DCM</view>
           </view>
       </view>
     <view class="content">
      <view class="infoBox">
           <view class="info">
             <view class="infoDetail">
               <view class="numberDetail">
                    <view class="title">提币地址</view>
                    <image src="../../static/images/ic_scan.png"></image>
               </view>
              
               <view class="input1"><input placeholder="请输入提币地址" placeholder-class="plClass"></input></view>
           </view>
         </view>
       <view class="info">
        <view class="infoDetail">
          <view class="numberDetail">
           <view class="title">提币数量</view>
           <view class="title">资金账户可用 0.134678</view>
          </view>
           <view class="input1"><input placeholder="请输入提币地址" placeholder-class="plClass"></input></view>
        </view>
       </view>
        <view class="title" style="margin-top: 60upx;">网络燃料</view>
        <view class="rechargeDetail">
            <view class="title" style="margin-top: 60upx;">提笔说明:</view>
            <view class="detail">提币地址必须为0x开头的USDT(ERC20)钱包地址。</br> 区块链打包后，到账时间受区块网络拥堵程度而定，请耐心 等待。</view>
        </view>
       </view>
       <view class="bottom">
          <view class="numberBox">
              <view class="numberDetail">
                  <view class="title">到账数量</view>
                  <view class="title">0.134678 USDT</view>
              </view>
              <view class="confirmBtn">确认提币</view>
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
       .bottom {
         
           position: absolute;
           bottom: 65upx;
            width: 100%;
       }
       .numberBox {
            padding: 0 30upx;
       }
       .numberDetail {
           display: flex;
           justify-content: space-between;
           align-items: center;
           image {
               width: 34upx;
               height: 29upx;
           }
       }
       .confirmBtn {
           width: 100%;
           color: #CAEFF3;
           background-color: #2FA9CF;
           border-radius: 10upx;
           height: 84upx;
           text-align: center;
           line-height: 84upx;
           margin-top: 38upx;
       }
</style>
