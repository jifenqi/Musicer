<template>
    <div @mousewheel="mouseWheel()">
        <div class="songlist">
            <div class="songs" v-for="(item,key) in songList" :key="key" @click="addmusicUrl(item)">
                    <div class="img">
                        <img :src="item.songs[0].al.picUrl" alt="">
                    </div>
                    <div class="musicInfo">
                        <h3>{{item.songs[0].name}}</h3>
                        <div class="label">{{item.songs[0].ar[0].name}} - {{item.songs[0].al.name}}</div>
                    </div>
            </div>
        </div>
        <div v-if="back" class="goBack" @click="toTop()">
            置顶
        </div>
        <div class="musicplayer">
            <audio :src="musicUrl" controls autoplay></audio>
        </div>
    </div>
</template>
<script>
import axios from "axios"

export default {
    props:["id"],
    data(){
        return{
            songList:[],
            count:10,
            allSong:[],
            back:false,
            musicUrl:"",
            flag : true     //控制加载限制
        }
    },
    async mounted(){
        let url = "http://localhost:3000/playlist/detail?id="+this.id;
        let {data:res} = await axios.get(url)
        this.allSong = res.privileges;       
        this.compute()
        console.log(this.songList)
    },
   methods:{
         compute: async function(){
            for(let i=this.count-10;i<(this.allSong.length<this.count?this.allSong.length:this.count);i++){
                var url1 = "http://localhost:3000/song/detail?ids="+this.allSong[i].id;
                let {data:res1} = await axios.get(url1)
                this.songList.push(res1)
            }
            this.addmusicUrl(this.songList[0]);
            this.flag = true;
        },
        mouseWheel:function(){  
            if((document.documentElement.scrollTop+innerHeight)>=document.body.scrollHeight ){
                if(this.flag){
                    this.flag=false;    
                    this.count+=10;
                    this.compute();
                }
            }
             if(document.documentElement.scrollTop>=innerHeight){
                 this.back=true
             }else{
                 this.back=false
             }
        },
        addmusicUrl:async function(item){
            var url1 = "http://localhost:3000/song/url?id="+item.songs[0].id;
            let {data:res1} = await axios.get(url1)
            this.musicUrl=res1.data[0].url
            if(this.musicUrl ===null){
                this.$message.error({
                    message: '抱歉！ 此音乐不能播放'});
            }
        },
        toTop:function(){
            document.documentElement.scrollTop=0;
            this.back=false;
        }
    }
}
</script>
<style scoped>
    .songlist{
        margin:0 20%;
        display: flex;
        flex-wrap:wrap;
        width: 50%;
        flex-direction: column;
    }
    .songlist .songs{
        width: 100%;
        height: 100px;
        background:#2d2828;
        margin-top:10px;
        padding:20px;
        display: flex;
        /* justify-content: ; */
        align-items:center;
    }
    .songlist .gray{
        background:gray;
        color:#efefef;
    }
    .songs img{
        width: 100px;
        height: 100%;
        border:2px solid black;
    }
    .songs .musicInfo{
        flex:1;
        margin-left:20px;
        color:white;
    }
    .musicInfo h3{
        padding:0 0 20px 0;
        font-size:18px;
    }
    .musicInfo div{
        font-size:14px;
        color:#ccc;
    }
    .goBack{
        width: 50px;
        height: 50px;
        background:blue;
        position: fixed;
        bottom: 50px;
        right: 50px;
        text-align: center;
        color:white;
        line-height: 50px;
        border-radius:50%;
        cursor: pointer;
    }
    .musicplayer{
        position: fixed;
        top:0;
        left: 0;
        width: 300px;
        height: 100px;
    }
</style>