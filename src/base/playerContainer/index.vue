<template>
    <div>
        <div class="player_container">
                <div class="player_exterior" ref='wrapper'>
                    <div class="exterior_img">
                        <div :class="['exterior_cd', this.$parent.songstate?'playing':'']">
                            <div :class="['song_img', this.$parent.songstate?'rotate':'']">
                                <img :src="song.picUrl" alt="">
                            </div>
                        </div>
                        <div class="song_txt" ref='musicDoc'>
							<div>
								<p 
								ref='p'
								v-for='(item,index) in lyric' 
								:key='index'
								:class="curIndex==index?'over':''"
								>{{item.content}}</p>
							</div>
                        </div>
                    </div>
                    <div class="song_operator">
                        <span class="song_like"></span>
                        <span class="song_down"></span>
                        <span class="song_message"></span>
                        <span class="more"></span>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
    props:['currentTime','songDuration'],
    data(){
        return{
		   scroll:null,
		   musicdoc:null,
		   curIndex:0,
		   playing:true
        }
    },
	watch:{
		song(newsong,oldsong){
			if(!newsong.songId)return
			if(newsong === oldsong)return
		},
		currentTime(){
			this.getIndex()
			this.musicdoc.on('scrollStart',()=>{
				clearTimeout(this.timer)
				this.playing = false;
			})
			this.musicdoc.on('touchEnd',()=>{
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.playing = true;
				},2000)
			})
			if(!this.playing){
				this.musicdoc.stop()
			}else{
				this.init()
			}
		}
	},
	mounted(){
		let width = this.$refs.wrapper.offsetWidth
		this.scroll = new BScroll(this.$refs.wrapper,{
			scrollX:true,
			snap: {  // 滑动切换的一些配置
				speed: 800,  // 滑动切换的速度
				easing: {  // 滑动切换的动画效果
					style: 'ease'
				},
				threshold: 0.2,  // 滑动切换到超过一半时切换到下一屏
				stepX: width,  // 横向切换距离为轮播图宽度
			}
		})
		this.musicdoc = new BScroll(this.$refs.musicDoc,{
			scrollY:true,
			tap:true
		})
		
	},
	methods:{

		init(){			
			if(this.curIndex>6){
				this.musicdoc.scrollToElement(this.$refs.p[this.curIndex-5], 1000)  
			}else{
				this.musicdoc.scrollToElement(this.$refs.p[0],0, 1000)   
			}
			if(this.currentTime == this.songDuration){
				this.musicdoc.scrollToElement(this.$refs.p[0],0, 1000) 
				this.curIndex = 0;
			}
		},
		getIndex(){
			this.song.lyric.forEach((item,index)=>{
				let arr = item.time.split(':')
				let time = parseInt(arr[0])*60 + parseInt(arr[1])
				if(time == parseInt(this.currentTime)){
					this.curIndex = index;
				}
			})
		}
	},
	computed:{
		lyric(){
			if(!this.song.lyric)return
			return this.song.lyric
		},
		song(){
			return this.$store.state.song
		}
	}
}
</script>
<style scoped>
.player_container{
    width: 100%;
    height: 100%;
}
.player_exterior{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction:column;
}
.player_exterior .exterior_cd{
	height: 100%;
	position: relative;
	padding-top:21.5vw;
	overflow:hidden;
}
.player_exterior .exterior_cd::after{
	height: 35vw;
	content:"";
	position: absolute;
	top: 0;
	left: 50%;
	width: 20vw;
	background:url('./needle-ip6.png') no-repeat;
	background-size:20vw 35vw;
	transform-origin:2.6vw 0;
	transform:rotate(-15deg);
	transition:all 0.3s;
}
.player_exterior .playing::after{
	transform:rotate(5deg);
}
.player_exterior .exterior_cd::before{
	content:"";
	position: absolute;
	top: 0;
	left: 50%;
	width: 1.6vw;
	height: 1.6vw;
	transform:translate(20%,-50%);
	background:#e5e5e5;
	border:1.6vw solid white;
	border-radius:50%;
	z-index:6;
}
.player_exterior .exterior_img{
	flex:1;
	display: flex;
	flex-direction:row;
	width: 200%;
	overflow-x:auto;
	height: 100%;
}
.exterior_img>div{
	width: 50%;
}
.exterior_img .song_img{
	width: 50vw;
	height: 50vw;
	margin:0 auto;
    position: relative;
    transition:all 9s;
}
.exterior_img .song_img img{
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
	width: 30vw;
	height: 30vw;
	border-radius:50%;
}
.exterior_img .song_img::after{
	content:"";
	position: absolute;
	width: 100%;
	height: 100%;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
	border-radius:50%;
	background:url("./disc-ip6.png") no-repeat;
	background-size:cover;
}
.player_exterior .song_operator{
	height: 10vw;
	display: flex;
	justify-content: space-around;
	align-items:center;
	padding:0 16vw;
}
.song_operator>span{
	font-size:4.5vw;
}
.exterior_img .song_txt{
	padding:0 10px;
	height: 100%;
	overflow:hidden;
	display: flex;
	flex-direction:column;
}
.exterior_img .song_txt p{
	line-height: 32px;
	font-size:14px;
	color:#ccc;
	text-align: center;
}
.exterior_img .song_txt p.over{
	color:white;
}
</style>