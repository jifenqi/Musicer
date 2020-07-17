<template>
  <div>
    <ul>
      <li 
      v-for="(item,index) in search_list" 
      :key="item.id" 
      @click="songURL(item)" 
      :class="['songs',item.fee == 1?'none':'']"
      >
        <div class="song_rank" v-show="$route.path =='/hotSong'">{{(index+1)<10?'0'+(index+1):index+1}}</div>
        <div class="songs_item">
          <div class="newsg_title">
            <div class="songs_name f-thide">{{item.name}}</div>
            <div class="songs_author f-thide">
              <i v-if="sq(item)"></i>
              {{author(item)}} - {{songName(item)}}
            </div>
          </div>
          <div class="songs_play">
            <span :class="$root.songid === item.id?'player_move':'player_stop'"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {author, songName, newList} from '@/module/formate.js'

export default {
  props: ["search_list"],
  methods: {
    songURL(song) {
      this.$store.dispatch("songList",{
        list:newList(this.search_list),
        song
      })
    },
    sq(song){
      if(song.privilege) return song.privilege.maxbr === 999000
      return  false
    },
    author,
    songName
  }
};
</script>

<style scoped>
.none,.none p{
  color:#cacaca !important;
}
.songs{
	display: flex;
	justify-content: space-between;
	align-items:center;
}
.songs .song_rank{
    font-size: 17px;
    color: #999;
    margin-left: -10px;
    text-align: center;
    width: 50px;
}
.songs:nth-child(1) .song_rank,.songs:nth-child(2) .song_rank,.songs:nth-child(3) .song_rank{
  color:#df3436;
}
.songs_item {
  flex:1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 85%;
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
  background: url(../../assets/image/index_icon_2x.png) no-repeat;
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
</style>