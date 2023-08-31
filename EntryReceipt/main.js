const receipt = require("./receipt.js")
const handler = require("./entryreceipt_handler.js")

var shopstr = {body: '{ "shopping": {"locationid": 33, "shopdate": "2019-03-03", "shopamount": 3.3, "shopdiscount": -1.1, "items": [ 510, 445, 208 ]}}'} ;
//var shopjson = JSON.parse(shopstr) ;
handler.handler(shopstr).then( () => {console.log("done");}) ;
//const lstr = receipt.formatStr(shopjson) ;
//console.log(lstr) ;
