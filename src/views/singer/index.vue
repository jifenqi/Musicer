<template>
    <div>
        <div class="hot_song">
            <div class="hotop">
                <div class="hotpct">
                    <div class="songList"></div>
                    <div class="hottime">更新日期：{{formate(update)}}</div>
                </div>
            </div>
            <div class="remd_newsg hotcon">
                <div class="songs" v-for='(item,index) in songList' :key="item.id" @click="songURL(item.id)">
                    <div class="song_rank">{{(index+1)<10?'0'+(index+1):index+1}}</div>
                    <div class="songs_item">
                        <div class="newsg_title">
                            <div class="songs_name f-thide">{{item.name}}</div>
                            <div class="songs_author f-thide">
                                <i></i>{{item.ar[0].name}} - {{item.al.name}}
                            </div>
                        </div>
                        <div class="songs_play">
                            <span  :class="$root.songid === item.id?'player_move':'player_stop'"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if='!songList.length'>
            <loading></loading>
        </div>
    </div>
</template>
<script>
import loading from '@/base/loading'

export default {
    name:"singer",
    components:{
        loading
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
        this.update = data.playlist.updateTime
    },
    methods:{
        formate(data){
            if(!data)return
            let d = new Date(data)
            return d.getMonth()+1+'月'+d.getDate()+'日'
        },
        async songURL(songid) {
            this.$store.commit("showPlayer", true);
            this.$store.dispatch("addSong", songid);
            this.$store.dispatch("songList", {obj:this.songList});
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
    background: url('./hot_music_bg_2x.jpg') no-repeat;
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
    background:url('./index_icon_2x.png') no-repeat;
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
.hot_song .remd_newsg .songs{
	display: flex;
	justify-content: space-between;
	align-items:center;
}
.hot_song .remd_newsg .songs .song_rank{
	width: 40px;
    font-size: 17px;
    color: #999;
    margin-left: -10px;
    text-align: center;
    width: 15%;
}
.hot_song .remd_newsg .songs:nth-child(1) .song_rank,.hot_song .remd_newsg .songs:nth-child(2) .song_rank,.hot_song .remd_newsg .songs:nth-child(3) .song_rank{
	color:#df3436;
}
.songs_item{
	flex:1;
	display: flex;
	justify-content: space-between;
	align-items:center;
	position: relative;
    width: 85%;
}
.songs_item::after{
	position: absolute;
    z-index: 2;
    content: "";
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    transform-origin: top left;
    border-bottom: 1px solid rgba(0,0,0,.1);
    transform:scale(0.5);
}
.songs_item .newsg_title{
	padding:6px 0;
    width: 70%;
}
.songs_item .newsg_title .songs_name{
    font-size:17px;
}
.songs_item .newsg_title .songs_author{
	font-size: 12px;
    color: #888;
}
.songs_item .newsg_title .songs_author i{
	display: inline-block;
    width: 12px;
    height: 8px;
    margin-right: 4px;
	background:url(./index_icon_2x.png) no-repeat;
	background-size: 166px 97px;

}
.songs_item .songs_play{
	padding:0 10px;
	display: flex;
	align-items:center;
}
.songs_item .songs_play span{
	display: inline-block;
    width: 22px;
    height: 22px;
    font-size: 20px;
    color: #656565;
}
.songs_item .songs_play .player_move{
  color:red;
}
.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
}
</style>