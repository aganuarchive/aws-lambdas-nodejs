const receipt = require("./receipt.js")

var shopstr = '{"locationid" : 33, "shopdate" : "2019-03-03", "shopamount" : 3.3, "shopdiscount" : -1.1, "items" : [510,445,208] }' ;
var shopjson = JSON.parse(shopstr) ;
const lstr = receipt.formatStr(shopjson) ;
console.log(lstr) ;
