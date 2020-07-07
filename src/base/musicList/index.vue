<template>
  <div>
    <ul>
      <li v-for="item in search_list" :key="item.id" @click="songURL(item.id)">
        <div class="songs_item">
          <div class="newsg_title">
            <div class="songs_name f-thide">{{item.name}}</div>
            <div class="songs_author f-thide">
              <i></i>
              {{item.artists[0].name}} - {{item.album.name}}
            </div>
          </div>
          <div class="songs_play">
            <span :class="$root.songid === item.id?'player_move':'player_stop'"></span>
          </div>
        </div>
      </li>
    </ul>
    <div v-if='!search_list.length'>
      <loading></loading>
    </div>
  </div>
</template>
<script>
import loading from '@/base/loading'

export default {
  props: ["search_list"],
  components:{
    loading
  },
  methods: {
    async songURL(songid) {
      this.$store.commit("showPlayer", true);
      this.$store.dispatch("addSong", songid);
      this.$store.dispatch("songList",{obj:this.search_list});
    }
  }
};
</script>

<style scoped>
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
</style>