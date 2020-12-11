<template>
	<!-- <view v-if="visible" class="mark"> -->
		<!-- <view class="update-view">
			<text class="title">{{ title }}</text>
			<view class="tip">{{ contentsTitle }}</view>
			<scroll-view class="scroll" scroll-y>
				<view class="item" v-for="(item, index) in contents" :key="index">{{ item }}</view>
			</scroll-view>
			<view v-if="!downloading" class="btns">
				<image class="icon" src="https://download.cheshangji.cn/app/upgrade.png"></image>
				<view class="sure" @tap="onSureClick()">{{ clickTitle }}</view>
			</view>
			<cmd-progress v-else class="progress" type="circle" stroke-color="#C40000" :percent="progress"></cmd-progress>
		</view> -->

		
		
		<view class="popWapUpDiv">
			<view class="clear">
                <image class="upImg" src="@/static/images/upApp.png" mode="widthFix"></image>
                <view class="upMine">
                    
                    <view class="upTitle">
                        {{i18n.update}}（{{getVerNo||version}}）
                    </view>
                    <textarea disabled maxlength='-1' v-model="UpdateInfo" class="updateInfo">
                    </textarea>
                    <view class="butuP" v-if="!downloading" @tap="onSureClick()">
                        {{i18n.update1}}
                    </view>
                    <view class="butuP" v-else>
                      {{i18n.fw_323}}:  {{progress}}%
                    </view>
            
                </view>
				<!-- <cmd-progress v-else class="progress" type="circle" stroke-color="#2E74F3" :percent="progress"></cmd-progress> -->
			</view>
		</view>
		
		
	<!-- </view> -->
</template>

<script>
// import cmdProgress from './cmd-progress.vue';
export default {
	components: {
		// cmdProgress
	},
	data() {
		return {
			visible: true,
			progress: 0,
			downloading: false,
			success: true,
			dtask: null,
            version: ''
		};
	},
	props: {
		contents: {
			type: Array,
			default() {
				return [];
			}
		},
		getVerNo: {
			type: String,
			default: ''
		},
		updateInfo: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ' '
		},
		contentsTitle: {
			type: String,
			default: ' '
		},
		content: {
			type: String,
			default: ''
		},
		// clickTitle: {
		// 	type: String,
		// 	default: '更新'
		// }
	},
	watch: {
		content() {
			var strs = this.content.split('\\n');
			for (var i = 0; i < strs.length; i++) {
				this.contents.push(strs[i]);
			}
		},
		visible(newval){

		},
	},
	onShow() {
		if (this.dtask) {
			this.dtask.resume();
		}
        
	},
    mounted() {
        // #ifdef APP-PLUS
        this.version = uni.getStorageSync('appUpdateInfo').versions
        // #endif
        // #ifdef H5
        this.version = 'v0.19'
        // #endif
        
        // if(!this.updateInfo){
        //     this.updateInfo = uni.getStorageSync('appUpdateInfo').update_info;
        // }
    },
    computed: {
        i18n() {
            return this.$t('message')
        },
        UpdateInfo(){
            if(!this.updateInfo){
                return uni.getStorageSync('appUpdateInfo').update_info;
            }
            return this.updateInfo;
        }
    },
	methods: {
		show() {
			setTimeout(() => {
				if (this.success) {
					this.visible = true;
				}
			}, 100);
		},
		hide() {
			setTimeout(() => {
				this.visible = false;
			}, 100);
		},
		onCancelClick() {
			this.hide();
		},

		onSureClick() {
			// this.$emit('sureclick');
			if (this.dtask) {
				this.dtask.resume();
			} else {
				this.updateAppVersion(uni.getStorageSync('appUpdateInfo'));
			}
			
		},
		//第三方更新
		theThirdPartyUpdateApp: function(info) {
			let _this = this;
			uni.showModal({
				//提醒用户更新
				title: _this.i18n.update2,// '更新提示',
				content: ' ',
				showCancel: !info.ismust,
				confirmText: _this.i18n.fw_246,//确认
				cancelText:  _this.i18n.fw_224,//取消
				success: res1 => {
					if (res1.confirm) {
						if (plus.os.name === 'iOS') {
							plus.runtime.openURL(info.openUrlI);
						} else {
							plus.runtime.openURL(info.openUrlA);
						}
					}
				}
			});
		},
		//热更新
		updateAppVersion: function(info) {
            // this.updateInfo = info.update_info;
            // console.log(this.updateInfo,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&++++++++++++++');
			if (info.ismust == true) {
				this.theThirdPartyUpdateApp(info);
			} else if (info.ismust == false) {
				this.downloading = true;
				uni.hideTabBar();
				var that = this;
			
				this.dtask = plus.downloader.createDownload(info.openUrl, { method: 'GET' }, function(d, status) {
					if (status == 200) {
						plus.runtime.install(
							d.filename,
							{
								force: false
							},
							function() {
                                // console.log('热跟新成龙')
								info.updatStatus = 0;
                                // uni.showTabBar();
                                uni.setStorageSync('app_versions', that.version);
								uni.setStorageSync('appUpdateInfo', info);
								plus.runtime.restart();
							},
							function(e) {
								// console.log(e,'##########55555555555555555555')
							}
						);
					}
				});
				this.dtask.addEventListener('statechanged', function(d, status) {
					that.progress = ((d.downloadedSize/d.totalSize).toFixed(2)*100)>>0;
				});
				this.dtask.start();
			}
		}
	}
};
</script>

