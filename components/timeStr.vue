<template>
	<text>{{timeStr}}</text>
</template>

<script>
	export default {
		props: {
			format: {
				type: String,
				default: 'yyyy-MM-dd HH:mm:ss'
			},
			value: {
				type: [String, Number],
				default: '',
			}
		},
		data() {
			return {
				timeStr: '',
			}
		},
		beforeMount(){
			const date = new Date(this.value?this.value * 1000:new Date().getTime());
			this.__format(date);
		},
		methods: {
			__format(date) {
				const year = date.getFullYear();
				const month = date.getMonth() * 1 + 1;
				const day = date.getDate();
				const hour = date.getHours();
				const minute = date.getMinutes();
				const second = date.getSeconds();
				let zeroize = (val) => {
					if (val < 10) {
						return '0' + val;
					} else {
						return val;
					}
				}
				let timeStr = this.format;
            	timeStr = timeStr
                .replace(/yyyy/, year)
                .replace(/MM/, zeroize(month))
                .replace(/dd/, zeroize(day))
                .replace(/HH/, zeroize(hour))
                .replace(/mm/, zeroize(minute))
                .replace(/ss/, zeroize(second));
				this.timeStr = timeStr
				
			}
		},
		watch: {
			value(newval, oldval) {
				const date = new Date(newval * 1000);
				this.__format(date);
			}
		},
		computed: {

		}
	}
</script>
<style scoped lang="stylus">
</style>

<!-- 
demo
<time-str :value="1111111111" :format="'HH:mm:ss'"></time-str>
 -->
