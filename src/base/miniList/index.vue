<template>
    <div>
        <section>
            <h3>当前歌单</h3>
            <i @click='$parent.show = false'></i>
            <div ref='songList' class="songList">
                <ul ref='ul'>
                    <li ref='li' v-for='(item) in songList' :key="item.id" :class="item.songurl == 'Null'?'none':''">
                        <div>
                            <p>{{item.name}}</p>
                            <p>{{item.athor}}</p>
                        </div>
                        <i @click='goSong(item)' :class="btnVal(item)?'player_move':'player_stop'"></i>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
    props:['index'],
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.songList,{
            scrollY:true,
            click:true
        })
        this.scroll.scrollToElement(this.$refs.li[this.index],1000)
    },
    methods:{
        goSong(song){
            let id = song.id;
            if(this.song.id ===  id){
                this.$parent.songstate = !this.$parent.songstate;
            }else{
                this.$store.dispatch("turnSong",song)
            }
        },
        btnVal(song){
            return (song.id ==this.song.id) && this.$parent.songstate 
        }
    },
    computed:{
        songList(){
            return this.$store.state.songList.filter(item=>item.fee !== 1)
        },
        song(){
            return this.$store.state.song
        }
    }
}
</script>
<style scoped>

section{
   width: 100%;
   height: 100%;
   color:white;
   padding:10px;
   position: relative;
   background:rgba(0, 0, 0, 0.719);
   border-radius:20px 20px 0 0;
}
section h3{
    font-size:14px;
    color:white;
    height: 30px;
    line-height: 30px;
   text-align: center;
}
section>i{
    position: absolute;
	right:16px;
	top:13px;
	width: 15px;
	height: 15px;
	border-radius:50%;
	background:#cccccc96;
}
section>i::before{
	content:"";
	position: absolute;
	left:50%;
	top: 50%;
	width: 1px;
	height: 50%;
	background:white;
	transform:translate(-50%,-50%) rotate(45deg);
}
section>i::after{
	content:"";
	position: absolute;
	left:50%;
	top: 50%;
	width: 1px;
	height: 50%;
	background:white;
	transform:translate(-50%,-50%) rotate(-45deg);
}
section .songList{
    width: 100%;
    height: 250px;
    overflow-y:auto;
}
section .songList ul{
    width: 100%;
}
section ul li{
    width: 100%;
    padding:0 10px;
    display: flex;
    justify-content:space-between;
    align-items:center;
    color:white;
    background:#c1c1c13b;
    border-bottom:3px solid transparent;
    margin-top:5px;
    border-radius:5px;
}
section ul li.none,section ul li.none p{
    color:#a7a6a69e !important;
}
section ul li>div{
    flex:1;
    width: 100px;
}
section li p{
    color:white;
    width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
section li p:nth-child(2){
    font-size:12px;
    transform: scale(0.8);
    transform-origin: left center;
    color:#d2d0d0c4;
}
section li>i{
    font-size:20px
}

</style>