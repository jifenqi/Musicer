<template>
    <div>
        <div class="tab">
            <ul>
                <router-link tag='li' to="/recommend">
                    <span :class="$route.path =='/recommend'?'c':''">推荐音乐</span>
                </router-link>
                <router-link tag='li' to="/hotSong">
                    <span :class="$route.path =='/hotSong'?'c':''">热歌榜</span>
                </router-link>
				<router-link tag='li' to="/singer">
                    <span :class="$route.path =='/singer'?'c':''">歌手</span>
                </router-link>
                <router-link tag='li' to="/search">
                    <span :class="$route.path =='/search'?'c':''">搜索</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.tab{
	height: 40px;
	background:white;
	width: 100%;
	border-bottom:1px solid #ccc;
}
.tab ul{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.tab ul li{
	height: 100%;
	font-size:15px;
}
.tab ul li span{
	display: flex;
	align-items: center;
	height: 100%;
	padding:0 5px;
	position: relative;
}
.c{
	color:#dd001b;
}
.c::after{
	content:"";
	position: absolute;
	right: 0;
	bottom: -1px;
	width: 100%;
	height: 100%;
	border-bottom:2px solid #dd001b;
}
</style>