<template>
    <div>
        <div class="player_container">
                <div class="player_exterior" ref='wrapper'>
                    <div class="exterior_img">
                        <div :class="['exterior_cd', this.$parent.songstate?'playing':'']">
                            <div :class="['song_img', this.$parent.songstate?'rotate':'']">
                                <img v-lazy="song.picUrl" alt="">
                            </div>
                        </div>
                        <div class="song_txt" ref='musicDoc'>
							<div ref='musicdocs'>
								<p 
								ref='p'
								v-for='(item,index) in lyric' 
								:key='index'
								:class="curIndex==index?'over':''"
								>
									<span>{{item.content}}</span>
									<span>{{item.tr}}</span>
								</p>
							</div>
                        </div>
                    </div>
                    <div class="song_operator">
                        <span :class="like?'hot_like':'song_like'" @click='songLike'></span>
                        <span class="song_down" @click='songDown'></span>
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
		   playing:true,
		   songlike:[]
        }
    },
	watch:{
		currentTime(){
			this.getIndex()
			if(!this.playing){
				this.musicdoc.stop()
			}else{
				this.init()
			}
		},
		song(){
			this.curIndex=0;
		}
	},
	created(){
		this.songLike()
	},
	mounted(){
		this.scroll = new BScroll(this.$refs.wrapper,{
			scrollX:true,
			click:true,
			snap: {  // 滑动切换的一些配置
				speed: 800,  // 滑动切换的速度
				easing: {  // 滑动切换的动画效果
					style: 'ease'
				},
				threshold: 0.2,  // 滑动切换到超过一半时切换到下一屏
				stepX: this.$refs.wrapper.offsetWidth,  // 横向切换距离为轮播图宽度
			}
		})
		this.musicdoc = new BScroll(this.$refs.musicDoc,{
			scrollY:true,
			tap:true
		}),
		this.musicdoc.on('scrollStart',()=>{
			clearTimeout(this.timer)
			this.playing = false;
		})
		this.musicdoc.on('touchEnd',(attr)=>{
			clearTimeout(this.timer)
			this.timer = setTimeout(()=>{
				this.playing = true;
			},2000)
			attr.y< -this.height && this.musicdoc.refresh()
			attr.y>0 && this.musicdoc.refresh()
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
				if(item.time == parseInt(this.currentTime)){
					this.curIndex = index;
				}
			})
		},
		songLike(){
			this.songlike = localStorage['songLike'] && JSON.parse(localStorage['songLike']) || []
			let id = this.song.id
			let res =  this.songlike.some(item=>{
				return item.id === id
			})
			if(res){
				let xb = 0;
				this.songlike.find((item,index)=>{
					if(item.id === id){
						xb = index
					}
				})
				this.songlike.splice(xb,1);
			}else{
				this.songlike.push(this.song);
			}
			localStorage['songLike'] = JSON.stringify(this.songlike)
		},
		songDown(){
			fetch(this.song.url).then(res => res.blob()).then(blob => {
				const a = document.createElement('a');
				document.body.appendChild(a)
				a.style.display = 'none'
				const url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = `${this.song.name}.mp3`;
				a.click();
				document.body.removeChild(a)
				window.URL.revokeObjectURL(url);
			});

		}
	},
	computed:{
		lyric(){
			return this.song.lyric
		},
		song(){
			return this.$store.state.song
		},
		height(){
			return this.$refs.musicdocs.offsetHeight - this.$refs.musicDoc.offsetHeight;
		},
		like(){
			return this.songlike.some(item=>{
				return item.id === this.song.id
			})
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
	padding-top:14vh;
	overflow:hidden;
}
.player_exterior .exterior_cd::after{
	height: 131px;
	content:"";
	position: absolute;
	top: 0;
	left: 50%;
	width: 75px;
	background:url('./needle-ip6.png') no-repeat;
	background-size:75px 131px;
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
	width: 6px;
	height: 6px;
	transform:translate(20%,-50%);
	background:#e5e5e5;
	border:6px solid white;
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
	width: 165px;
	height: 165px;
	margin:0 auto;
    position: relative;
    transition:all 9s;
}
.exterior_img .song_img img{
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
	width: 112px;
	height: 112px;
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
	padding:5px 0;
	color:#ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align:center;
}
.exterior_img .song_txt p span:nth-child(1){
	font-size:14px
}
.exterior_img .song_txt p span:nth-child(2){
	font-size:12px;
}
.exterior_img .song_txt p.over{
	color:white;
}
.hot_like{
	animation: scale 0.6s ease 
}
@keyframes scale {
	0%{
		transform:scale(1)
	}
	50%{
		transform:scale(1.2)
	}
	100%{
		transform:scale(1)
	}
}
</style>