<template>
    <div id='singer'>
        <div class="singer_all">
            <div class='btscroll' ref='singer'>
                <div class="singerContent">
                    <dl class="singer" ref='listGroup' v-for="(items) in singerList" :key='items.title'>
                        <dt class='singer_label'>{{items.title}}</dt>
                        <dd class="singer_data">
                            <div class="singer_con" v-for='(item,index) in items.items' :key='index' @click="singerInfo(item.id)">
                                <div class="singer_img"><img v-lazy="item.picUrl" alt=""></div>
                                <div class="singer_name">{{item.name}}</div>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="singer_title" v-show='label && bol' v-text='label'></div>
            <div class="singer_aside"
                @touchmove.prevent='touchmove'
                @touchend='touchend'
            >
                <ul>
                    <li 
                    :class='index == currentIndex?"active":""' 
                    v-for='(item,index) in shortcutList' 
                    :key='index'
                    @click='scrollTo(index)'
                    ref='li'
                    >
                    {{item}}
                </li>
                </ul>
            </div>
            <div class="text" v-if='textShow'>{{textShow}}</div>
            <div v-if='!singerList.length'>
                <loading></loading>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import loading from '@/base/loading'
import Py from '@/module/py.js'
import BScroll from 'better-scroll'

const HEIGHT = 30
let timer=null;
export default {
    name:'singer',
    components:{
        loading
    },
    data(){
        return{
            singerList:[],
            currentIndex:0,
            label:'',
            bol:true,
            singer:null,
            textShow:''
        }
    },
    async created(){
        let {data} = await this.$http('/toplist/artist')
        let {data:res} = await this.$http('/top/artists?offset=0&limit=10')
        let singerRank = data.list.artists;
        let hotSinger = res.artists;
        this.singerList = this.singerL(singerRank,hotSinger);
    },
    mounted(){
        this.singer = new BScroll(this.$refs.singer,{
            scrollY:true,
            probeType:3,
            click:true
        })
        this.singer.on('scroll',this.scroll)
        
    },
    methods:{
        singerL(singerList,hotSinger){
            let map ={}
            singerList.forEach(item =>{
                let fW = Py(item.name)
                if (!map[fW]) {
                    map[fW] = {
                        title: fW,
                        items: []
                    }
                }
                map[fW].items.push(item)
            })
            let ret = []
            let hot = [{
                title:'热门',
                items:hotSinger
            }]
            for (let key in map) {
            let val = map[key]
            if (val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
            }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        scrollTo(index){
            this.singer.scrollTo(0,-this.arr[index],300)
        },
        singerInfo(id){
            this.$router.push(`/singer/${id}`)
        },
        scroll(pos){
            if(pos.y>0){this.bol = false}else{this.bol=true}
            let h = Math.abs(pos.y);
            this.arr.forEach((item,index)=>{
                if(h>item-HEIGHT && h<this.arr[index+1]){
                    this.currentIndex = index,
                    this.label = this.singerList[index].title
                }else if(h>=item-HEIGHT){
                    this.currentIndex = index,
                    this.label = this.singerList[index].title
                }
            })
        },
        touchmove(e){
            let y = e.touches[0].pageY
            this.s(y)
            return false;
        },
        touchend(){
            clearTimeout(timer)
            this.textShow=''
            this.scrollTo(this.currentIndex)
            return false;
        },
        s(y){
            this.Indicator.forEach((item,index)=>{
                if(y>item && y<this.Indicator[index+1]){
                    this.currentIndex = index
                    this.textShow = this.$refs.li[index].innerHTML
                }else if(y>=item){
                    this.currentIndex = index,
                    this.textShow = this.$refs.li[index].innerHTML
                }
            })
        }
    },
    computed:{
        shortcutList() {
            return this.singerList.map((item) => {
             return item.title.substr(0, 1)
            })
        },
        arr(){
            let arr=[]
            this.$refs.listGroup.forEach(item=>{
                arr.push(item.offsetTop)
            })
            return arr
        },
        Indicator(){
            let arr=[];
            this.$refs.li.map(item=>{
                arr.push(item.getBoundingClientRect().top)
            })
            return arr
        }
    }
}
</script>
<style scoped>
#singer{
    width: 100%;
    height: 100%;
}
.singer_all{
    width: 100%;
    height: 100%;
    position: relative;
    overflow:hidden;
}
.singer_all .btscroll{
    width: 100%;
    height: 100%;
}
.singer_all .text{
   position: absolute;
   top: 50%;
   left: 50%;
   transform:translate(-50%,-50%);
   width: 80px;
   height: 80px;
   background:#ccc;
   color:white;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size:50px;
   border-radius:10px;
   opacity: 0.6;
}
.wrapper{
   width: 100%;
   height: 100%;
}
.singerContent{
    width: 100%;
}
.singer_aside{
    position: absolute;
    right: 0px;
    top:50%;
    width: 40px;
    height: 430px;
    padding:0 10px;
    transform-origin:center right;
    transform: translateY(-50%) scale(0.8);
}
.singer_aside ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background:#00000045;
    border-radius:20px;
}
.singer_aside ul li{
    color:white;
    text-align: center;
    font-size:12px;
}
.singer_aside ul li.active{
    color:red;
}
.singer_title{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding:0 10px;
    background:black;
    color:white;
}
.singerContent .singer{
    width: 100%;
    border-bottom:1px solid black;
}
.singerContent .singer .singer_label{
    width: 100%;
    height: 30px;
    padding:0 10px;
    line-height: 30px;
    color:white;
    background:black;
    font-size:14px;
}
.singerContent .singer .singer_data{
    width: 100%;
}
.singerContent .singer .singer_data .singer_con{
    width: 100%;
    height: 50px;
    padding:0 20px;
    border-bottom:1px solid #d8d4d4;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.singerContent .singer .singer_data .singer_con .singer_img{
    width: 35px;
    height: 35px;
    border-radius:50%;
    overflow:hidden;
    border:1px solid black;
}
.singerContent .singer .singer_data .singer_con .singer_img>img{
   width: 100%;
   height: 100%;
}
.singerContent .singer .singer_data .singer_con .singer_name{
    margin-left:20px;
    font-size:16px;
}
</style>