<style lang="less" >
    .clear::after,.clear::before{
        content: '';
        display: table;
        clear: both;
    }
.mark {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	z-index: 9999999999;
}

.update-view {
	width: 620upx;
	height: auto;
	min-height: 640upx;
	/* height: 80vw; */
	background-color: white;
	border-radius: 15upx;
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	padding-bottom: 30upx;
}
.update-view-bg{
	position: absolute;
	width: 100%;
	z-index: 1;
	top: 0;
	left: 0;
	right: 0;
}
.update-view-content{
	position: relative;
	z-index: 10;
	width: 100%;
	padding-top: 280upx;
}
.title {
	width: 100%;
	margin-top: 20upx;
	color: #353535;
	font-weight: bold;
	font-size: 34upx;
	text-align: center;
}

.tip {
	width: 100%;
	text-align: center;
	margin-top: 10upx;
	align-self: flex-start;
	font-size: 32upx;
	font-weight: 600;
	color: #8E99A0;
}

.scroll {
	width: 100%;
	max-height: 300upx;
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	align-items: flex-start;
	text-align: center;
	color: #8E99A0;
}

.item {
	overflow: hidden;
	/* margin-left: 50upx;
	text-align: left; */
	font-size: 30upx;
}

.btns {
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	width: 460upx;
	height: 80upx;
	border-radius: 40upx;
	background-image: linear-gradient(#17a2ff,#5566fc) ;
	font-size: 30upx;
	color: #fff;
	margin: 60upx auto 0;
}

.icon {
	width: 45upx;
	height: 45upx;
	margin-right: 10upx;
}

.sure {
	padding: 10upx 0;
	text-align: center;
	color: #c40000;
	font-size: 30upx;
	font-weight: 500;
}

.progress {
	display: block;
	display: flex;
	justify-content: center;
	margin:20upx auto 0upx;
}















.popWapUpDiv {
		width: 650upx;
		//height: 648upx;
		position: relative;
        top: 0;
		.upImg {
			margin: 0 auto;
			display: block;
			width: 548upx;
			height: 208upx;
			// margin-bottom: -150upx;
            // display: none;
            // position: absolute;
            // top: -245upx;
            // left: 0;
		}

		.upMine {
			// background-color: #323639;
            // background-color: #fff;
			width: 548upx;
			min-height: 526upx;
			border-radius: 0 0 16upx 16upx;
            margin: 0 auto;
			// padding: 120upx 40upx 135upx 40upx;
            // margin-top: 168upx;
            // padding-bottom: 138upx;
            position: relative;
		}

		.upTitle {
			font-size: 34upx;
            line-height: 48upx;
			color: #313131;
			font-weight: bold;
            margin: 44upx auto;
            text-align: center;
		}

		.updateInfo {
			width: 100%;
			margin-top: 20upx;
			color: #313131;
			font-size: 26upx;
            padding-left: 58upx;
            padding-right: 58upx;
            
			line-height: 40upx;
            max-height: 210upx;

		}

		.butuP {
			width: 388upx;
			height: 78upx;
			border-radius: 59upx;
			background-color: #10B697;
			position: absolute;
			bottom: 50upx;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			line-height: 85upx;
			font-size: 28upx;
			font-weight: bold;
			color: #ffffff;
            

		}
	}

</style>
