<template>
	<view class="page">
       <view class="head">
          <view class="backImg" @click="back">
               <image src="../../static/images/back.png"></image>
           </view>
           <view class="title">
               <text>重置安全密码</text>
           </view>
       </view>
       <view class="content">
           <view class="logo">
               <image src="../../static/images/logo.png"></image>
           </view>
           <view class="infoBox">
            <view class="boxInput">
             <view class="infoDetail">
             	<input v-model="tel" placeholder="请输入手机号码" placeholder-class="plClass" disabled="true"/>
             </view>
             </view>
           <view class="boxInput">
             <view class="infoDetail">
             	<input v-model="code" @blur="getCode" placeholder="请输入短信验证码验证账户" placeholder-class="plClass" @focus="telfocus('code')"/>
                <view class="sendCode" @click="sendCode">{{codeTip}}</view>
             </view>
             <view class="error" v-if="codeTips==1">
                 <text>验证码不能为空！</text>
             </view>
            </view>
           <view class="boxInput">
             <view class="infoDetail">
             	<input v-model="pass" @focus="telfocus('pass')" @blur="getPass" placeholder="请输入安全密码 8-20位字母和数字组合" type="password" maxlength="20" v-if="isPws"  placeholder-class="plClass"/>
                <input v-model="pass" type="text" maxlength="20" placeholder-class="plClass"/>
                <view class="rightEye"  v-if="isPws"  @click="isPws=false">
                	<image src="../../static/images/eye.png"></image>
                </view>
                <view class="rightEye" v-else @click="isPws=true">
                    <image src="../../static/images/eyeOpen.png"></image>
                </view>
             </view>
             <view class="error" v-if="errorTips==1">
                 <text>密码为8-20位，必须由字母和数字组和！</text>
             </view>
             <view class="error" v-if="passTips==1">
                 <text>密码不能为空！</text>
             </view>
            </view>
            <view class="boxInput">
              <view class="infoDetail">
              	<input v-model="repass" @focus="telfocus('repass')" @blur="getRepass" type="password" maxlength="20" v-if="isPws2" placeholder="请再次重复输入安全密码" placeholder-class="plClass"/>
                 <input v-model="repass" type="text" maxlength="20"  placeholder-class="plClass"/>
                 <view class="rightEye" v-if="isPws2" @click="isPws2=false">
                 	<image src="../../static/images/eye.png"></image>
                 </view>
                 <view class="rightEye" v-else @click="isPws2=true">
                     <image src="../../static/images/eyeOpen.png"></image>
                 </view>
              </view>
              <view class="error" v-if="errorTips==2">
                  <text>两次密码不一致！</text>
              </view>
              <view class="error" v-if="repassTips==1">
                  <text>重新输入密码不能为空！</text>
              </view>
            </view>
           </view>
           <view class="bottomBtn" @click="resetPass">
               <view class="btn">下一步</view>
           </view>
       </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel:'',
                code:'',
                pass:'',
                repass:'',
                isPws:true,
                isPws2:true,
                errorTips:0,
                passTips:0,
                codeTips:0,
                repassTips:0,
                isSend:false,
                codeTip:'获取验证码',
                time:60,
                timer:null,
                
			}
		},
		onLoad() {

		},
		methods: {
            back:function(){
                uni.navigateBack();
            },
            getCode:function(){
                if(this.code != null) {
                    this.$set(this,'codeTips',0);
                }
            },
            sendCode:function(){
               if(this.isSend == false){
                   this.isSend == true;
                   this.codeTip = this.time +'s后重新发送';
                   this.timer = setInterval(() => {
                       this.time--;
                       this.codeTip = this.time+'s后重新发送';
                       if(this.time == 0){
                           this.codeTip = '重新获取';
                           clearInterval(this.timer);
                           this.isSend == false;
                           this.time = 60;
                       }s
                   },1000)
               }
            },
            getPass:function(e){
                var newPass = this.pass;
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
                if(newPass != ''){
					this.$set(this,"passTips",0);
					if(!reg.test(newPass) || newPass.length<8 || newPass.length>20 ){
					    this.$set(this,"errorTips",1);
						return false;
					}
					this.$set(this,"errorTips",0);
					return true;
				}
				this.$set(this,"passTips",1);
				return false;
            },
            getRepass:function(e){
               if(this.pass != this.repass){
                    this.$set(this,"repassTips",0);
                    this.$set(this,"errorTips",2);
					return false;
               }
               this.$set(this,"errorTips",0);
               return true;
            },
			telfocus:function(value){
				if(value === 'tel'){
					this.$set(this,"telTips",0);
					this.$set(this,"errorTips",0);
				}
				if(value === 'code'){
					this.$set(this,"codeTips",0);
					this.$set(this,"errorTips",0);
				}
				if(value === 'pass'){
					this.$set(this,"passTips",0);
					this.$set(this,"errorTips",0);
				}
				if(value === 'repass'){
					this.$set(this,"repassTips",0);
					this.$set(this,"errorTips",0);
				}
			},
            resetPass:function(){
				//!this.getCode()未添加到这里判断
				if(!this.getPass()||!this.getRepass()){
				    return false;
				}
            }
		}
	}
</script>

<style scoped lang="scss">
	.page {
        width: 100%;
        height: 100%;
      
	}
    .head {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100rpx;
        background-color: #12152D;
        padding: 30rpx 30rpx 0rpx 30rpx;
    }
    .backImg {
       display: flex;
       justify-content: left;
       align-items: center;
       position: absolute;
       left: 30rpx;
       top: 0;
       width: 50rpx;
       height: 110rpx;
       
       image {
       	width: 50rpx;
       	height: 38rpx;
       	margin: 0 auto;
       }
        
    }
    .title {
        font-size: 36rpx;
        color: #C9EEF2;
        text-align: center;
        font-family: PingFang-SC-Bold;
        margin: 0 auto;
    }
    .content {
          width: 100%;
          height: 1200rpx;
          background-image: url(../../static/images/bg.png);
    }
    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 250rpx;
        height: 190rpx;
        margin: 0 auto;
        
        image {
            width: 240rpx;
            height: 120rpx;
        }
    }
    .infoBox {
        padding: 0 60rpx;
    }
    .boxInput {
          margin-bottom: 80rpx;
    }
    .infoDetail {
        min-height: 70rpx;
        width: 100%;
        border-bottom:2rpx solid #37C5F0;
        display: flex;
        
        input{
        	flex: 1;
        	padding-left: 10rpx;
        	font-size:32rpx;
        	font-weight:bold;
        	color:#C9EEF2;
        }
        .plClass {
            color: #5E9BD6;
            font-size: 28rpx;
            font-family: PingFang-SC-Regular;
        }
        .sendCode {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            font-size: 32rpx;
            font-family: PingFang-SC-Bold;
            color: #C9EEF2;
            margin-bottom: 20rpx;
        }
        .rightEye {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32rpx;
            height: 50rpx;
            margin: 0 auto;
            
            image {
                width: 32rpx;
                height: 28rpx;
            }
        }
    }
    .error {
        text {
            color: red;
            font-size: 14rpx;
        }
        
    }
    .bottomBtn {
        padding: 0 60rpx;
        
        .btn {
            width:100%;
            height: 84rpx;
            border-radius: 42rpx;
            background-color: #2FA9CF;
            color: #FFF;
            font-size: 32rpx;
            font-family: PingFang-SC-Bold;
            text-align: center;
            line-height: 84rpx;
            margin: 140rpx auto 0;
        }
       
    }
</style>
