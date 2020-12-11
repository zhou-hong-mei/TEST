<template>
	<view class="wapDta">
		<image src="../static/images/nodata.png"></image>
		<view class="text">{{i18n.text421}}</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		computed: {
		  i18n () {  
		    return this.$t('message')  
		  }  
		},
	}
</script>

<style lang="less" scoped>
	.wapDta{
		height: calc(100vh - var(--status-bar-height) - 92rpx);
		padding-top: 30rpx;
		image{
			width: 350rpx;
			height: 236rpx;
			display: block;
			margin: 0rpx auto 30rpx;
		}
		.text{
			font-size:26rpx;
			font-weight:500;
			color:rgba(102,102,102,1);
			text-align: center;
		}
	}
</style>
