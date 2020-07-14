<template>
    <div>
        <div class="singer_all">
            <div class="wrapper" ref='singer'>
                <div>
                    <div class="singerContent">
                        <div class="singer" ref='listGroup' v-for="(items) in singerList" :key='items.title'>
                            <dl>
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
                </div>
            </div>
            <div class="singer_title" v-show='label && bol' v-text='label'></div>
            <div class="singer_aside">
                <ul>
                    <li 
                    :class='index == currentIndex?"active":""' 
                    v-for='(item,index) in shortcutList' 
                    :key='index'
                    @click='scrollTo(index)'
                    >
                    {{item}}
                </li>
                </ul>
            </div>
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
            singer:null
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
    }
}
</script>
<style scoped>
.singer_all{
    width: 100%;
    height: calc(100vh - 124px);
    position: relative;
    overflow:hidden;
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
    right: 5px;
    top:0;
    width: 20px;
    height: 430px;
    background:#00000045;
    border-radius:20px;
    transform:scale(0.8)
}
.singer_aside ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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