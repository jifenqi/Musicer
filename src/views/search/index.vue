<template>
    <div>
        <div class="song_search">
            <div class="search">
                <div class="search_input">
                    <i></i>
                    <input v-model="search_txt" @keyup="search(search_txt)" type="text" placeholder="搜索歌曲、歌手、专辑">
					<span class='del' v-if='search_txt' @click="delTxt()"></span>
				</div>
            </div>
            <div class="hot_search">
                <p>{{search_txt?'搜索结果':'热门搜索'}}</p>
                <ul v-if='!search_txt' class="keywords">
                    <li v-for="item in hotList" :key="item.first" @click="search(item.first)">{{item.first}}</li>
				</ul>
				<music-list v-if='search_txt' :search_list='search_list'></music-list>
            </div>
			<div class='hot_search search_history' v-if='historySearch.length>0 && !search_txt'>
				<p>搜索历史</p>
				<ul  v-if='!search_txt' class="keywords">
					<li v-for="item in historySearch" :key="item" @click="click">
						{{item}}
						<span class='del'></span>
					</li>
				</ul>
			</div>
			<div v-if='!hotList.length'>
				<loading></loading>
			</div>
        </div>
    </div>
</template>
<script>
import musicList from '@/base/musicList'
import loading from '@/base/loading'

export default {
	name:"search",
	components:{
		musicList,
		loading
	},
	data(){
		return{
			search_txt:'',
			search_list:[],
			hotList:[],
			historySearch:[]

		}
	},
	async beforeCreate(){
		let {data} = await this.$http('/search/hot')
		this.hotList = data.result.hots
	},
    methods:{
		search(data){
			if(data){
				this.getSearch(data)
			}
		},
		async getSearch(res){
			this.search_txt = res;
			let {data} = await this.$http(`/search?keywords= ${res}`)
			this.search_list = data.result.songs;
			let result = this.historySearch.find((item)=>{
				return item == res
			})
			if(!result){
				this.historySearch.unshift(res)
			}
		},
		click(e){
			if(e.target.className == 'del'){
				let res = e.target.previousSibling.nodeValue.trim('')
				this.historySearch.shift(res)
			}else{
				let res = e.target.childNodes[0].nodeValue.trim('')
				this.search(res)
			}
		},
		delTxt(item){
			this.search_txt="";
			this.search_list = [];
		}
	}
}
</script>
<style scoped>
.song_search{
	width: 100%;
	height: calc(100vh - 124px);
	overflow-y:auto;
}
.song_search .search{
	width: 100%;
	height: 59.5px;
	padding:0 10px;
	display:flex;
	align-items:center;
	border-bottom:0.5px solid #ccc;
}
.search .search_input{
	width: 100%;
	height: 30px;
	border-radius:30px;
	overflow:hidden;
	position: relative;
}
.search_input i{
	display: inline-block;
	position: absolute;
    left: 0;
    top: 9px;
    margin: 0 8px;
    vertical-align: middle;
    width: 13px;
    height: 13px;
	background:url(../../assets/image/search.svg) no-repeat;
}
.search_input input{
	padding-left:30px;
	border:0;
	width: 100%;
	height: 100%;
	background:#ebecec;
}
.song_search .hot_search{
	padding-left:10px;
	padding-top:12.5px;
	width: 100%;
}
.hot_search p{
	font-size:12px;
	line-height: 16px;
}
.hot_search .keywords{
	width: 100%;
	display:flex;
	flex-wrap:wrap;
}
.keywords li{
	margin-right:8px;
	margin-top:8px;
	border:1px solid #d3d4da;
	border-radius:32px;
	height: 32px;
	padding:0 14px;
	display:flex;
	justify-content: center;
	align-items:center;
	font-size:14px;
	color:#333;
}
.song_search .search_history{
	padding-left:0;
}
.search_history p{
	padding:5px 10px;
	background:#a5a5a542;
}
.search_history .keywords li{
	display: block;
	width: 100%;
	border:0;
	border-bottom:1px solid #dadada;
	border-radius:0px;
	margin-left:10px;
	justify-content: flex-start;
	position: relative;
}
.del{
	position: absolute;
	right:0;
	top:50%;
	width: 15px;
	height: 15px;
	border-radius:50%;
	background:#cccccc96;
	transform:translate(-50%,-50%);
}
.del::before{
	content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2px;
    height: 100%;
    background: rgb(156, 151, 151);
    transform: translate(-50%,-50%) rotate(45deg) scale(0.5);
}
.del::after{
	content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2px;
    height: 100%;
    background: rgb(156, 151, 151);
    transform: translate(-50%,-50%) rotate(-45deg) scale(0.5);
}
</style>