const fs = require('fs')
const dict = require("./dict.json")
// 创建一个敏感词汇字典
function read_file(file_path){
    var text = fs.readFileSync(file_path)
    var array = text.toString().split('\n')
    return array
}

// 生成敏感词典
function create_dic(dic_array){
    var _object = {}, f = null
    for(let i=0,len=dic_array.length; i<len; i++){
        f = _object
        var line_array = dic_array[i].split(/\s+/g)
        var content = line_array[0] // 词语
        var word_frequency = +line_array[1] // 词频
        var word_property = line_array[2] // 词性
        for(let j=0,_len=content.length; j<_len; j++){
            var word = content[j]
            if(j === _len-1){
                if(!f[word]){
                    // 说明之前没有
                    f[word] = {}
                    f = f[word]
                    f.word_state = true
                    f.word_frequency = word_frequency || 3
                    f.word_property = word_property || "no"
                }
                break
            }
            if(!f[word] || (typeof f[word] === "boolean")){
                f[word] = {}
            }
            f = f[word]
        }
    }
    return _object
}

function create_dic_reset(dic_array){
    var _object = dict, f = null
    for(let i=0,len=dic_array.length; i<len; i++){
        f = _object
        var line_array = dic_array[i].split(/\s+/g)
        var content = line_array[0] // 词语
        var word_frequency = +line_array[1] // 词频
        var word_property = line_array[2] // 词性
        for(let j=0,_len=content.length; j<_len; j++){
            var word = content[j]
            if(j === _len-1){
                if(!f[word]){
                    // 说明之前没有
                    f[word] = {}
                    f = f[word]
                    f.word_state = true
                    f.word_frequency = word_frequency || 3
                    f.word_property = word_property || "no"
                }
                break
            }
            if(!f[word] || (typeof f[word] === "boolean")){
                f[word] = {}
            }
            f = f[word]
        }
    }
    return _object
}

// 将敏感词汇表txt转化成json存放进json文件里面
function save_dic(file_path, save_path){
    var file_path = file_path || "dict.txt"
    var save_path = save_path || "dict.json"
    var dic_array = read_file(file_path)
    var dic_object = create_dic(dic_array)
    fs.writeFileSync(save_path, JSON.stringify(dic_object, null, 5))
    console.log("senstive dictionary is build...")
}

//
function save_extra_dic(extea_file_path, save_path){
    var extea_file_path = extea_file_path || "dict.txt"
    var save_path = save_path || "dict.json"
    var dic_array = read_file(extea_file_path)
    var dic_object = extea_file_path(dic_array)
    fs.writeFileSync(save_path, JSON.stringify(dic_object, null, 5))
    console.log("senstive dictionary is build...")
}

// var file_path = "dict.txt"
// var save_path = "dict.json"
// 创建词典并存储词典
// save_dic(file_path, save_path)

module.exports = {
    save_dic,
    create_dic,
    create_dic_reset,
    save_extra_dic,
    read_file
}


