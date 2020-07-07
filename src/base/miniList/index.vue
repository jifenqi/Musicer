<template>
    <div>
        <section>
            <h3>歌单</h3>
            <i @click='$parent.show = false'></i>
            <div ref='songList' class="songList" @scroll='scroll'>
                <ul ref='ul'>
                    <li v-for='(item) in songList' :key="item.id">
                        <div>
                            <p>{{item.songName}}</p>
                            <p>{{item.athor}}</p>
                        </div>
                        <i @click='goSong(item.songId)' :class="btnVal(item.songId)?'player_move':'player_stop'"></i>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            songIndex:0,
            index:0
        }
    },
    methods:{
        goSong(songid){
            if(this.song.songId === songid){
                this.$parent.songstate = !this.$parent.songstate;
            }else{
                this.$store.dispatch("addSong", songid);
            }
        },
        btnVal(index){
            return index==this.song.songId && this.$parent.songstate 
        },
        scroll(e){
            let res = this.$refs.songList.scrollTop;
            let data = this.$refs.ul.offsetHeight - this.$refs.songList.offsetHeight;
            if(res>=data){
                this.index++;
                this.$store.dispatch("songList",{obj:[],i:10*this.index});
            }else{
                return
            }
        }
    },
    computed:{
        songList(){
            return this.$store.state.songList
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
}
section li>i{
    font-size:20px
}

</style>