<template>
    <div>
        <div class="songList">
            <div class="header_con">
                <i class="return" @click='goBack'></i>
                <div class="headertxt">
                    <h6>歌单</h6>
                </div>
                <span class="songList_share"><i class='song_share'></i></span>
            </div>
            <div class="songList_header">
                <img :src="creators.coverImgUrl" alt="">
                <div class="songList_info">
                    <div class="songList-img" @click='songInfo'>
                        <img v-lazy="creators.coverImgUrl" alt="">
                        <span>{{playCount(creators.count)}}</span>
                    </div>
                    <div class="songList-txt">
                        <h6>{{creators.name}}</h6>
                        <p>
                            <img v-lazy="creators.creator.avatarUrl" alt="">
                            <span>{{creators.creator.nickname}}</span>
                            <i>&gt;</i>
                        </p>
                        <div class="songList_tag" @click='songInfo'>
                            <span>{{creators.description}}</span>
                            <i>&gt;</i>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="songList_list">
                <music-list :search_list='songList'></music-list>
            </ul>
            <div v-if='!songList.length'>
                <loading></loading>
            </div>
        </div>
        <transition name="songInfo">
            <div class="songInfo" v-show='songShow'>
                <img :src="creators.coverImgUrl" alt="">
                <div class="songInfo-img">
                    <img :src="creators.coverImgUrl" alt="">
                    <p>{{creators.name}}</p>
                </div>
                <div class="songInfo-label">
                    <span>标签：</span>
                    <ul v-if='creators.tags.length>0'>
                        <li v-for='(item,index) in creators.tags' :key='index'>
                            {{item}}
                        </li>
                    </ul>
                    <ul v-else>无</ul>
                </div>
                <div class="description">
                    <p v-for="(item,index) in creators.descriptions" :key="index">{{item}}</p>
                </div>
                <i @click='songInfo'></i>
            </div>
        </transition>
    </div>
</template>
<script>
import loading from '@/base/loading'
import musicList from '@/base/musicList'

export default {
    components:{
       loading,musicList
    },
    data(){
        return{
            songList:[],
            songShow:false,
            creators:{
                coverImgUrl:'',
                count:'',
                name:'',
                creator:{
                    avatarUrl:'',
                    nickname:''
                },
                tags:[],
                description:''
            },
        }
    },
    async created(){
        let {data} = await this.$http(`/playlist/detail?id=${this.$route.params.id}`)
        this.songList = data.playlist.tracks
        data.privileges.forEach(items=>{
            let s =this.songList.find(item=>{
                return item.id === items.id
            })
            s['privilege']=items
        })
        this.creators={
            coverImgUrl:data.playlist.coverImgUrl,
            count:data.playlist.playCount,
            name:data.playlist.name,
            creator:data.playlist.creator,
            tags:data.playlist.tags,
            description:data.playlist.description
        }
    },
    methods:{
        goBack(){
            this.$router.push('/recommend')
        },
        playCount(val){
            let y =val/(10**8);
            let w = val/(10**4);
            if(y>=1){
                return y.toFixed(1)+"亿"
            }
            if(w>=1){
                return w.toFixed(1)+'万'
            }
            return val;
        },
        songInfo(){
            this.songShow=!this.songShow
        }
    },
    computed:{
        descriptions(){
            if(this.creator.description == null){
                return
            }else{
                return this.creator.description.split('\n')
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
    height: 100vh;
    z-index:10;
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
.songList .header_con{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    background:black;
    color:white;
    padding:0 10px;
    z-index:11;
}
.songList .header_con h6{
    color:white;
}
.header_con .return{
    margin-right:10px;
    font-size:18px;
}
.header_con .headertxt{
    flex:1;
    width: 80%;
}
.header_con .song_share{
    font-size:20px;
}
.songList_header .songList_info{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 0 10px;
    padding-top:50px;
}
.songList_info .songList-img{
    max-width: 170px;
    max-height: 170px;  
    width: 48vw;
    position: relative;
    margin-right:12vw;
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
    background:url('../../assets/image/sdf.svg') 0 center no-repeat;
    background-size: 11px 10px;
}
.songList_info .songList-txt{
    max-width: 250px;
    max-height: 170px;  
    width: 48vw;
    height: 52%;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
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
    padding:0 10px;
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
    padding-bottom:20px;
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