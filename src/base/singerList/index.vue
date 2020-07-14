<template>
    <div>
        <div class="singerList_all">
            <div class="singerList_header"  :style="{'height':height}">
                <img :src="singerInfo.picUrl" :alt="singerInfo.name" :style="{'transform':scale}">
                <div class="header_top">
                    <i class="return" @click="$router.push('/singer')"></i>
                </div>
                <div class="singerInfo" v-show='singerInfo.name'>
                    <div class="singer_base">
                        <p class="name">{{singerInfo.name}}</p>
                        <p class="singer_works">
                            歌曲<span>{{formate(singerInfo.musicSize)}}</span>
                            视频<span>{{formate(singerInfo.mvSize)}}</span>
                        </p>
                    </div>
                    <div class="singer_deep">
                        <p class="baseInfo">基本信息</p>
                    </div>
                </div>
            </div>
            <div class="singer_hotSong" ref='hotSongs' :style="{'height':`calc(100% - ${height})`}">
                <ul>
                    <music-list :search_list='hotSongs'></music-list>
                </ul>
            </div>
        </div>
        <div v-if='!hotSongs.length'>
            <loading></loading>
        </div>
    </div>
</template>
<script>
import loading from '@/base/loading'
import BScroll from 'better-scroll'
import musicList from '@/base/musicList'
export default {
    name:'singerList',
    components:{
        loading,
        musicList
    },
    data(){
        return{
            singerInfo:[],
            hotSongs:[],
            scroll:null,
            scrollY:0
        }
    },
    async created(){
        let {data} = await this.$http(`/artists?id=${this.$route.params.id}`)
        this.singerInfo = data.artist
        this.hotSongs = data.hotSongs
    },
    mounted(){
        this.scroll= new BScroll(this.$refs.hotSongs,{
            scrollY:true,
            click:true,
            probeType:3
        })
        this.scroll.on('scroll',(pos)=>{
            if(pos.y>=-60){
                this.scrollY = pos.y
            }
        })
    },
    methods:{
        formate(val){
            let arr = ['1k+','1w+','10w+','100w+'] 
            let k = ((val/1000) |0)
            k = k>0?k+'':''
            let s = k.length
            return arr[s-1]?arr[s-1]:val
        }
    },
    computed:{
        height(){
            return 'calc(50vh + '+this.scrollY+'px)'
        },
        scale(){
            return `translate(-50%,-50%) scale(${this.scrollY*0.001 + 1.2})`
        }
    }
}
</script>
<style scoped>
.singerList_all{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index:999;
    background:rgb(0, 0, 0);
}
.singerList_all .singerList_header{
    width: 100%;
    height: 50vh;
    overflow:hidden;
    position: relative;
}
.singerList_all .singerList_header>img{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
}
.singerList_all .singerList_header .header_top{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    color: white;
    padding: 0 10px;
    display: flex;
    align-items:center;
}
.singerList_all .singerList_header .header_top>i{
    font-size:22px;
}
.singerList_all .singerList_header .singerInfo{
    position: absolute;
    right: 0;
    bottom: 20px;
    width: 100%;
    padding:0 20px;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.singerList_all .singerList_header .singerInfo>div{
    width: 50%;
    padding:10px;
}
.singerList_all .singerList_header .singerInfo .singer_base .name{
    font-size:24px;
    color:#8e8e8e;
}
.singer_base .singer_works{
    padding-top:10px;
    font-size:12px;
    color:#8e8e8e;
}
.singer_base .singer_works span{
    background:#de3c32;
    color: white;
    display: inline-block;
    padding:0 10px;
    border-radius:10px;
    margin-left:5px;
}
.singer_deep{
    display: flex;
    flex-direction: row-reverse;
    align-items:flex-end;
}
.singer_deep p{
    font-size:18px;

}
.singerList_all .singer_hotSong{
    width: 100%;
    height: calc(100% - 50vh);
    overflow: hidden;
    background:white;
    border-radius:24px 24px 0 0;
    border-top: 1px solid black;
}

.singerList_all .singer_hotSong ul{
    width: 100%;
    padding:0 10px;
}
</style>