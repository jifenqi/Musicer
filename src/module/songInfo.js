import http from '@/http.js'
import {newInfo} from './formate.js'

function lyric(res){
    let arr=[];
    if(!res.lrc || res.nolyric){
        arr.push({
            time:['00:00.000'],
            content:'暂无歌词'
        })
    }else{
        let {lrc:{lyric}} = res;
        let {tlyric:{lyric:tl}}=res;
        lyric.replace(/\[(.+)\](.+)/g,(_,time,content)=>{
            arr.push({
                time:time.split(']['),
                content,
            })
        })
        if(tl){
            tl.replace(/\[(.+)\](.+)/g,(_,time,transf)=>{
                let s = arr.find(item=>{
                    return item.time[0] === time
                })
                s['tr'] = transf
            })
        }
    }
    let res1 = []
    arr.forEach(items=>{
        items.time.forEach(item=>{
            let arr = item.split(':')
			let time = parseInt(arr[0])*60 + parseInt(arr[1])
            res1.push({
                time,
                content:items.content,
                tr:items.tr || ''
            })
        })
    })
    res1.sort((a,b)=>{
        return a.time - b.time
    })

    return res1
}
const songInfo = async function(song){
    let songid = song.id
    let {data:{data:[data]}} = await http(`/song/url?id=${songid}`)
    let {data:res} = await http(`/lyric?id=${songid}`)
    
    return{
        ...newInfo(song),
        songurl:data.url||'Null',
        lyric:lyric(res)
    }
}

export default songInfo
