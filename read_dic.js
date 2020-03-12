// const dict = require("./dict.json")
const fs = require("fs")
// 读取json文件获取敏感词典
function read_dic(save_path){
    var text = fs.readFileSync(save_path).toString()
    return JSON.parse(text)
}

// 检测文本是否含有敏感词汇
function checkText(text, dic_object){
    var f = dic_object
    var f_string = ""
    for(let i=0,len=text.length; i<len; i++){
        var word = text[i]
        if(typeof f[word] === "object"){
            f_string += word
            f = f[word]
        }else if(typeof f[word] === "boolean"){
            // 说明是最后一个
            f_string += word
            return f_string
        }else{
            if(i === len-1){
                // 说明是最后一个
                return false
            }
            if(f_string.length <= 1){
                f_string = ""
                f = dic_object
                continue
            }
        }
    }
    return false
}

// var file_path = "senstive.txt"
// var save_path = "dict.json"
// 读取词典

// 进行分词
function cut(text, dict){
    var f = dict
    var cut_array = []
    var f_string = ""
    var orgin = null
    for(let i=0,len=text.length; i<len; i++){
        var word = text[i]
        if(f[word]){
            if(f === dict){
                orgin = i // 记录初始位置
            }
            f = f[word]
            f_string += word
            // 检测词频，一旦词频没有或者词频太低，可以忽略
            if(i === len-1){
                cut_array.push(f_string)
            }
        }else{
            if(f.word_frequency){
                i = i-1
                cut_array.push(f_string)
            }else{
                i = orgin
                var _word = text[i]
                cut_array.push(_word)
            }
            f_string = ""
            f = dict
        }
    }
    return cut_array
}

module.exports = {
    cut,
    checkText,
    read_dic
}