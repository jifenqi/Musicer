<template>
    <div>
        <div class="header">
            <span></span>
            <h1>网易云音乐</h1>
			<div class="my" @click='showMy'></div>
        </div>
		<transition name='mysong'>
			<user-info class='mysong' v-if='show'></user-info>
		</transition>
    </div>
</template>
<script>
import userInfo from '@/base/userInfo'
export default {
	components:{
		userInfo
	},
	data(){
		return{
			show:false
		}
	},
    methods:{
		showMy(){
			this.show = !this.show;
		}
	}
}
</script>

<style scoped>
.header{
	width: 100%;
	height: 84px;
	background:#ea2000;
	display: flex;
	justify-content: center;
	align-items:center;
	position: relative;
}
.header .my{
	position: absolute;
	right: 20px;
	top: 50%;
	transform:translateY(-50%);
	font-size: 35px;
	color:white;
}
.header h1{
	color:white;
	font-weight:400;
	font-size:25px;
}
.header span{
	width: 32px;
	height: 32px;
	background:url('./F4LudfJWGfPRHe8tAArJ1A==_109951163421193595.png') no-repeat 0 0; 
	background-size:cover;
	margin-right:10px;
}
.mysong{
	position: fixed;
	top: 0;
	right: 0%;
	width: 100%;
	height: 100vh;
	background:#4c4c4c;
	z-index:4;
	color:white;
	opacity: 1;
}
.mysong-enter-active,.mysong-leave-active{
    transition:0.6s;
}
.mysong-enter, .mysong-leave-to /* .fade-leave-active below version 2.1.8 */ {
    right:100%;
	opacity: 0;
}
</style>