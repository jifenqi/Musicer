<template>
    <div>
        <div class="recommend">
            <div class="recommend_con">
                <h2 class="remd_t1">推荐歌单</h2>
                <div class="remd_songs">
                    <div class="songList_item" v-for="item in songList" :key="item.id" @click='getSongList(item.id)'>
                        <div class="remd_img">
                            <img v-lazy="item.picUrl" alt="">
                            <span>{{playCount(item.playCount)}}</span>
                        </div>
                        <p class="remd_text">{{item.name}}</p>
                    </div>
                </div>
                <h2 class="remd_t1">最新音乐</h2>
                <music-list class="remd_newsg" :search_list='newSong'></music-list>
            </div>
        </div>
        <div v-if='!newSong.length'>
            <loading></loading>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import musicList from '@/base/musicList'
import loading from '@/base/loading'

export default {
    name:"recommend",
    components:{
        musicList,
        loading
    },
    data(){
        return{
            songList:[],
            newSong:[],
        }
    },
    async created(){
        let {data} = await this.$http('/personalized?limit=6')
        let res = await this.$http('/personalized/newsong')
        this.songList = data.result;
        this.newSong = res.data.result.map((item,index) =>{
            return item.song
        })
    },
    methods:{
        getSongList(songid){
            this.$router.push(`/recommend/${songid}`)
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
        }
    }
}
</script>
<style scoped>
.content .recommend{
	width: 100%;
}
.content .recommend .recommend_con{
	padding-top:20px;
}
.recommend_con .remd_t1{
	position: relative;
    padding-left: 9px;
    margin-bottom: 14px;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
    font-weight:400;
}
.recommend_con .remd_t1::after{
	content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
    width: 2px;
    height: 16px;
    background-color: #d33a31;
}
.recommend_con .remd_songs{
	width: 100%;
	display: flex;
	flex-wrap:wrap;
	padding-bottom:24px;
}
.remd_songs .songList_item{
	display: block;
	margin-bottom: 16px;
	padding-right: 2px;
	width: calc(100% / 3);
}
.remd_songs .remd_img,.remd_songs .remd_img img{
	width: 100%;
	position: relative;
}
.songList_item .remd_img::after{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 20px;
    z-index: 2;
    background-image: linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,0));
}
.remd_songs .songList_item span{
	position: absolute;
    right: 5px;
    top: 2px;
    z-index: 3;
    padding-left: 13px;
    color: #fff;
    font-size: 12px;
    background:url(../../assets/image/sdf.svg) 0 center no-repeat;
    background-size: 11px 10px;
}
.remd_songs .songList_item p{
	display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 6px 2px 0 6px;
    min-height: 30px;
    line-height: 1.2;
    font-size: 13px;
    color:#333;
}

.recommend_con .remd_newsg{
	width: 100%;
    padding:0 10px;
}

</style>