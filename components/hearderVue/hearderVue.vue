<template>
	<view class="BBB">
		<view class="headerWap" :style="{background:hedBag}">
			<view class="status"></view>
			<view class="headeMine">
				<view @click="goBack" class="leftImg">
					<image src="/static/images/backW.png"></image>
				</view>
				<view class="titleCt">
					<slot name="title"></slot>
				</view>
				<view class="titleRt">
					<slot name="rightText"></slot>
				</view>
				<view class="imageRt">
					<slot name="imageRight"></slot>
				</view>
			</view>
		</view>
		<!-- <view class="blockBox"></view> -->
	</view>
</template>

<script>
	export default {
		props:{
			hedBag:{
				type: String,
				default: '#12152d'
			},
			backType:{
				type: Number,
				default: 0,//0默认返回 ，1自定以返回路径，2sw返回
			},
			backUrl:{
				type: String,//路径
			},
			
		},
		data() {
			return {
              hedBagSon:this.hedBag,
			  backTypeSon:this.backType,
			  backUrlSon:this.backUrl,
			};
		},
		methods: {
			goBack() {
				if(this.backTypeSon==0){
					// this.$tools.back(1);
                    uni.navigateBack()
				}else if(this.backTypeSon==1){
					// this.$tools.path(this.backUrlSon)
                    uni.navigateTo({
                        url: this.backUrlSon
                    })
				}else{
					uni.switchTab({
						url:this.backUrl
					})
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.blockBox{
		height:calc(92rpx + var(--status-bar-height));
	}
	.headerWap {
		width: 100%;
		background:#12152d;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		.status {
			width: 100%;
			height: var(--status-bar-height);
		}

		.headeMine {
			width: 100%;
			height: 92upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30upx;
			line-height: 92upx;
			position: relative;
			//border:2rpx solid rgba(255,255,255,0.2);

			.leftImg {
				height: 100%;
				// width: 36upx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 0;
				top: 0;
				width: 80rpx;
				height: 92upx;
                

				image {
					width: 38rpx;
					height: 38rpx;
					margin: 0 auto;
				}
			}

			.titleCt {
				width: 100%;
				font-size: 36upx;
				text-align: center;
				//margin-left: 62rpx;
				font-weight: 600;
                letter-spacing: 2upx;
				color: #C9EEF2;
			}

			.titleRt {
				color: #828186;
				font-size: 30upx;
				display: flex;
				justify-content: right;
				align-items: center;
				position: absolute;
				right: 30upx;
				top: 0;
			}
			.imageRt{
				height: 100%;
				color: #FFFFFF;
				font-size: 30upx;
				display: flex;
				justify-content: right;
				align-items: center;
				position: absolute;
				right: 30rpx;
				top: 0;
			}
		}
	}
</style>
