<template>
    <div>
        <div class="mini-player" @click='showplayer'>
            <div class="player_progress"><span :style="{'width':progress*100+'%'}"></span></div>
            <div class="player">
                <div class="song_img">
                    <img :src="song.picUrl" :class="[this.$parent.songstate?'rotate':'']" alt="">
                </div>
                <div class="headertxt">
                    <h6>{{song.songName}}</h6>
                    <p>{{song.athor}}<i>&gt;</i></p>
                </div>
                <span id='btn' :class="this.$parent.songstate?'player_move':'player_stop'"></span>
                <span id='menu' class='player_menu'></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['progress'],
    methods:{
        showplayer(e){
            if(e.target.id == 'btn'){
                this.$parent.songstate = !this.$parent.songstate;
            }else if(e.target.id == 'menu'){
                this.$parent.show = !this.$parent.show;
            }else{
                this.$store.commit('showPlayer',true)
            }
        }
    },
    computed:{
        song(){
            return this.$store.state.song
        }
    }
}
</script>
<style scoped>
.mini-player{
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background:#fff;
    z-index:999;
}
.mini-player>.player_progress{
    width: 100%;
    height: 2px;
    background:#d2d2d2ba;
}
.mini-player>.player_progress span{
    display: block;
    width: 0px;
    height: 100%;
    background:#d43c33db;
}
.mini-player>.player{
    width: 100%;
    height:calc(100% - 2px);
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 10px;
}
.mini-player .song_img{
    width: 40px;
    height: 40px;
    border-radius:3px;
    margin-right:10px;
    border-radius:50%;
}
.mini-player .song_img img{
    width: 100%;
    height: 100%;
    border-radius:50%
}
.mini-player .headertxt{
    flex:1;
    display:flex;
    flex-direction:column;
    overflow:hidden;
}
.mini-player .headertxt h6{
    color:rgb(0, 0, 0);
    width: 80%;
	font:14px/20px Arial;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.mini-player .headertxt p{
    color:rgb(66, 66, 66);
	font-size:12px;
	line-height:20px;
	opacity:0.6;
}
.mini-player #btn{
    margin-right:10px;
    font-size:24px;
}
.mini-player #menu{
    font-size:24px
}
</style>