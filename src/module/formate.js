const author = function(item){
    if(item.athor) return item.athor
    let author=''
    let arr = item.artists || item.ar;
    arr.forEach(items=>{
        author=author+ (author && '/') +items.name
    })
    return author
}

const songName = function (item){
  if(item.albName)return item.albName
  return item.album?item.album.name: item.al.name
}

const picUrl = function(item){
    if(item.picUrl)return item.picUrl
    if(item.album){
        return item.album.picUrl || 'Null'
    }else{
        return item.al.picUrl || 'Null'
    }
}

const newInfo = function(item){
    return{
        name:item.name,
        id:item.id,
        athor:author(item),
        albName:songName(item),
        picUrl:picUrl(item),
        fee:item.fee
    }
}

const newList = function(arr){
    let newList=[];
    arr.forEach(item=>{
        newList.push(newInfo(item))
    })
    return newList
}
export {author, songName, newList,newInfo}