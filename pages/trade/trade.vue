<template>
   <view class="page">
        <view class="tradePage">
          <view class="tradeBox">
            <view class="topName">
                <view class="nameLeft">
                   <!-- <view style="display: flex;"> -->
                       <image src="../../static/images/leftBox.png" class="leftImg"  @click="showLeft"></image>
                       <view class="biName">DD/USDT</view>
                       <image src="/static/images/downMore.png"></image>
                       <view class="nameRate" v-if="rise >= 0">+0%</view>
                       <view class="nameRate nameRateRed" v-else>0%</view>
                  <!-- </view> -->
                </view>
                <view>
                 <image src="../../static/images/trade.png" class="tradeImg" @click="kLine"></image>
                </view>
            </view>
            <view class="tradeCenter">
                <view class="centerLeft">
                    <view class="changeTrade">
                        <view class="buyTrade" :class="{ buyClass: tradeType == 0 }" @click="changeTrade(0)">
                            <view>买入</view>
                        </view>
                        <view class="sellTrade" :class="{ sellClass: tradeType == 1 }" @click="changeTrade(1)">
                            <view>卖出</view>
                        </view>
                    </view>
                    <view class="priceDiv" v-if="tradeType == 0">
                       
                        <input v-if="xjIndex == 1"  style="color: #fff;" placeholder="买入价" placeholder-class="plInput" v-model="buyPrice" />
                        <input v-if="xjIndex == 2" style="color: #fff;" placeholder="买入价"
                            placeholder-class="plInput2" disabled />
                        <view v-if="xjIndex == 1" class="jian" @click="priceSelect('buy', 'sub')">-</view>
                        <view v-if="xjIndex == 1" class="add" @click="priceSelect('buy', 'add')">+</view>
                    </view>

                    <view class="priceDiv" v-if="tradeType == 1">
                        <input v-if="xjIndex == 1" style="color: #fff;" placeholder="卖出价" placeholder-class="plInput" v-model="sellPrice"  />
                        <input v-if="xjIndex == 2" style="color: #fff;" placeholder="卖出价"
                            placeholder-class="plInput2" disabled />
                        <view v-if="xjIndex == 1" class="jian" @click="priceSelect('sell', 'sub')">-</view>
                        <view v-if="xjIndex == 1" class="add" @click="priceSelect('sell', 'add')">+</view>
                    </view>
                    <view class="zhCny" v-if="tradeType == 0">≈ {{ (456 * usdtPrice) | number(pricetDigit) }}CNY</view>
                    <view class="zhCny" v-if="tradeType == 1">≈ {{ (sellPrice * usdtPrice)  | number(pricetDigit) }}CNY</view>
                    <view class="quantityDiv" v-if="tradeType == 0">
                        <input style="color:#fff;" placeholder="数量" placeholder-class="plInput" v-model="buyQuantity"/>
                        <view class="rightText">{{ currencyTradeName }}</view>
                    </view>
                    <view class="quantityDiv" v-if="tradeType == 1">
                        <input style="color:#fff;" placeholder="数量" placeholder-class="plInput" v-model="sellQuantity" />
                        <view class="rightText">{{ currencyTradeName }}</view>
                    </view>
                    <view class="myUsing">
                        <view class="usingLeft">可用</view>
                        <view class="usingRight" v-if="tradeType == 0">{{ currencyQuantity | number(4) }} {{ currencyName }}</view>
                        <view class="usingRight" v-if="tradeType == 1">{{ currencyTradeQuantity | number(4) }} {{ currencyTradeName }}</view>
                    </view>
                    <view class="buyRate" v-if="tradeType == 0">
                        <view @click="buyChangeRate(25)" :class="{ buyClass: buyRate == 25 && tradeType == 0, sellClass: buyRate == 25 && tradeType == 1 }">25%</view>
                        <view @click="buyChangeRate(50)" :class="{ buyClass: buyRate == 50 && tradeType == 0, sellClass: buyRate == 50 && tradeType == 1 }">50%</view>
                        <view @click="buyChangeRate(75)" :class="{ buyClass: buyRate == 75 && tradeType == 0, sellClass: buyRate == 75 && tradeType == 1 }">75%</view>
                        <view @click="buyChangeRate(100)" :class="{ buyClass: buyRate == 100 && tradeType == 0, sellClass: buyRate == 100 && tradeType == 1 }">100%</view>
                    </view>

                    <view class="buyRate" v-if="tradeType == 1">
                        <view @click="buyChangeRate2(25)" :class="{ buyClass: buyRate2 == 25 && tradeType == 0, sellClass: buyRate2 == 25 && tradeType == 1 }">25%</view>
                        <view @click="buyChangeRate2(50)" :class="{ buyClass: buyRate2 == 50 && tradeType == 0, sellClass: buyRate2 == 50 && tradeType == 1 }">50%</view>
                        <view @click="buyChangeRate2(75)" :class="{ buyClass: buyRate2 == 75 && tradeType == 0, sellClass: buyRate2 == 75 && tradeType == 1 }">75%</view>
                        <view @click="buyChangeRate2(100)" :class="{ buyClass: buyRate2 == 100 && tradeType == 0, sellClass: buyRate2 == 100 && tradeType == 1 }">100%</view>
                    </view>

                    <view class="myUsing">
                        <view class="usingLeft">交易额</view>
                        <view class="usingRight" v-if="tradeType == 0">{{ currencyQuantity | number(4) }} {{ currencyName }}</view>
                        <view class="usingRight" v-if="tradeType == 1">{{ currencyTradeQuantity | number(4) }} {{ currencyTradeName }}</view>
                    </view>
                   <!-- <view class="myUsing">
                        <view class="usingLeft">交易额</view>
                        <view class="usingRight" v-if="tradeType == 0">{{ buytotal | number(4) }}</view>
                        <view class="usingRight" v-if="tradeType == 1">{{ selltotal | number(4) }}</view>
                    </view> -->

                    <view v-if="tradeType == 0 && isToken" class="buyButSub" @click="buy">买入DCM</view>
                    <view v-if="tradeType == 1 && isToken" class="buyButSub sellBut" @click="sell">卖出DCM</view>

                    <view v-if="tradeType == 0 && !isToken" class="buyButSub" @click="$tools.path('../login/login')">买入DCM</view>
                    <view v-if="tradeType == 1 && !isToken" class="buyButSub sellBut" @click="$tools.path('../login/login')">卖出DCM</view>
                </view>
                <view class="centerRight">
                    <view class="butTab">
                        <view>价格</view>
                        <view>数量</view>
                    </view>
                    <scroll-view scroll-y :scroll-top="scrollTop">
                        <view class="sellList">
                            <view class="buyItem" v-for="(item, index) in sellList" :key="index" @click="buyIt(item.price, item.nums)">
                                <view class="bagView" :style="{ width: item.ratio * 100 + '%' }"></view>
                                <view class="price">{{ item.price | number(pricetDigit) }}</view>
                                <view class="number">{{ item.nums | number(numberDigit) }}</view>
                            </view>
                        </view>
                    </scroll-view>
                    <view class="newPrice">
                        {{ currentPrice }}
                        <text>≈ 175.21{{ (currentPrice * usdtPrice) | number(2) }} CNY</text>
                    </view>
                    <scroll-view scroll-y="true" class="buyList">
                        <view class="buyItem" v-for="(item, index) in buyList" :key="index" @click="buyIt(item.price, item.nums)">
                            <view class="bagView" :style="{ width: item.ratio * 100 + '%' }"></view>
                            <view class="price">{{ item.price | number(pricetDigit) }}</view>
                            <view class="number">{{ item.nums | number(numberDigit) }}</view>
                        </view>
                    </scroll-view>
                    <view class="shenduBox">
                        <view class="shendu">深度 4</view>
                        <image src="../../static/images/down.png"></image>
                    </view>
                </view>
            </view>
       </view>
       <!-- 交易订单 -->
       <view class="tradeList">
           <view class="listTab">
               <view class="leftText">当前委托</view>
               <view class="rightAll">全部</view>
           </view>
           <view class="listWap">
               <view v-if="myTrdeList.length > 0" class="listItem" v-for="(item, index) in myTrdeList" :key="index">
                   <view class="itemTop">
                       <view class="topLeft">
                           <view class="topKuai" :class="{ sellClass: item.tradeTypeStr == '卖' }">{{ item.tradeTypeStr }}</view>
                           <view class="nameKuai">
                               <view class="biNmae">
                                   {{ item.tradeCurrencyName }}
                                   <text>/{{ item.currencyName }}</text>
                               </view>
                               <view class="biTime">{{ item.createTime | formatTime('YMDHMS') }}</view>
                           </view>
                       </view>
                       <view class="topRight" @click="cancelTrade(item.id)">撤单</view>
                   </view>
                   <view class="itemBot">
                       <view class="colDiv">
                           <view class="colname" style="text-align: left;">价格({{ item.currencyName }})</view>
                           <view class="colVal" style="text-align: left;">{{ item.price }}</view>
                       </view>
                       <view class="colDiv">
                           <view class="colname">数量({{ item.tradeCurrencyName }})</view>
                           <view class="colVal">{{ item.quantity }}</view>
                       </view>
                       <view class="colDiv">
                           <view class="colname" style="text-align: right;">实际成交量({{ item.tradeCurrencyName }})</view>
                           <view class="colVal" style="text-align: right;">{{ item.tradeQuantity }}</view>
                       </view>
                   </view>
               </view>
               <noData v-if="myTrdeList.length == 0"></noData>
           </view>
       </view>
       <!-- 币种交易对 -->
       <uni-drawer :visible="show" mode="left">
           <view class="popLeft">
               <view class="popTitle">
                   <view class="popStu"></view>
                   <view class="popNameDiv">
                       <u-tabs active-color="red" inactive-color="#fff" bg-color="#333"
                           :list="areaList" :is-scroll="true" :current="current" @change="changePop"></u-tabs>
                   </view>
                   <view class="seach">
                       <image src="../../static/images/down.png"></image>
                       <input v-model="searchName" placeholder="搜索" placeholder-class="plSearch" />
                   </view>
               </view>
               <view class="popList">
                   <view class="popItemList" v-for="(item, index) in tradeList" :key="index" v-show="item.tradeCurrencyName.indexOf(searchName.toUpperCase()) > -1"
                       @click="bbtrade(item.tradeId, item.usings)">
                       <view class="biNameP">
                           {{ item.tradeCurrencyName }}
                           <text>/{{ item.currencyName }}</text>
                       </view>
                       <view class="priceP">{{ item.currentPrice }}</view>
                       <view class="rateP" v-if="item.rise >= 0">+{{ item.rise }}%</view>
                       <view class="rateP red" v-else>{{ item.rise }}%</view>
                   </view>
               </view>
           </view>
       </uni-drawer>
      </view>
    </view>
