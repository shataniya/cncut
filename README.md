# cncut
### Chinese word segmentation tool based on javascript【基于javascript的中文分词工具】
```javascript
// npm
npm i cncut

// yarn 
yarn add cncut
```
```javascript
const cncut = require("cncut")
const cn = cncut()
var text = "我是这个世界上最帅的男人"
console.log(cn.cut(text).join("/"))

// result：
我/是/这个/世界/上/最/帅/的/男人
```
