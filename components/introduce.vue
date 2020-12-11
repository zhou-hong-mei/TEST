<template>
    <view class="introduce">
        <view class="m-b-30">
            <p>{{i18n.fw_338}}</p><!--DeFi是Decentralized Finance（去中心化金融）的缩写。它通过构建开放式金融系统的去中心化协议，让世界上任何一个人都可以随时随地进行金融活动。-->
            <p>{{i18n.fw_339}}</p><!--基于在金融活动中承担的角色不同，Defi分为很多赛道，主要为：-->
        </view>
        <ul v-if="show">
            <li class="m-b-30">
                <span class="title"><span class="block"></span>{{i18n.fw_340}}<!--去中心化借贷--></span>
                <p class="describe">{{i18n.fw_341}}<!-- 通过去中心化借贷协议，为用户提供资产借出和借入服务。存在闲置资产的用户可以通过借出资产获得收益，有资产借入需求的用户，可以不需要认证，借入资产，进行其他金融活动。 --></p>
            </li>
            <li class="m-b-30">
                <span class="title"><span class="block"></span>{{i18n.fw_342}}<!-- 预言机 --></span>
                <p class="describe">{{i18n.fw_343}}<!-- 为去中心化借贷，提供基准价格。参与去中心化借贷的用户可以基于预言机的价格，进行借出或借入，避免借贷价格偏离市场正常价格，产生亏损。 --></p>
            </li>
            <li class="m-b-30">
                <span class="title"><span class="block"></span>{{i18n.fw_344}}<!-- 去中心化交易所 -->（DEX）</span>
                <p class="describe">{{i18n.fw_345}}<!-- 一种不需要注册即可交易的交易所，相比中心化交易所，去中心化交易所交易匿名性更强。但流动性层面弱于中心化交易所。 --></p>
            </li>
        </ul>
        <!-- 点击收起 -->
        <view class="button" @click="showCont()">
            <text>{{show?i18n.fw_336:i18n.fw_337}}</text>
            <text :class="['drop',show&&'active']"></text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "introduce",
        data() {
            return {
                show: false
            }
        },
        computed: {
            i18n() {
                return this.$t('message')
            }
        },
        methods: {
            showCont: function() {
                this.show = !this.show;
            }
        }
    }
</script>

<style scoped>
    .introduce {
        margin: 50rpx 0;
        font-size: 28rpx;
        color: #fff;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .m-b-30 {
        margin-bottom: 30rpx;
    }

    .title {
        font-size: 28rpx;
        font-weight: bold;
    }

    .block {
        width: 10rpx;
        height: 10rpx;
        display: block;
        /* background-color: #f00; */
        background-color: #02CBA5;
        float: left;
        margin-top: 14rpx;
        margin-right: 20rpx;
        border-radius: 50%;
    }

    .describe {
        margin-top: 8rpx;
        lien-height: 24rpx;
        opacity: 0.7;
        font-size: 24rpx;
        font-weight: normal;
    }

    .button {
        /* width: 120rpx; */
        margin: 0 auto;
        color: #02CBA5;
        text-align: center;
        font-size: 24upx;
        line-height: 33upx;
    }

    .drop {
        display: inline-block;
        width: 16upx;
        height: 18upx;
        border-bottom: 9upx solid transparent;
        border-top: 9upx solid transparent;
        border-left: 8upx solid transparent;
        border-right: 8upx solid transparent;
        border-top-color: #02CBA5;
        border-bottom-color: transparent;
        margin-top: 8upx;
        margin-left: 10upx;
        vertical-align: middle;

    }

    .drop.active {
        border-bottom-color: #02CBA5;
        border-top-color: transparent;
        margin-top: -12upx;
    }
</style>