</template>

<script>
// import URLSET from '@/components/url.js';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
export default {
	components: {
		uniDrawer
	},
	data() {
		return {
			itemStyle: {
				background: 'rgba(83,215,143,0.1)'
			},
			// list: [
			// 	{
			// 		name: '币币交易'
			// 	},
			// 	{
			// 		name: '法币交易'
			// 	}
			// ],
			buyRate: null,
			buyRate2: null,
			tradeType: 0,
			show: false,
			isClose: false,
			current: 0,

			buyPrice: '', //买的价格
			sellPrice: '', //卖的价格
			buyQuantity: '', //卖的数量
			sellQuantity: '', //卖的数量

			buytotal: 0,
			selltotal: 0,

			user_timer: '', //ws用户信息定时器

			areaList: [], //区域列表
			curAreaId: [], //区域id
			tabBig: 0, //自选10
			tradeList: [
                {tradeCurrencyName:'abc',tradeId:0,usings:'abc',currencyName:'USDT',currentPrice:30,rise:0.1},
                 {tradeCurrencyName:'abc',tradeId:0,usings:'abc',currencyName:'USDT',currentPrice:30,rise:0.1},
                  {tradeCurrencyName:'abc',tradeId:0,usings:'abc',currencyName:'USDT',currentPrice:30,rise:0.1},
                   {tradeCurrencyName:'abc',tradeId:0,usings:'abc',currencyName:'USDT',currentPrice:30,rise:0.1},
                    {tradeCurrencyName:'abc',tradeId:0,usings:'abc',currencyName:'USDT',currentPrice:30,rise:0.1},
            ], //交易对list
			searchName: '', //搜索的名字
			tradeId: 5, //交易对id
			currencyName: 'USTD', //基准币种
			currencyTradeName: '', //交易币种
			rise: 0, //头部涨跌
			usdtPrice: '', //usdt价格
			currentPrice: 12.000, //最新价格
			currencyQuantity: 42.45, //基本币种余额
			currencyTradeQuantity: 0, //交易币种余额
			buyList: [
                {price:132,nums:3,ratio:0.1},
                {price:122,nums:15,ratio:0.3},
                {price:156,nums:43,ratio:0.43},
                {price:182,nums:11,ratio:0.56},
                {price:112,nums:78,ratio:0.78},
                {price:144,nums:12,ratio:0.98},
            ], //买list
			sellList: [
                {price:132,nums:6,ratio:0.98},
                {price:122,nums:14,ratio:0.78},
                {price:156,nums:33,ratio:0.56},
                {price:182,nums:56,ratio:0.43},
                {price:112,nums:76,ratio:0.32},
                {price:144,nums:16,ratio:0.12},
            ], //卖list

			pricetDigit: 2,
			numberDigit: 2,

			submitType: '',
			submitPrice: '',
			submitQuantity: '',
			tradePassword: '',
			xjIndex: 1, //1限价2市价
			check_timer: '',
			myColse: false,
			myTrdeList: [
                {tradeTypeStr:'买',tradeCurrencyName:'DCM',currencyName:'USDT',createTime:'2020:10:05',quantity:20,tradeQuantity:30,price:1.00},
                {tradeTypeStr:'卖',tradeCurrencyName:'DCM',currencyName:'USDT',createTime:'2020:10:05',quantity:20,tradeQuantity:15,price:1.00},
            ],
			isCollect: false,
			buyPriceOne: '',
			sellPriceOne: '',
			isToken: true,

			payType: 0,
			gooleCode: '',
			code: '',

			isSend: false,
			time: 60,
			remain: '发送验证码',
			timer: null,
			isYz: true,

			isPws: true, //控制登录密码
			scrollTop: 10000, //scroll-view的滚动值
			downScro: 1 //卖盘滚动条下
		};
	},
	watch: {
	},
	onLoad() {},
	computed: {
	},
	onShow() {
	},
	onHide() {
	},
	onUnload() {
	},
	methods: {
		changeTrade(index) {
			this.tradeType = index;
		},
        sell(){
           uni.showToast({
               title:'开发中，敬请期待',
           })
        },
        buy(){
           uni.showToast({
               title:'开发中，敬请期待',
           }) 
        },
        kLine(){
            uni.showToast({
                title:'开发中，敬请期待',
            }) 
        },
        showLeft(){
            this.show=true;
        }
    }
		
};
</script>

