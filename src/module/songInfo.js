import http from '@/http.js'
const songInfo = async function(songid){
    let {data} = await http(`/song/detail?ids=${songid}`)
    let {data:data1} = await http(`/song/url?id=${songid}`)
    let {data:res} = await http(`/lyric?id=${songid}`)
    let arr=[];
    if(!res.lrc){
        arr.push({
            time:'[00:00.000]',
            content:'暂无歌词'
        })
    }else{
        res.lrc.lyric.replace(/\[(.+)\](.+)/g,(_,time,content)=>{
            arr.push({
                time,
                content
            })
        })
    }
    
    let song = data.songs[0]
    return{
        songName:song.name,
        athor:song.ar[0].name,
        album:song.al.name,
        picUrl:song.al.picUrl,
        songId:song.id,
        songurl:data1.data[0].url,
        lyric:arr
    }
}

export default songInfo
