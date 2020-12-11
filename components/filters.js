let formatTime = (value, type) => {
	var dataTime="";
	var data = new Date();
	if(value.toString().indexOf('-')>-1){
		value=value.replace(/-/g,'/');
		// console.log(value);
		data=new Date(value);
	}else{
		 data.setTime(value);
	}
	var year   =  data.getFullYear();
	var month_temp=data.getMonth()+1;
	var month  =  month_temp<10?'0'+month_temp: month_temp;
	var day    =  data.getDate()<10?'0'+data.getDate(): data.getDate();
	var hour   =  data.getHours()<10?'0'+data.getHours(): data.getHours();
	var minute =  data.getMinutes()<10?'0'+data.getMinutes(): data.getMinutes();
	var second =  data.getSeconds()<10?'0'+data.getSeconds(): data.getSeconds();
	if(type == "YMD"){
	    dataTime =  year + "-"+ month + "-" + day;
	}else if(type == "YMDHMS"){
	    dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
	}else if(type == "HMS"){
	    dataTime = hour+":" + minute+":" + second;
	}else if(type == "YM"){
	    dataTime = year + "-" + month;
	}else if(type == "DAY"){
	    dataTime = day;
	}else if(type == "Month"){
	    dataTime = month;
	}
	return dataTime;//将格式化后的字符串输出到前端显示
}

let number = (value, type) => {
	let types = typeof(value)
	// if(types == 'string') 
	// 	return value;
	if (value == '--')
		return value;
	if (value == null || value == '') {
		value = 0;
	}
	value = parseFloat(value);
	//console.log(value);
	//处理科学计数法
	value = value.toFixed(8);
	var arr = (value + "").split(".");
	var a1 = arr[0];
	var a2 = 0;
	if (arr.length > 1) {
		a2 = arr[1];
		if (a2.length > type) {
			a2 = a2.substring(0, type);
		}
	}
	value = Number(a1 + "." + a2);
	return Number(value).toFixed(type)
}

let number2 = (value, type) => {
	let types = typeof(value)
	// if(types == 'string') 
	// 	return value;
	if (value == '--')
		return value;
	if (value == null || value == '') {
		value = 0;
	}
	value = parseFloat(value);
	//console.log(value);
	//处理科学计数法
	value = value.toFixed(8);
	var arr = (value + "").split(".");
	var a1 = arr[0];
	var a2 = 0;
	if (arr.length > 1) {
		a2 = arr[1];
		if (a2.length > type) {
			a2 = a2.substring(0, type);
		}
	}
	//console.log(a2);
	value = Number(a1 + "." + a2);
	return Number(value)
}

let numberUp = (num, fix) => {
	// num为原数字，fix是保留的小数位数
	  let result = '0'
	  if (Number(num) && fix > 0) { // 简单的做个判断
	    fix = +fix || 2
	    num = num + ''
	    if (/e/.test(num)) { // 如果是包含e字符的数字直接返回
	      result = num
	    } else if (!/\./.test(num)) { // 如果没有小数点
	      result = num + `.${Array(fix + 1).join('0')}`
	    } else { // 如果有小数点
	      num = num + `${Array(fix + 1).join('0')}`
	      let reg = new RegExp(`-?\\d*\\.\\d{0,${fix}}`)
	      let floorStr = reg.exec(num)[0]
	      if (+floorStr >= +num) {
	        result = floorStr
	      } else {
	        let floorNumber = +floorStr + +`0.${Array(fix).join('0')}1`
	        let point = /\./.test(floorNumber + '') ? '' : '.'
	        let floorStr2 = floorNumber + point + `${Array(fix + 1).join('0')}`
	        result = reg.exec(floorStr2)[0]
	      }
	    }
	  }
	  return result
	
	
	
}

