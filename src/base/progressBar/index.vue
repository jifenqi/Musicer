<template>
  <div>
    <div ref="progress" @click='toProgress'>
      <span
        ref="btn"
        class="progress_botton"
        @touchstart.prevent="touchstart"
        @touchmove.prevent="touchmove"
        @touchend="touchend"
      ></span>
      <span ref="bg" class="progress_read"></span>
    </div>
  </div>
</template>
<script>
const progressBtnWidth = 4
export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch:{
        percent(newVal){
            if(newVal>0 && !this.touch.initiated){
                const barWidth = this.$refs.progress.clientWidth - progressBtnWidth
                const offsetWidth = newVal * barWidth
                this._offset(offsetWidth)
            }
        }
    },
    created(){
        this.touch = {}
    },
    methods:{
        toProgress(e){
            const rect = this.$refs.progress.getBoundingClientRect()
            const offsetWidth = e.pageX - rect.left
            this._offset(offsetWidth)
            this._triggerPercent()
        },
        touchstart(e){
            this.touch.initiated = true
            this.touch.startX = e.touches[0].pageX
            // 当前移动的位置
            this.touch.left = this.$refs.bg.clientWidth
        },
        touchmove(e){
            if (!this.touch.initiated) return
            const deltaX = e.touches[0].pageX - this.touch.startX
            const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.$refs.progress.clientWidth - progressBtnWidth)

            this._offset(offsetWidth)
        },
        touchend(e){
            this.touch.initiated = false
            this._triggerPercent()
        },
        _offset(offsetWidth) {
            this.$refs.bg.style.width = `${offsetWidth}px`
            // 按钮偏移
            this.$refs.btn.style['transform'] = `translate3d(${offsetWidth}px, -50%, 0)`
        },
        _triggerPercent() {
            const barWidth = this.$refs.progress.clientWidth - progressBtnWidth
            const percent = this.$refs.bg.clientWidth / barWidth
            this.$emit('percentChange', percent)
        }
    }
};
</script>
<style scoped>
.progress_body .progress_botton{
	position: absolute;
	top: 50%;
	left: 0px;
	transform:translate(-50%,-50%);
	width: 4px;
	height: 4px;
	background:white;
	border-radius:50%;
}
.progress_body .progress_botton::after{
	content:"";
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
	width: 100%;
	height: 100%;
	border-radius:50%;
	border:3px solid #da3a31;
}
.progress_body .progress_read{
	display: block;
	height: 2px;
	width: 0px;
	background:#da3a31;
}
</style>