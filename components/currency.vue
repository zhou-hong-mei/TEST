<template>
    <view>
        <view class="hot">
            <image class="frame_img" src="@/static/images/home/difi/frame.png" mode="widthFix"></image>
            <text>{{i18n.fw_329}}</text>
        </view>
        <view class="currency" style="margin-bottom: 20rpx;">
            <view class="currency-list" v-for='(item,index) in currencyData' :key="index">
                <view style="height:40rpx;width:100%"></view>
                <view class="currency-list-t">
                    <view class="currency-list-t-l">
                        <view class="headimg">
                            <image class="headimg-icon" :src="item.icon"></image>
                        </view>
                        <view class="pearl">
                            <view style="width: 100%;height: 50rpx;">
                                <p style="color:#252525;font-size:30rpx;float:left">{{item.currencyName}}</p>
                                <p class="prophesy">{{item.lable}}</p>
                            </view>
                            <p style="color:#BDBDBD;font-size:24rpx">{{item.currencyFullName}}</p>
                        </view>
                    </view>
                    <view @tap="goTransaction(item)" class="currency-list-t-r">{{i18n.fw_348}}</view>
                    <!-- <view @tap="goBuy(item)" class="currency-list-t-r" style="background-color:#FC6668;margin-right:10rpx">{{i18n.fw_347}}</view> -->
                </view>
                <view class="currency-list-b">
                    <!-- 最新价 -->
                    <view class="flex-item">
                        <p style="color: #252525;font-size: 34rpx">{{item.currentPrice}}</p>
                        <p style="color:#bdbdbd;font-size:24rpx">{{i18n.text345}}</p>
                    </view>
                    <!-- 折合 -->
                    <view class="flex-item">
                        <p style="color: #252525;font-size: 34rpx">￥{{item.rmbprice}}</p>
                        <p style="color:#bdbdbd;font-size:24rpx">{{i18n.text121}}</p>
                    </view>
                    <!-- 涨跌幅 -->    
                    <view class="flex-item">

                        <p style="color: #07C5A3;font-size: 34rpx" v-if="item.rise>= 0">+{{item.rise}}%</p>
                        <p style="color: #FC6668;font-size: 34rpx" v-if="item.rise< 0">{{item.rise}}%</p>
                        <p style="color:#bdbdbd;font-size:24rpx;float:right">{{i18n.text346}}</p>
                    </view>
                </view>
                <view class="currency-line">

                </view>
            </view>
            <view class="nodata" v-if="!currencyData||currencyData.length==0">
                <image src="@/static/images/home/difi/nodata.png" mode="widthFix"></image>
                <view class="nodata-txt">{{i18n.fw_346}}<!-- 暂无币种信息！ -->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "currency",
        props: {
            currencyData: {
                type: Array,
                default: () => {
                    return [];
                }
            },

        },
        data() {
            return {




            }
        },
        onShow() {


        },
        computed: {
            i18n() {
                return this.$t('message')
            }
        },
        methods: {



            /**
             * 去认购
             */
            goBuy: function(data) {},
            /**
             * 去交易按钮
             */
            goTransaction: function(data) {
                var tradeId = data.tradeId;
                var usings = data.usings;
                var tradeCurrencyName = data.currencyName;

                if (!usings) {
                    return this.$tools.toast(this.$t('message.text447'))
                }


                // uni.setStorageSync("tabIndexHeader",0);
                //uni.closeSocket();
                uni.setStorage({
                    key: 'tradeId-temp',
                    data: tradeId,
                    success() {
                        setTimeout(() => {

                            uni.switchTab({
                                url: "../trade/trade"
                            })
                        }, 500)
                    }
                })

            },
        }
    }
</script>

<style>
    .hot {
        width: 225rpx;
        height: 70rpx;
        background-color: #00967A;
        border-radius: 0rpx 58rpx 12rpx 0rpx;
        color: #fff;
        font-size: 30rpx;
        line-height: 60rpx;
        /* text-align: center; */

    }

    .frame_img {
        width: 22upx;
        height: 25upx;
        margin-right: 11upx;
        margin-left: 22upx;
    }

    .currency {
        margin-top: -10rpx;
        border-radius: 16rpx;
        background-color: #fff;
    }

    .currency-list {
        padding: 0 15rpx;
    }

    .prophesy {
        background-color: rgba(7, 197, 162, 0.2);
        float: left;
        color: #00967A;
        font-size: 24rpx;
        line-height: 50rpx;
        padding: 0 10rpx;
        height: 100%;
        border-radius: 19rpx;
        margin-left: 20rpx;
        text-align: center;
    }

    .currency-list-t {
        margin-bottom: 40rpx;
        height: 70rpx;
    }

    /* .yuyanji{
        min-width: 85upx;
        height: 38upx;
        line-height: 38upx;
        font-size: 22upx;
        font-weight: bold;
        color: #00967A;
        background: rgba(7, 197, 162, 0.21);
        border-radius: 19upx;
        display: inline-block;
        margin-left: 16upx;
        text-align: center;
        padding: 0 10upx;
        transform: translateY(-4upx);
    } */

    .currency-list-t-l {
        float: left;
        height: 100%;
    }

    .currency-line {
        border: 1px solid #F2F2F2;
    }

    .headimg {
        width: 70rpx;
        height: 100%;
        border-radius: 50%;
        float: left;
        margin-right: 10rpx;

    }

    .headimg-icon {
        width: 70rpx;
        height: 100%;
    }

    .pearl {
        float: left;
        font-size: 28rpx;
        margin-right: 10rpx;
    }

    .currency-list-t-r {
        background-color: #07C5A3;
        border-radius: 50rpx;
        float: right;
        font-size: 24rpx;
        width: 138rpx;
        height: 60rpx;
        color: #fff;
        text-align: center;
        line-height: 60rpx;
    }

    .currency-list-b {
        margin-bottom: 40rpx;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
    }

    .nodata {
        padding: 100upx 0;
        font-weight: 500;
        color: #001A28;
        line-height: 42upx;
        opacity: 0.4;
        text-align: center;
    }

    .nodata image {
        width: 176upx;
        height: 158upx;
        margin-bottom: 38upx;
    }
</style>
