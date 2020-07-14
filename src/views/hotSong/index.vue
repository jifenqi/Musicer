<template>
    <div>
        <div class="hot_song">
            <div class="hotop">
                <div class="hotpct">
                    <div class="songList"></div>
                    <div class="hottime">更新日期：{{formate(update)}}</div>
                </div>
            </div>
            <div class="remd_newsg">
                <music-list :search_list='songList'></music-list>
            </div>
        </div>
        <div v-if='!songList.length'>
            <loading></loading>
        </div>
    </div>
</template>
<script>
import loading from '@/base/loading'
import musicList from '@/base/musicList'
export default {
    name:"hotSong",
    components:{
        loading,musicList
    },
    data(){
        return{
            update:'',
            songList:[]
        }
    },
    async created(){
        let {data} = await this.$http("/playlist/detail?id=3778678")
        this.songList = data.playlist.tracks
        data.privileges.forEach(items=>{
            let s =this.songList.find(item=>{
                return item.id === items.id
            })
            s['privilege']=items
        })
        this.update = data.playlist.updateTime
    },
    methods:{
        formate(data){
            if(!data)return
            let d = new Date(data)
            return d.getMonth()+1+'月'+d.getDate()+'日'
        }
    }
}
</script>
<style style="css" scoped>
.hot_song{
	width: 100%;
}
.hot_song .hotop{
	width: 100%;
	position: relative;
    padding-top: 38.9%;
    padding-left: 20px;
    overflow: hidden;
    background: url('../../assets/image/hot_music_bg_2x.jpg') no-repeat;
    background-size: contain;
}
.hot_song .hotop::after{
	content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0,0,0,.2);
}
.hot_song .hotop .hotpct{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding-left: 20px;
    box-sizing: border-box;
}
.hot_song .hotop .songList{
	width: 142px;
    height: 67px;
    background:url('../../assets/image/index_icon_2x.png') no-repeat;
    background-position: -24px -30px;
    background-size: 166px 97px;
}
.hot_song .hotop .hottime{
	margin-top: 10px;
    color: hsla(0,0%,100%,.8);
    font-size: 12px;
    transform: scale(.91);
    transform-origin: left top;
}
</style>