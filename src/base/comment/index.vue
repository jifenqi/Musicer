<template>
    <div>
        <div class="songComments">
            <div class="page_header">
                <div>
                    <i class='return' @click='goBack'></i>
                    评论
                </div>
                <i class='song_share'></i>
            </div>
            <div class="page-content">
                <div class="con_title">
                    <div>评论区</div>
                    <div ref='div' @click='click'>
                        <span class="recommend active" v-if='comments'>推荐</span>
                        <span class="hot" v-if='hotComments'>最热</span>
                    </div>
                </div>
                <div class='comments_con'>
                    <ul>
                        <li v-for='item in currentComment' :key='item.commentId'>
                            <div class="user_pic">
                                <img v-lazy="item.user.avatarUrl" alt="">
                            </div>
                            <div class="user_comment">
                                <div class="userInfo">
                                    <div>
                                        <div class="nickname">{{item.user.nickname}}</div>
                                        <div class="commenttime">{{formate(item.time)}}</div>
                                    </div>
                                    <div class="yes">
                                        <span v-show='item.likedCount'>{{item.likedCount}}</span>
                                        <i class='zan'></i>
                                    </div>
                                </div>
                                <div class="commentInfo">
                                    <p>{{item.content}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if='!currentComment'>
            <loading></loading>
        </div>
    </div>
</template>
<script>
import loading from '@/base/loading'

export default {
    props:['song'],
    components:{
        loading
    },
    data(){
        return{
            hotComments:null,
            comments:null,
            currentComment:null
        }
    },
    async created(){
        let {data} = await this.$http(`/comment/music?id=${this.song.id}`)
        this.comments = data.comments;
        this.hotComments = data.hotComments;
        this.currentComment =data.comments
    },
    methods:{
        goBack(){
            this.$parent.show = false;
        },
        click(e){
            let div = this.$refs.div.querySelectorAll('span');
            for(let i =0;i<div.length;i++){
                div[i].classList.remove('active')
            }
            if(e.target.className.includes('recommend')){
                e.target.classList.add('active')
                this.turnModel(this.comments)
            }
            if(e.target.className.includes('hot')){
                e.target.classList.add('active')
                this.turnModel(this.hotComments)
            }
            return
        },
        turnModel(item){
            this.currentComment =item
        },
        formate(item){
            let n = new Date(item)
            let y = n.getFullYear() 
            let M = n.getMonth()
            let d = n.getDate()
            y = y&&y+'年'
            M = M&&M+'月'
            d = d&&d+'日'
            return y+M+d;
        }
    }
}
</script>
<style scoped>
.songComments{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index:10;
    height: 100vh;
    background:white;
}
.songComments .page_header{
    width: 100%;
    height: 50px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:red;
}
.songComments .page_header>div{
    display: flex;
    align-items: center;
    
}
.songComments .page_header>div>i{
    margin-right:10px;
}
.songComments .page_header i{
    font-size:5vw;
}
.page-content{
    width: 100%;
    color:black;
    padding:10px;
    height: calc(100vh - 50px);
}
.page-content .con_title{
    width: 100%;
    height: 30px;
    font-size:12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.page-content .con_title span{
    margin-left:10px;
    color:#988e8e;
}
.page-content .con_title span.active{
    color:black;
}
.page-content .comments_con{
    padding:10px 0;
    height:calc(100% - 30px);
    overflow-y: auto;
}
.page-content .comments_con li{
    display: flex;
    justify-content: space-between;
    padding:10px 0;
}
.page-content .comments_con li .user_pic{
    width: 40px;
    height: 40px;
    border-radius:50%;
    overflow:hidden;
    background:red;
}
.page-content .comments_con li .user_pic img{
    width: 100%;
    height: 100%;
}
.page-content .comments_con li .user_comment{
    flex:1;
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
    padding-left:10px;
    border-bottom:1px solid #e4e4e4;
}
.page-content .comments_con li .user_comment .userInfo{
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size:12px;
    color:#a0a0a0;
}
.page-content .comments_con li .user_comment .commentInfo{
    padding:10px 0;
    padding-right:10px;
}
.page-content .comments_con li .user_comment .commentInfo p{
    font-size:13px;
}
.page-content .comments_con li .user_comment .userInfo .nickname,.page-content .comments_con li .user_comment .userInfo .commenttime{
    line-height: 14px;
}
.page-content .comments_con li .user_comment .userInfo .commenttime{
    padding-top:3px;
    transform:scale(0.8);
    transform-origin:left center;
}
</style>