<style lang="less" scoped>
        .page {
            // padding: 0 40rpx;
            background: #0D0D1A;
            height: 100%;
            position: absolute;
        }
        
        .tradePage {
            width: 100%;
            // padding: 0 30rpx;
            padding-top: 45rpx;
            background: #12152D;
            .tradeBox {
                padding: 0 30rpx;
            }
            .topName {
                display: flex;
                justify-content: space-between;

                .nameLeft {
                    display: flex;
                    align-items: center;
                    .leftImage {
                        width: 26rpx;
                        height: 21rpx;
                    }
                    .biName {
                        font-size: 36rpx;
                        font-weight: 500;
                        color: #C9EEF2;

                        font-family: 'DINEBold';
                        margin-right: 10rpx;
                    }

                    image {
                        width: 26rpx;
                        height: 26rpx;
                        margin-right: 19rpx;
                    }

                    .nameRate {
                        width: 104rpx;
                        height: 36rpx;
                        background: rgba(81, 216, 141, 1);
                        border-radius: 14rpx;

                        font-size: 20rpx;
                        font-family: 'DINEBold';
                        font-weight: 500;
                        color: #fff;
                        text-align: center;
                        line-height: 36rpx;
                    }

                    .nameRateRed {
                        background: #B83636;
                    }
                }

                .kLine {
                    width: 46rpx;
                    height: 46rpx;
                }
                .tradeImg {
                    width: 23rpx;
                    height: 32rpx;
                }
            }

            .tradeCenter {
                display: flex;
                width: 100%;
                margin-top: 39rpx;

                .centerLeft {
                    flex: 1;
                    margin-right: 16rpx;

                    .changeTrade {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;

                        .buyTrade {
                            width: 177rpx;
                            border-top: 61rpx solid #152128;
                            border-right: 20rpx solid transparent;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;

                            view {
                                border-radius: 2rpx;
                                width: 100%;
                                height: 66rpx;
                                position: absolute;
                                top: -66rpx;
                                left: 0;
                                text-align: center;
                                line-height: 66rpx;
                                font-size: 32rpx;
                                font-weight: bold;
                                color: #fff;
                            }
                        }

                        .buyClass {
                            border-top: 61rpx solid #31B3DA !important;
                        }

                        .sellTrade {
                            width: 177rpx;
                            border-bottom: 66rpx solid #152128 !important;
                            border-left: 20rpx solid transparent !important;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;

                            view {
                                border-radius: 2rpx;
                                width: 100%;
                                height: 66rpx;
                                position: absolute;
                                top: 0rpx;
                                left: 0;
                                text-align: center;
                                line-height: 66rpx;
                                font-size: 32rpx;
                                font-weight: bold;
                                color: rgba(254, 254, 254, 1);
                            }
                        }

                        .sellClass {
                            border-bottom: 66rpx solid #B83636 !important;
                        }
                    }

                    .wapSelType {
                        width: 330rpx;
                        height: 80rpx;
                        border: 2rpx solid grey;
                        border-radius: 10rpx;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 20rpx 0 33rpx;
                        margin-top: 33rpx;

                        view {
                            font-size: 30rpx;
                            font-weight: 500;
                            color: #333;
                        }

                        image {
                            width: 26rpx;
                            height: 26rpx;
                        }
                    }

                    .priceDiv {
                        height: 80rpx;
                        border-radius: 10rpx;
                        display: flex;
                        margin-top: 40rpx;
                        display: flex;
                        align-items: center;
                        background-color: #000000;

                        .jian {
                            width: 80rpx;
                            height: 100%;
                            border-right: 2rpx solid grey;
                            border-radius: 10rpx 0rpx 0rpx 10rpx;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 40rpx;
                            font-weight: 500;
                            color: #fff;
                        }

                        input {
                            flex: 1;
                            padding-left: 30rpx;
                            // text-align: center;
                        }

                        .plInput {
                            font-size: 30rpx;
                            font-weight: 500;
                            color: #31B3DA;
                        }

                        .plInput2 {
                            color: #31B3DA !important;
                        }

                        .add {
                            width: 80rpx;
                            height: 100%;
                            border-left: 2rpx solid #333;
                            border-radius: 0rpx 10rpx 10rpx 0rpx;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 40rpx;
                            font-weight: 500;
                            color:  #fff;

                        }
                    }

                    .zhCny {
                        font-size: 24rpx;
                        font-family: 'DINEBold';
                        font-weight: 500;
                        color:  #31B3DA;
                        margin-top: 16rpx;
                    }

                    .quantityDiv {
                        width: 330rpx;
                        height: 80rpx;
                        border-radius: 10rpx;
                        display: flex;
                        margin-top: 48rpx;
                        display: flex;
                        align-items: center;
                        padding-left: 30rpx;
                        padding-right: 30rpx;
                        background-color: #000000;

                        .plInput {
                            font-size: 30rpx;
                            font-weight: 500;
                            color:  #31B3DA;
                        }
                        .rightText {
                            font-size: 30rpx;
                            font-family: 'DINEBold';
                            font-weight: 400;
                            color: grey;
                        }
                    }

                    .buyRate {
                        width: 328rpx;
                        height: 54rpx;
                        border-radius: 6rpx;
                        display: flex;
                        margin-top: 52rpx;
                        align-items: center;
                        justify-content: space-between;

                        view {
                            flex: 1;
                            height: 100%;
                            // width: 25%;
                            text-align: center;
                            line-height: 54rpx;
                            font-size: 20rpx;
                            color: #fff;
                            font-weight: 500;
                            // display: flex;
                            // align-items: center;
                            // justify-content: center;
                            border: 2rpx solid #31B3DA;
                            border-radius: 8rpx;
                        }

                        .buyClass {
                            border: 2rpx solid green;
                            font-weight: bold;
                            color:  green;
                        }
                        .uni-input-input {
                            color: #333 !important;
                        }

                        .sellClass {
                            border: 2rpx solid rgba(220, 67, 109, 1);
                            color: rgba(220, 67, 109, 1);
                            font-weight: bold;
                        }
                    }

                    .myUsing {
                        display: flex;
                        justify-content: space-between;
                        padding-right: 15rpx;
                        width: 100%;
                        margin-top: 22rpx;

                        .usingLeft {
                            font-size: 28rpx;

                            font-weight: 500;
                            color:#31B3DA;
                        }

                        .usingRight {
                            font-size: 28rpx;
                            font-family: 'DINEBold';
                            font-weight: 500;
                            color: #31B3DA;
                        }
                    }

                    .buyButSub {
                        margin-top: 48rpx;
                        // width: 330rpx;
                        height: 80rpx;
                        background: #31B3DA;
                        border-radius: 10rpx;
                        text-align: center;
                        line-height: 80rpx;
                        font-size: 34rpx;
                        font-weight: bold;
                        color: rgba(254, 254, 255, 1);
                    }

                    .sellBut {
                        background: #B83636;
                    }
                }

                .centerRight {
                    flex: 1;

                    .butTab {
                        display: flex;
                        font-size: 24rpx;
                        font-weight: 500;
                        color:#31B3DA;
                        height: 40rpx;
                        align-items: center;
                        justify-content: space-between;
                        padding-right: 15rpx;
                    }

                    .buyList {
                        height: 250rpx;
                        // overflow-y: auto;

                        .buyItem {
                            display: flex;
                            justify-content: space-between;
                            padding-right: 15rpx;
                            height: 60rpx;
                            align-items: center;
                            position: relative;

                            .bagView {
                                position: absolute;
                                right: 0;
                                top: 0;
                                height: 60rpx;
                                background: rgba(81, 216, 141, 0.09);
                            }

                            .number {
                                font-size: 24rpx;
                                font-weight: 500;
                                color: #fff;
                                font-family: 'DINEBold';
                            }

                            .price {
                                font-size: 24rpx;
                                font-family: 'DINEBold';
                                font-weight: 400;
                                color: rgba(3, 213, 144, 1);
                            }
                        }
                    }

                    .newPrice {
                        font-size: 40rpx;
                        font-family: 'DINEBold';
                        font-weight: 500;
                        color: #B83636;
                        height: 69rpx;
                        line-height: 69rpx;
                        margin: 6rpx 0;
                        text {
                            font-size: 24rpx;
                            font-weight: 400;
                            color: #31B3DA;
                            margin-left: 15rpx;
                        }
                    }

                    .sellList {
                        height: 250rpx;
                        //overflow-y: auto;

                        .buyItem {
                            display: flex;
                            justify-content: space-between;
                            padding-right: 15rpx;
                            height: 60rpx;
                            align-items: center;
                            position: relative;

                            .bagView {
                                position: absolute;
                                right: 0;
                                top: 0;
                                height: 60rpx;
                                background: rgba(219, 73, 87, 0.1);
                            }

                            .number {
                                font-size: 24rpx;
                                font-weight: 500;
                                color:#C9EEF2;
                                font-family: 'DINEBold';
                            }

                            .price {
                                font-size: 24rpx;
                                font-family: 'DINEBold';
                                font-weight: 400;
                                color: #f75d5a;
                            }
                        }
                    }
                    .shenduBox {
                        width:294rpx;
                        height: 54rpx;
                        border: 2rpx solid #31B3DA;
                        border-radius: 8rpx;
                        line-height: 54rpx;
                        margin-top: 31rpx;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .shendu {
                            color: #31B3DA;
                            font-size: 24rpx;
                            margin-left: 14rpx;
                        }
                        image {
                            width: 18rpx;
                            height: 9rpx;
                            margin-right: 14rpx;
                        }
                    }
                }
              
            }
        }

        .tradeList {
            width: 100%;
            //height: 1000rpx;
            background: #0D0D1A;
            margin-top: 30rpx;

            .listTab {
                display: flex;
                justify-content: space-between;
                height: 100rpx;
                align-items: center;
                padding: 0 30rpx;
                border-bottom: 2rpx solid #31B3DA;

                .leftText {
                    font-size: 32rpx;
                    font-weight: bold;
                    color: #C9EEF2;
                }
                .rightAll {
                    font-size: 24rpx;
                    font-weight: bold;
                    color: #C9EEF2;
                }

                .rightImg {
                    image {
                        width: 46rpx;
                        height: 46rpx;
                    }
                }
            }

            .listWap {
                width: 750rpx;
                //height:247rpx;
                //background:rgba(255,255,255,0.05);

                .listItem {
                    padding: 0 30rpx;
                    border-bottom: 2rpx solid #31B3DA;
                    padding-bottom: 40rpx;

                    .itemTop {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-top: 30rpx;

                        .topLeft {
                            display: flex;
                            align-items: center;

                            .topKuai {
                                width: 60rpx;
                                height: 60rpx;
                                background:#152128;
                                border-radius: 6rpx;
                                text-align: center;
                                line-height: 60rpx;
                                font-size: 28rpx;
                                font-weight: bold;
                                color: #fff;
                            }

                            .sellClass {
                                background: #B83636;
                            }

                            .nameKuai {
                                margin-left: 17rpx;

                                .biNmae {
                                    font-size: 30rpx;
                                    font-weight: bold;
                                    color: #C9EEF2;
                                    font-family: 'DINEBold';
                                }

                                .biTime {
                                    font-size: 22rpx;
                                    font-weight: 500;
                                    color: #C9EEF2;
                                }
                            }
                        }

                        .topRight {
                            width: 100rpx;
                            height: 50rpx;
                            border: 2rpx solid #506E86;
                            border-radius: 10rpx;
                            text-align: center;
                            line-height: 50rpx;
                            font-size: 28rpx;
                            font-weight: 500;
                            color: #506E86;
                        }
                    }

                    .itemBot {
                        display: flex;
                        margin-top: 40rpx;

                        .colDiv {
                            flex: 1;

                            .colname {
                                text-align: center;
                                font-size: 24rpx;
                                font-weight: 500;
                                color: #31B3DA;
                            }

                            .colVal {
                                text-align: center;
                                margin-top: 15rpx;
                                font-size: 24rpx;
                                font-weight: 500;
                                color:#C9EEF2;
                            }
                        }
                    }
                }
            }
        }

    /deep/.u-drawer-left {
        background-color: var(--bg1A);
        border-radius: 0px 20rpx 20rpx 0px;
    }

    .popLeft {
        width: 600rpx;
        background: rgba(50, 54, 57, 1);
        border-radius: 0px 20rpx 20rpx 0px;

        .popTitle {
            .popStu {
                height: var(--status-bar-height);
            }

            .seach {
                display: flex;

                align-items: center;
                padding: 25rpx 0;
                padding-left: 30rpx;
                border-bottom: 2rpx solid var(--bg14);
                background-color: var(--bg1A);

                image {
                    width: 36rpx;
                    height: 36rpx;
                    margin-right: 18rpx;
                }

                input {
                    flex: 1;
                }

                .plSearch {
                    font-size: 32rpx;
                    color: #fff;
                }
            }
        }

        .popList {
            .popItemList {
                display: flex;
                padding: 0 30rpx;
                height: 100rpx;
                align-items: center;
                border-bottom: 2rpx solid var(--bg14);
                background-color: var(--bg1A);

                .biNameP {
                    flex: 1;
                    font-size: 32rpx;
                    font-family: 'DINEBold';
                    font-weight: 500;
                    color:var(--color-main3);

                    text {
                        color: #a2a2a2;
                        font-size: 26rpx;
                    }
                }

                .priceP {
                    flex: 1;
                    font-size: 28rpx;
                    font-family: 'DINEBold';
                    font-weight: 500;
                    color: var(--color-main3);
                }

                .rateP {
                    flex: 1;
                    font-size: 28rpx;
                    font-family: 'DINEBold';
                    font-weight: 400;
                    color: rgba(81, 216, 141, 1);
                    text-align: right;
                }

                .red {
                    color: #fc6668;
                }
            }
        }
    }

    .popBot {
        width: 750rpx;
        // height:767rpx;
        background: var(--bg-popBot);
        border-radius: 20rpx 20rpx 0px 0px;
        padding-bottom: 150rpx;

        .popTitle {
            width: 100%;
            height: 100rpx;
            padding: 0 30rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2rpx solid rgba(255, 255, 255, 0.05);

            .leftText {
                font-size: 32rpx;
                font-weight: 500;
                color:var(--color-main3);
            }

            .rightText {
                font-size: 30rpx;
                font-weight: 500;
                color: var(--color-theme);
            }
        }

        .selCol {
            width: 100%;
            height: 100rpx;
            padding: 0 30rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 2rpx solid rgba(255, 255, 255, 0.05);
            color: var(--color-grey);
        }

        .selXjText {
            color: var(--color-theme);
        }

        .wapInput {
            padding: 0 30rpx;
            margin-top: 30rpx;

            .kuangDiv {
                padding: 30rpx 0;
                border-bottom:var(--bor-botm);
                display: flex;

                .code {
                    color: rgb(83,215,143);
                }
            }

            input {
                flex: 1;
                color:#fff;
            }
        }

        .butSub {
            width: 690rpx;
            height: 90rpx;
            background: var(--bg-theme);
            border: 2upx solid #fff;
            border-radius: 45rpx;
            margin: 50rpx auto;
            font-size: 34rpx;
            font-weight: bold;
            color: #fff;
            text-align: center;
            line-height: 90rpx;
        }
    }

    .popBot2 {
        width: 600rpx;
        min-height: 352rpx;
        background: var(--bg-popBot);
        border-radius: 20rpx;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        position: relative;

        .nox1 {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .bot1 {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: var(--color-white-light);
            }

            .bot2 {
                font-size: 32rpx;
                font-family: DINPro;
                font-weight: 500;
                color:var(--color-white-light);
                margin-top: 55rpx;
                margin-bottom: 80rpx;
            }

            .bot3 {
                width: 300rpx;
                height: 88rpx;
                line-height: 88rpx;
                text-align: center;
                background: var(--bg-theme);
                border-radius: 44rpx;
                font-size: 34rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #fff;
            }
        }

        .cha {
            position: absolute;
            right: 35rpx;
            top: 35rpx;
            width: 40rpx;
            height: 40rpx;
        }

        .nox2 {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 30rpx;

            .sT1 {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: var(--color-white-light);
            }

            .sT2 {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: var(--color-white-light);
                margin-top: 18rpx;
                margin-bottom: 30rpx;
            }

            input {
                height: 80rpx;
                // line-height: 100rpx;
                // padding: 30rpx;
                border-bottom: 2rpx solid rgba(255, 255, 255, 0.05);
            }

            .sBtnView {
                display: flex;
                justify-content: center;
                margin-top: 50rpx;

                .sBtn1 {
                    width: 250rpx;
                    height: 88rpx;
                    line-height: 88rpx;
                    text-align: center;
                    border: 2rpx solid rgba(255, 255, 255, 0.4);
                    border-radius: 44rpx;
                    font-size: 34rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 0.5);
                }

                .sBtn2 {
                    width: 250rpx;
                    height: 88rpx;
                    line-height: 88rpx;
                    text-align: center;
                    background: rgb(83,215,143);
                    border-radius: 44rpx;
                    font-size: 34rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #fff;
                }

                .mar36 {
                    margin-left: 36rpx;
                }
            }
        }

        .nox3 {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 30rpx;

            .TT1 {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #fff;
            }

            .TT2 {
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #fff;
                margin-top: 52rpx;
                margin-bottom: 30rpx;
            }

            .sBtnView {
                display: flex;
                justify-content: center;
                margin-top: 50rpx;

                .sBtn1 {
                    width: 250rpx;
                    height: 88rpx;
                    line-height: 88rpx;
                    text-align: center;
                    border: 2rpx solid rgba(255, 255, 255, 0.4);
                    border-radius: 44rpx;
                    font-size: 34rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 0.5);
                }

                .sBtn2 {
                    width: 250rpx;
                    height: 88rpx;
                    line-height: 88rpx;
                    text-align: center;
                    background: rgb(83,215,143);
                    border-radius: 44rpx;
                    font-size: 34rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #fff;
                }

                .mar36 {
                    margin-left: 36rpx;
                }
            }
        }
    }
</style>
