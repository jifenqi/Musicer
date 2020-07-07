<template>
    <div>
        <div class="song_player" :style="{'z-index':this.$store.state.show?999:-999}">
            <img :src="song.picUrl" alt="">
            <div class="song_header">
                <i class="return" @click='goBack()'></i>
                <div class="headertxt">
                    <h6>{{song.songName}}</h6>
                    <p>{{song.athor}}<i>&gt;</i></p>
                </div>
                <span class="song_share"></span>
            </div>
            <player-container class='player_container' :currentTime="currentTime" :songDuration='songDuration' :song="song"></player-container>            
            <div class="song_progress">
                <span class="readingtime">{{formateDate(currentTime)}}</span>
                <progress-bar class="progress_body" :percent='percent' @percentChange='percentChange'></progress-bar>
                <span class="endtime">{{formateDate(songDuration)}}</span>
            </div>
            <div class="player_operator">
                <span :class="model" @click='changeModel'></span>
                <span class="player_prev" @click='prev'></span>
                <span class="player_status" @click='songPause'>
                    <i :class="songstate?'player_move':'player_stop'" ></i>
                </span>
                <span class="player_next" @click="next"></span>
                <span class="player_menu" @click='show=!show'></span>
            </div>
            <audio 
            ref='audio'
            @timeupdate='changeProgress'
            @ended='ended' 
            autoplay
            @playing='playing'
            @pause='pause'
            :src="song.songurl"
            >
            </audio>
        </div>
        <mini-player :progress='progress' v-show="!this.$store.state.show && songList.length"></mini-player>
        <transition name="minilist">
         <min-list class="minilist" v-if='show'></min-list>
        </transition>
    </div>
</template>
<script>
import playerContainer from '@/base/playerContainer'
import miniPlayer from '@/base/miniPlayer'
import minList from '@/base/miniList'
import progressBar from '@/base/progressBar'
let i = 0;
export default {
    name:"songplayer",
    components:{
        playerContainer,
        miniPlayer,
        minList,
        progressBar
    },
    data(){
        return{
            currentTime:'',
            songDuration:"",
            progress:'',
            songstate:false,
            show:false,
            model:'player_model'
        }
    },
    watch:{
        songstate(){
            if(!this.songstate){
                this.$refs.audio.pause()
            }else{
                this.$refs.audio.play()
            }
        },
        song(newVal){
            this.$root.songid = newVal.songId;
        }
    },
    methods:{
        percentChange(data){
            const currentTime = this.songDuration * data
            this.$refs.audio.currentTime = currentTime
        },
        playing(){
            this.songstate=true;
        },
        pause(){
            this.songstate=false;
        },
        ended(){
            this.songstate=false;
            if(this.model==='single'){
                this.$refs.audio.loop = true ;
            }else{
                this.next()
            }
        },
        goBack(res){
            this.$store.commit('showPlayer',false);
        },
        changeProgress(e){
            this.currentTime = e.target.currentTime
            this.songDuration = e.target.duration;
            this.progress = this.percent
        },
        songPause(){
            this.songstate = !this.songstate;
        },
        next(){
            console.log('下一曲')
            this.position(0)
        },
        prev(){
            console.log('上一曲')
            this.position(1)
        },
        changeModel(){
            let arr = ['player_model','single','random']
            i++;
            i = i>=arr.length?0:i;
            this.model = arr[i]
        },
        position(fx){
            console.log(this.model)
            let song = this.song.songId;
            this.songList.forEach((item,index)=>{
                if(item.songId == song){
                    let songid = this.model==='random'?this.random(fx,index).songId:this.order(fx,index).songId;
                    this.$store.dispatch("addSong", songid);
                }
            })
        },
        order(fx,index){
            if(fx == 0){
                return this.songList[index+1] || this.songList[0]
            }
            return this.songList[index-1] || this.songList[this.songList.length-1]
        },
        random(fx,index){
             if(fx == 0){
                return this.songList[Math.floor(Math.random()*(this.songList.length+2-index)+index)] || this.songList[Math.floor(Math.random()*(this.songList.length))] 
            }
            return this.songList[Math.floor(Math.random()*(index))]
        },
        formateDate(date){
            let m = date/60 | 0;
            let s = date%60 | 0;
            m = m<10?"0"+m:m;
            s = s<10?"0"+s:s;
            return m+':'+s
        }

    },
    computed:{
        song(){
            return this.$store.state.song
        },
        songList(){
            return this.$store.state.songList
        },
        percent(){
            return this.currentTime/this.songDuration
        }
    }

}
</script>
<style scoped>
.song_player{
    position: fixed;
    top: 0;
    left: 0;
	width: 100vw;
	height: 100vh;
	padding:0 10px;
	overflow:hidden;
	display: flex;
	flex-direction:column;
	align-items:center;
	background:#161824;
    color:white;
    z-index:999;
}
.song_player>img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:-1;
    opacity: 0.4;
    background-size:cover;
    filter:blur(30px);
}
.song_player>div{
	width: 100%;
}
.song_player .song_header{
	padding-top:10px;
	height: calc(10vw + 10px);
	font-size:3.6vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.song_header .headertxt{
	flex: 1;
	height: 100%;
	padding: 0 3.5vw;
	color:white;
	display: flex;
	flex-direction:column;
    overflow:hidden;
}
.headertxt h6{
	color:white;
	font:4.2vw/6.8vw Arial;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.headertxt p{
	color:white;
	font-size:2.1vw;
	line-height: 3.2vw;
	opacity:0.6;
}
.headertxt p i{
	font-size:1.5vw;
}
.song_header i,.song_header .song_share{
	font-size:5.8vw;
}
.player_container{
	flex:1;
    overflow:hidden
}
.song_progress{
	height: 4vw;
	display: -webkit-flex;
	display: -moz-flex;
	display: -ms-flex;
	display: -o-flex;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.song_progress>span{
	font-size:1.4vw;
}
.song_progress .progress_body{
	flex:1;
	height: 2px;
	margin:0 5px;
	background:#999;
	border-radius:2px;
	position: relative;
}
.player_operator{
	height: 15vw;
	padding:0 16vw;
	display: flex;
	justify-content: space-between;
	align-items:center;
}
.player_operator .player_model,.player_operator .player_prev,.player_operator .player_move,.player_operator .player_next,.player_operator .player_menu,.player_operator .player_stop{
	font-size:7.5vw;
}
.player_operator .player_model{
	font-size:5vw;
}
.player_operator .single,.player_operator .random{
    font-size:6.3vw;
}
.minilist{
    position:fixed;
    bottom:0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index:999;
    padding-top:72%;
}
.minilist-enter-active,.minilist-leave-active{
    transition:0.6s;
}
.minilist-enter, .minilist-leave-to /* .fade-leave-active below version 2.1.8 */ {
    bottom:-100%;
}
</style>