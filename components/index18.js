import VueI18n from './vue-i18n.js';//需先安装vue-i18n
import Vue from 'vue';

Vue.use(VueI18n);
import messagesEn from './en';

import messagesCn from './cn';



const messages = {
  en: {
    message: messagesEn
  },
  zh: {
    message: messagesCn
  }

}
 
 var langular =uni.getStorageSync('languageRadar') ? uni.getStorageSync('languageRadar') : 'zh';
 // console.log(langular);
 if(langular=='zh'){
	 uni.setStorageSync('languageRadar','zh');
 }
 
 //var langular =  'en';
// console.log(langular)
var i18n = new VueI18n({
  locale: langular,    // 语言标识
  messages
});
Vue.prototype._i18n = i18n;  
export default i18n
