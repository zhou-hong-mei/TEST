<template>
    <view class="tabbar-box">
        <scroll-view id="scrollBox" scroll-x="true" :scroll-left='scollx' scroll-with-animation="true" class="tabbar-item"
            @scroll="scrollChange">
            <view class="tabbar-contaner">
                <view :id="'tab'+index" class="menu-cell" v-for="(item,index) in list" :key="item.id">
                    <slot v-bind:item = 'item'>
                        <text>{{item.name}}</text>
                    </slot>
                </view>
            </view>
            <view class="progress-box" :style="progressStyle"></view>
        </scroll-view>
    </view>
</template>

<script>
    /**
     * tabbar 滑动导航
     * @description 
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {Array} list  传入数组
     * @example <tabbar :lsit="list"></tabbar>
     */
    let change_rate, move_type;
    export default {
        name: 'tabbar',
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            },

        },
        data() {
            return {
                movex: 0,
                scollx: 0,
                timer: null,
                move_type: null,
            };
        },
        created() {

        },
        watch: {
            // movex(newval,oldval){

            // },
            // scollx(newval,oldval){

            // }
        },
        computed: {

            // 进度条样式
            progressStyle() {
                return ``
            }
        },
        mounted() {},
        methods: {
            // 移动进度条
            movableChange(event) {
                // console.log(event,'888888888888888');
                return 
                if (this.move_type && this.move_type != 'movable') {
                    return;
                }
                this.move_type = 'movable';
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.move_type = null;
                }, 600)
                // this.movex = event.detail.x;
                if (!change_rate) {
                    let top = 0;
                    let len = this._list.length;
                    const query = uni.createSelectorQuery().in(this);
                    query.select('#scrollBox').boundingClientRect(data => {
                        // console.log("得到布局位置信息" + JSON.stringify(data));
                        // console.log("节点离页面顶部的距离为" + data.top);
                        // top = data.top;
                        let scrollWidth = data.width * len;
                        change_rate = uni.upx2px(120) / scrollWidth;
                    }).exec();
                    // console.log(top,'99dd9d9d9d9d9d9d9')
                    // scrollWidth
                    // change_rate= uni.upx2px(120)/;
                }

                this.$nextTick(() => {
                    this.scollx = event.detail.x / change_rate;
                })
            },

            scrollChange(event) {
                // console.log(event);
                if (this.move_type && this.move_type != 'scroll') {
                    return;
                }
                this.move_type = 'scroll';
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.move_type = null;
                }, 600)
                let scollx = event.detail.scrollLeft;
                if (!change_rate) {
                    change_rate = uni.upx2px(120) / event.detail.scrollWidth;
                }
                // console.log(change_rate,'&&&&&&&&&&&&&&&&&&&')
                this.$nextTick(() => {
                    this.movex = scollx * change_rate;
                })
            }
        }
    }
</script>

<style scoped>
.tabbar-box{
    /* #ifndef APP-NVUE */
    width: 100%;
    height: 100upx;
    /* #endif */
    
}
.tabbar-item{
    /* #ifndef APP-NVUE */
        width: 100%;
    /* #endif */
}
.menu-cell{
   /* #ifndef APP-NVUE */
   display: inline-flex;
   height: 100%;
   max-width: 25%;
   /* #endif */ 
   flex-grow: 1;
   padding-left: 20upx;
   padding-right: 20upx;
}
.progress-box{
    /* #ifndef APP-NVUE */
    
    /* #endif */
}
</style>
