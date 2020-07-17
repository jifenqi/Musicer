<template>
    <div>
        <div>
            <div class='my_header'>
                <i class="return" @click='showMy'></i>
                <div>个人部分</div>
            </div>
            <div class="myInfo">
                <div class="myPic"><img v-lazy="" alt=""></div>
                <div class="myCon">
                    <div class="myName">俺们村</div>
                </div>
            </div>
            <div class="mySongCon">
                <dl class='mylove'>
                    <dt @click='songPlay'><span><i class="right"></i></span>我喜欢的歌</dt>
                    <dd>
                        <music-list :search_list='loveList'></music-list>
                    </dd>
                </dl>
                <dl class='historysong'>
                    <dt @click='songPlay'><span><i class="right"></i></span>历史歌曲</dt>
                    <dd>
                        <music-list :search_list='historySong'></music-list>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
import musicList from '@/base/musicList'

export default {
	components:{
		musicList
	},
    methods:{
		showMy(){
			this.$parent.show = false;
		},
		songPlay(e){
			e.target.classList.toggle('on')
		}
	},
	computed:{
		loveList(){
			let arr = localStorage['songLike'] && JSON.parse(localStorage['songLike'])||[]
			return arr.filter(item=>item!='') || []
		},
		historySong(){
			let arr = sessionStorage['historySong'] && JSON.parse(sessionStorage['historySong'])||[]
			return arr.filter(item=>item!='')||[]
		}
	}
}
</script>
<style scoped>

.mysong .my_header{
	width: 100%;
	height: 50px;
	display: flex;
	align-items:center;
	padding:0 10px;
	background: #ea2000;
}
.mysong .my_header i{
	font-size:5vw;
	margin-right:10px;
}
.mysong .myInfo{
	width: 100%;
	height: 120px;
	padding:10px;
	display: flex;
	justify-content: center;
	align-items:center;
}
.mysong .myInfo>div{
	padding:10px;
}
.mysong .myInfo .myPic{
	width: 80px;
	height: 80px;
	border-radius:50%;
	overflow: hidden;
}
.mysong .myInfo .myPic>img{
	width: 100%;
	height: 100%;
	border-radius:50%;
}
.mysong .myInfo .myCon{
	height: 100%;
	font-size:20px;
	display: flex;
	flex-direction: column;
	align-items:center;
	justify-content: center;
}
.mysong .mySongCon{
	width: 100%;
}
.mysong .mySongCon dl{
	padding-bottom:10px;
}
.mysong .mySongCon dl dt{
	background:#cccccc3b;
	padding:0 10px;
	transition:all 0.6s;
}
.mysong .mySongCon dl dt.on{
	background:#ea2000;
}
.mysong .mySongCon dl dt i{
	font-size:12px;
}
.mysong .mySongCon dl dt span{
	display: inline-block;
	transition:all 0.6s;
	margin-right:5px;
}
.mysong .mySongCon dl dt.on span{
	transform:rotate(90deg);
}
.mysong .mySongCon dl dd{
	background:white;
	padding:0 10px;
	height: 0px;
	overflow:hidden;
	transition:all 0.6s;
}
.mysong .mySongCon dl dt.on+dd{
	height: calc(100vh - 232px);
	overflow-y:auto;
}
</style>