let numberDown = (num, fix) => {
	// num为原数字，fix是保留的小数位数
	  let result = '0'
	  if (Number(num) && fix > 0) { // 简单的做个判断
	    fix = +fix || 2
	    num = num + ''
	    if (/e/.test(num)) { // 如果是包含e字符的数字直接返回
	      result = num
	    } else if (!/\./.test(num)) { // 如果没有小数点
	      result = num + `.${Array(fix + 1).join('0')}`
	    } else { // 如果有小数点
	      num = num + `${Array(fix + 1).join('0')}`
	      let reg = new RegExp(`-?\\d*.\\d{0,${fix}}`)
	      result = reg.exec(num)[0]
	    }
	  }
	  return result
	
	
	
}



let number3 = (value) => {
	if (value == null || value == '') {
		value = 0;
	}

	value = parseFloat(value);

	var m = value.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
	return value.toFixed(Math.max(0, (m[1] || '').length - m[2]));


	// console.log(typeOf(valuet));
	//return value;
}

let numberRu = (value, num) => {//四舍五入
	var a_str = formatnumber(value, num);
	var a_int = parseFloat(a_str);
	if (value.toString().length > a_str.length) {
		var b_str = value.toString().substring(a_str.length, a_str.length + 1)
		var b_int = parseFloat(b_str);
		if (b_int < 5) {
			return a_str
		} else {
			var bonus_str, bonus_int;
			if (num == 0) {
				bonus_int = 1;
			} else {
				bonus_str = "0."
				for (var i = 1; i < num; i++)
					bonus_str += "0";
				bonus_str += "1";
				bonus_int = parseFloat(bonus_str);
			}
			a_str = formatnumber(a_int + bonus_int, num)
		}
	}
	return a_str
}

function formatnumber(value, num) //直接去尾
{
	var a, b, c, i
	a = value.toString();
	b = a.indexOf('.');
	c = a.length;
	if (num == 0) {
		if (b != -1)
			a = a.substring(0, b);
	} else {
		if (b == -1) {
			a = a + ".";
			for (i = 1; i <= num; i++)
				a = a + "0";
		} else {
			a = a.substring(0, b + num + 1);
			for (i = c; i <= b + num; i++)
				a = a + "0";
		}
	}
	return a
}


//隐藏手机号
let conceal = tel => {
	let patrn=/[a-z]/i;
	if(patrn.test(tel)){
		return tel;
	}
	return tel.substring(0, 3) + "****" + tel.substr(tel.length - 2);
}
//隐藏手机号
let concealBef = tel => {
	return tel.substring(0, 3) + "****";
}

let concealTime = tel => {
	return tel.substring(0, 1) + "****" + tel.substr(tel.length - 1);
}
let concealEmail = tel => {
	return tel.substring(0, 1) + "****" + tel.substr(tel.length - 9);
}
let concealAccount = tel => {
	return tel.substring(0, 2) + "****" + tel.substr(tel.length - 9);
}
let realName = tel => {
	return  "**" + tel.substr(tel.length - 1);
}

//隐藏邮箱
let hideEmailInfo = email => {
	if (String(email).indexOf('@') > 0) {
		let newEmail, str = email.split('@'),
			_s = '';

		if (str[0].length > 4) {
			_s = str[0].substr(0, 4);
			for (let i = 0; i < str[0].length - 4; i++) {
				_s += '*';
			}
		} else {
			_s = str[0].substr(0, 1);
			for (let i = 0; i < str[0].length - 1; i++) {
				_s += '*';
			}
		}
		newEmail = _s + '@' + str[1];
		return newEmail;
	} else {
		return email;
	}
};


let rep_str=(value)=>{
    // value = 'aAS';
    return value.substring(0,value.length>3?3:value.length)+ '****'+ value.substring(value.length-1);
}
        
export {
    rep_str
}
export {
	formatTime
}
export {
	number
}
export {
	number2
}
export {
	number3
}
export {
	numberRu 
}
export {
	 numberUp
}
export {
	 numberDown
}
export {
	conceal
}
export {
	concealBef
}
export {
	concealTime
}
export {
	hideEmailInfo
}
export {
	realName
}
export {
	concealEmail
}
export {
	concealAccount
}