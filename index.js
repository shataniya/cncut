const { save_dic, create_dic, create_dic_reset, save_extra_dic, read_file } = require("./create_dic")
const { cut, read_dic } = require("./read_dic")

// 
const path = require("path")
const fs = require("fs")

const __dic_path = path.join(process.cwd(), "node_modules", "cncut", "dict.json")

// 创建一个类用于封装
function cncut(dic){
    var dic = dic || __dic_path
    if(!(this instanceof cncut)){
        return new cncut(dic)
    }
    if(typeof dic === "string"){
        // 说明是一个路径
        this.dic_path = dic
        var ext = path.parse(dic).ext
        var __dic = null
        if(ext === '.json'){
            // 说明是json文件
            __dic = read_dic(dic)
        }
        if(ext === ".txt"){
            // 说明是txt文件
            var array = read_file(dic)
            __dic = create_dic(array)
        }
        this.dict = __dic
    }
    if(typeof dic === "object"){
        // 说明已经是一个字典输了
        this.dict = dic
    }
}

cncut.prototype.add_dic = function(dic){
    if(typeof dic === "string"){
        // 说明是一个路径
        var ext = path.parse(dic).ext
        var __dic = null
        if(ext === ".txt"){
            // 说明是txt文件
            var array = read_file(dic)
            __dic = create_dic_reset(array)
        }
        this.dict = __dic
    }
}

// 
cncut.prototype.cut = function(text){
    var dict = this.dict
    return cut(text, dict)
}

// var cn = cncut()
// cn.add_dic("./extra.txt")
// console.log(cn.cut("我是这个世界上最帅的男人").join("/"))

module.exports = cncut

