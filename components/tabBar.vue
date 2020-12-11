<template>
	<view class="tab">
		<view class="tabItem active" @tap="abc">
			<view class="icon">
				<image src="../../static/tabbar1.png" mode="aspectFit"></image>
				<image src="../../static/tabbar1_1.png"  mode="aspectFit"></image>
			</view>
			<view class="text">首页</view>
		</view>
		<view class="tabItem" >
			<view class="icon">
				<image src="../../static/tabbar2.png" mode="aspectFit"></image>
				<image src="../../static/tabbar2_1.png"  mode="aspectFit"></image>
			</view>
			<view class="text">资讯</view>
		</view>
		<view class="tabItem">
			<view class="icon">
				<image src="../../static/tabbar3.png" mode="aspectFit"></image>
				<image src="../../static/tabbar3_1.png"  mode="aspectFit"></image>
			</view>
			<view class="text">币币交易</view>
		</view>
		<view class="tabItem">
			<view class="icon">
				<image src="../../static/tabbar4.png" mode="aspectFit"></image>
				<image src="../../static/tabbar4_1.png"  mode="aspectFit"></image>
			</view>
			<view class="text">我的</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2500,
				duration: 1000,
				circular: true,
				msg: [
					'uni-app行业峰会频频亮相，开发者反响热烈',
					'DCloud完成B2轮融资，uni-app震撼发布',
					'36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章,所以呢我们要在这里表示热烈祝贺'
				]
			}
		},
		onLoad() {

		},
		methods: {
		 abc(){
			 this.$emit('abc')
		 }
		},
		
	}
</script>
<style lang="less" scoped>
.tab{
	display: flex;
	width: 100%;
	background: #fff;
	text-align: center;
	box-shadow:0px -2upx 8upx rgba(173,179,204,0.15);
	.tabItem{
		flex:1;
		&.active{
			.icon{
				image{
					&:nth-child(1){
						display: none;
					}
					&:nth-child(2){
						display: block;
					}
					
				}
			}
		}
		display:flex;
	    flex-direction:column;
		align-item:center;
		padding-top:10upx;
		.icon{
			width: 50upx;
			height: 40upx;
			margin:0 auto;
			image{
				width:100%;
				height: 100%;
				&:nth-child(2){
					display: none;
				}
				&:nth-child(1){
					display: block;
				}
			}
			
		}
		.text{
			font-size:24upx;
			padding-top:14upx;
			
		}
	}
}	
</style>