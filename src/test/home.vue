<template>
    <div>
        <div class="user">
            <div class="user-info" :style="bgUrl">
                <div class="header">
                    <img :src="headerImg" alt="">
                </div>
                <div class="user-all">
                    <div class="nickname">{{nickname}}</div>
                    <div class="user-label"></div>
                </div>
            </div>
            <!-- 收藏歌单页面 -->
            <div class="songList">
                <div class="song" v-for="(item,key) in songList" :key="key" @click="songmenu(item)">
                    <img :src="item.coverImgUrl" alt="" :title="item.name">
                    <div class="title">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    props:['id'],
    data(){
        return{
            headerImg:"",
            headerbg:"",
            nickname:"",
            label:"",
            songList:[]
        }
    },
    async mounted(){
        //用户歌单
        let url = "http://localhost:3000/user/playlist?uid="+this.id;
        let {data:res} = await axios.get(url)
        //用户详情
        let url1 = "http://localhost:3000/user/detail?uid="+this.id;
        let {data:res1} = await axios.get(url1)
        this.headerImg = res1.profile.avatarUrl
        this.headerbg = res1.profile.backgroundUrl
        this.nickname = res1.profile.nickname
        this.songList = res.playlist;
    },
    methods:{
        songmenu:function(data){
            this.$router.push({path:"/songList/"+data.id})
        }
    },
    computed:{
        bgUrl:function(){
            return "background:url("+this.headerbg+");"
        }
    }
}
</script>
<style scoped>
    .user-info{
        width: 100%;
        height: 100px;
        padding:0 30px;
        box-sizing:border-box;
        display: flex;
        justify-content:space-around;
        align-items:center;
    }
    .user-info .header{
        width: 100px;
        height: 100px;
    }
    .header img{
        width: 100%;
        height: 100%;
        border-radius:50%;
        border:2px solid white;
        box-sizing:border-box;
    }
    .nickname{
        font-size:22px;
        color:white;
    }
    .songList{
        display: flex;
        justify-content: space-around;
        align-items:center;
        flex-wrap:wrap;
    }
    .song{
        width: 200px;
        height: 200px;
        margin:20px;
        position:relative;
        cursor: pointer;
    }
    .song img{
        width: 100%;
        height: 100%;
    }
    .song .title{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background:white;
        text-align: center;
        line-height: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>