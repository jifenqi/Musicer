import Vue from 'vue'
import Vuex from 'vuex'
import songInfo from '@/module/songInfo'

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    show:false,
    song:'',
    songList:[],
    historySong:[]
  },
  mutations: {
    showPlayer(state,opt){
      state.show = opt
    }
  },
  actions:{
    songList({state,commit},{list,song}){
      state.songList = list;
      this.dispatch('turnSong',song)
      commit('showPlayer',true)
    },
    async turnSong({state},song){
      let id = song.id
      let res =  state.historySong.some(item=>{
        return item.id === id
      })
      if(res){
        state.song = state.historySong.find(item=>item.id === id)
      }else{
        state.song = await songInfo(song)
        state.historySong.push(state.song);
        sessionStorage['historySong'] = JSON.stringify(state.historySong)
      }
    
    }
  }
})

export default store;