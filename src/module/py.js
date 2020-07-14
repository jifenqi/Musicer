import { pinyin } from '@/chinese/index.js'

function arraySearch(l1) {
    for (var name in pinyin) {
        if (pinyin[name].indexOf(l1) !== -1) {
            return ucfirst(name)
        }
    }
    return false
}
function ucfirst(l1) {
    return l1.substr(0, 1).toUpperCase()
}

export default (l1) => {
    var val = l1[0]
    var I1 = ''
    var reg = new RegExp('[a-zA-Z0-9]')
    
    var name = arraySearch(val, pinyin)
    if (reg.test(val)) {
        I1 += val
    } else if (name !== false) {
        I1 += name
    }
    return I1
}
    