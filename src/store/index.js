import Vue from 'vue'
import Vuex from 'vuex'
import songInfo from '@/module/songInfo'

Vue.use(Vuex);

let arr=[]

const store = new Vuex.Store({
  state: {
    show:false,
    song:'',
    songList:[],
    historySong:[],
    obj:[]
  },
  mutations: {
    showPlayer(state,opt){
      state.show = opt
    }
  },
  actions:{
    async addSong({state,commit},id){
      let result = state.historySong.find((item)=>{
        return item.songId === id
      })
      if(result){
        state.historySong.forEach(item=>{
          if(item.songId === id){
            state.song = item;
          }
        })
        return ;
      }
      let res = await songInfo(id)
      state.song = res;
      state.historySong.push(res)
      sessionStorage['historySong']=JSON.stringify(state.historySong)
    },
    async songList({state},{obj,i=0}){
      if(obj.length>0){
        if(state.obj === obj)return
        state.obj = obj
      }
      let Obj = state.obj.slice(i,i+10)
      let res = await Promise.all(Obj.map(async item => await songInfo(item.id)))  /*** */
      arr.push(...res)
      if(res.length>0){
        if(!obj.length){
          state.songList=arr;
        }else{
          state.songList=res;
        }
      }
    }
  }
})
export default store;