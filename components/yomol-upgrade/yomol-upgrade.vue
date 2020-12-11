<template>
    <view class="upgrade-box">
        <image class="upgrade-img" src="@/static/images/upApp.png" mode="widthFix"></image>
        <view class="upgrade-main clear">
            <view class="upTitle">
                {{i18n.update}}（{{getVerNo||version}}）
            </view>
            <scroll-view scroll-y="true" class="updateInfo">
                {{UpdateInfo}}
            </scroll-view>
            <view class="butuP" v-if="!downloading" @tap="onSureClick()">
                {{i18n.update1}}
            </view>
            <view class="butuP" v-else>
                {{i18n.fw_323}}: {{progress}}%
            </view>
        </view>
    </view>
</template>

<script>
    // import cmdProgress from './cmd-progress.vue';
    import Version from '@/components/url.js';
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
                default () {
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
            visible(newval) {

            },
        },
        onShow() {
            if (this.dtask) {
                this.dtask.resume();
            }

        },
        mounted() {
            // #ifdef APP-PLUS
            let appUpdateInfo = uni.getStorageSync('appUpdateInfo');
            uni.getSystemInfo({
                success: (res) => {
                    if (res.platform == 'ios') {
                        this.version = appUpdateInfo.iosVersion;
                    } else if (res.platform == "android") {
                        this.version = appUpdateInfo.androidVersion;
                    }
                }
            });


            // #endif
            // #ifdef H5
            this.version = Version.version;
            // #endif

            // if(!this.updateInfo){
            //     this.updateInfo = uni.getStorageSync('appUpdateInfo').update_info;
            // }
        },
        computed: {
            i18n() {
                return this.$t('message')
            },
            UpdateInfo() {
                if (!this.updateInfo) {
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
                    title: _this.i18n.update2, // '更新提示',
                    content: ' ',
                    showCancel: !info.ismust,
                    confirmText: _this.i18n.fw_246, //确认
                    cancelText: _this.i18n.fw_224, //取消
                    success: res1 => {

                        if (res1.confirm) {
                            if (plus.os.name === 'iOS') {
                                this.$emit('sureclick');
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
                    // console.log(info.openUrl)
                    this.dtask = plus.downloader.createDownload(info.openUrl, {
                        method: 'GET'
                    }, function(d, status) {
                        if (status == 200) {
                            plus.runtime.install(
                                d.filename, {
                                    force: true
                                },
                                function() {
                                    info.updatStatus = 0;
                                    // uni.showTabBar();
                                    uni.setStorageSync('app_versions', that.version);
                                    uni.setStorageSync('appUpdateInfo', info);
                                    plus.runtime.restart();
                                },
                                function(e) {
                                    plus.runtime.restart();
                                    uni.setStorageSync('appUpdateInfo', '');
                                    // console.log(e,'##########55555555555555555555')
                                    // uni.showModal({
                                    //     content: JSON.stringify(e)||'',
                                    // })
                                }
                            );
                        }
                    });
                    this.dtask.addEventListener('statechanged', function(d, status) {

                        that.progress = ((d.downloadedSize / (d.totalSize || 1)).toFixed(2) * 100) >> 0;
                    });
                    this.dtask.start();
                }
            }
        }
    };
</script>

<style lang="less">
    .upgrade-box {
        width: 548upx;
    }

    .clear::after,
    .clear::before {
        content: '';
        display: table;
        clear: both;
    }

    .upgrade-img {
        width: 548upx;
        margin-bottom: -2upx;
    }

    .upgrade-main {
        background-color: #fff;
        width: 548upx;
        min-height: 526upx;
        border-radius: 0 0 16upx 16upx;
        margin: 0 auto;
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
        // overflow: auto;
        white-space: pre-wrap !important;
        word-wrap: break-word !important;
        *white-space: normal !important;


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
</style>
