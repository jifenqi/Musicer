<template>
    <div>
        <div class="songList">
            <div class="songList_header">
                <img :src="songContent.coverImgUrl" alt="">
                <div class="header_con">
                     <i class="return" @click='goBack'></i>
                    <div class="headertxt">
                        <h6>歌单</h6>
                    </div>
                    <span class="songList_share"></span>
                </div>
                <div class="songList_info">
                    <div class="songList-img" @click='songInfo'>
                        <img :src="songContent.coverImgUrl" alt="">
                        <span>{{playCount(songContent.playCount)}}</span>
                    </div>
                    <div class="songList-txt">
                        <h6>{{songContent.name}}</h6>
                        <p>
                            <img :src="creator.avatarUrl" alt="">
                            <span>{{creator.nickname}}</span>
                            <i>&gt;</i>
                        </p>
                        <div class="songList_tag" @click='songInfo'>
                            <span>{{songContent.description}}</span>
                            <i>&gt;</i>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="songList_list">
                <li v-for="item in songList" :key="item.id" @click="songURL(item.id)">
                    <div class="songs_item">
                        <div class="newsg_title">
                            <div class="songs_name f-thide">{{item.name}}</div>
                            <div class="songs_author f-thide">
                            <i></i>
                            {{item.ar[0].name}} - {{item.al.name}}
                            </div>
                        </div>
                        <div class="songs_play">
                            <span :class="$root.songid === item.id?'player_move':'player_stop'"></span>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if='!songList.length'>
                <loading></loading>
            </div>
        </div>
        <transition name="songInfo">
            <div class="songInfo" v-show='songShow'>
                <img :src="songContent.coverImgUrl" alt="">
                <div class="songInfo-img">
                    <img :src="songContent.coverImgUrl" alt="">
                    <p>{{songContent.name}}</p>
                </div>
                <div class="songInfo-label">
                    <span>标签：</span>
                    <ul v-if='tags.length>0'>
                        <li v-for='(item,index) in tags' :key='index'>
                            {{item}}
                        </li>
                    </ul>
                    <ul v-else>无</ul>
                </div>
                <div class="description">
                    <p v-for="(item,index) in descriptions" :key="index">{{item}}</p>
                </div>
                <i @click='songInfo'></i>
            </div>
        </transition>
    </div>
</template>
<script>
import loading from '@/base/loading'

export default {
    components:{
       loading
    },
    data(){
        return{
            songContent:{},
            creator:{},
            songList:[],
            tags:[],
            description:'',
            songShow:false
        }
    },
    async created(){
        let {data} = await this.$http(`/playlist/detail?id=${this.$route.params.id}`)
        this.songContent = data.playlist
        this.creator = data.playlist.creator
        this.songList = data.playlist.tracks
        this.tags = this.songContent.tags;
        this.description = this.songContent.description;
    },
    methods:{
        goBack(){
            this.$router.push('/recommend')
        },
        songURL(songid) {
            this.$store.commit("showPlayer", true);
            this.$store.dispatch("addSong", songid);
            this.$store.dispatch("songList", {obj:this.songList});
        },
        playCount(val){
            let y =val/(10**9);
            let w = val/(10**4);
            if(y>=1){
                return Math.round(y)+"亿"
            }
            if(w>=1){
                return Math.round(w)+'万'
            }
            return val;
        },
        songInfo(){
            this.songShow=!this.songShow
        }
    },
    computed:{
        descriptions(){
            if(this.description == null){
                return
            }else{
                return this.description.split('\n')
            }
        }
    }
}
</script>
<style scoped>
.songList{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 50px);
    z-index:999;
    background:white;
    color:black;
    overflow-y:auto;
}
.songList .songList_header{
    position: relative;
    height: 50vh;
    overflow:hidden;
}
.songList_header>img{
    position: absolute;
    top: 0;
    left: 0;
    z-index:-1;
    width: 100%;
    filter:blur(40px) brightness(0.5);
}
.songList_header .header_con{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    background:#00000030;
    color:white;
    padding:0 10px;
}
.songList_header .header_con h6{
    color:white;
}
.header_con .return{
    margin-right:10px;
}
.header_con .headertxt{
    flex:1;
    width: 80%;
}
.songList_header .songList_info{
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 10px;
}
.songList_info .songList-img{
    width: 48%;
    position: relative;
}
.songList-img img{
    width: 100%;
}
.songList-img span{
    position: absolute;
    position: absolute;
    right: 5px;
    top: 2px;
    z-index: 3;
    padding-left: 13px;
    color: #fff;
    font-size: 12px;
    background:url('./sdf.svg') 0 center no-repeat;
    background-size: 11px 10px;
}
.songList_info .songList-txt{
    width: 48%;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 70%;
    color:white;
}
.songList-txt h6{
    font:16px/26px Arial;
    color:white;
}
.songList-txt p{
    display: grid;
    grid-template-columns: 1.2fr 3fr 0.1fr;
    align-items: center;
    font-size:14px;
    color:white;
}
.songList-txt p img{
    width: 30px;
    height: 30px;
    border-radius:50%;
}
.songList-txt p span{
    font-size:12px;
}
.songList-txt .songList_tag{
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.songList_tag span{
    width: 90%;
    font-size:12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.songList .songList_list{
    padding:20px 10px;
}
.songs_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.songs_item::after {
  position: absolute;
  z-index: 2;
  content: "";
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  transform-origin: top left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transform: scale(0.5);
}
.songs_item .newsg_title {
  padding: 6px 0;
  width: 80%;
}
.songs_item .newsg_title .songs_name {
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songs_item .newsg_title .songs_author {
  font-size: 12px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songs_item .newsg_title .songs_author i {
  display: inline-block;
  width: 12px;
  height: 8px;
  margin-right: 4px;
  background: url(./index_icon_2x.png) no-repeat;
  background-size: 166px 97px;
}
.songs_item .songs_play {
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.songs_item .songs_play span {
  display: inline-block;
  width: 22px;
  height: 22px;
  font-size: 20px;
  color: #656565;
}
.songs_item .songs_play .player_move{
  color:red;
}
.songInfo{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y:auto;
    z-index:9999;
    background:gray;
}
.songInfo>img{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter:blur(100px);
    z-index:-1;
}
.songInfo .songInfo-img{
    padding-top:80px;
}
.songInfo-img img{
    width: 50%;
    margin:0 auto;
}
.songInfo-img p{
    line-height: 58px;
    font-size:9px;
    color:white;
    text-align: center;
}
.songInfo-label{
    padding:0 10px;
    color:white;
    display: flex;
    flex-direction: row;
}
.songInfo-label span{
    margin-right:10px
}
.songInfo-label ul{
    flex:1
}
.songInfo-label ul li{
    float: left;
    padding:0 5px;
    line-height: 20px;
    margin-right:5px;
    background:#8e8e8e78;
    color:white;
    border-radius:10px;
    text-align: center;
    font-size:12px
}
.songInfo .description{
    margin-top:10px;
    padding:0 10px;
}
.songInfo .description p{
    font:12px/20px Arial;
    color:white;
}
.songInfo>i{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    border-radius:50%;
    background:white;
}
.songInfo>i::before,.songInfo>i::after{
    content:"";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 4px;
    background:black
}
.songInfo>i::before{
    transform:translateY(-50%) rotate(45deg) scale(0.5);
}
.songInfo>i::after{
    transform:translateY(-50%) rotate(-45deg) scale(0.5);
}
.songInfo-enter-active,.songInfo-leave-active{
    transition:0.6s;
}
.songInfo-enter, .songInfo-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>