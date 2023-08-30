
const AWS = require("aws-sdk" ) 


exports.formatStr = function(shopjson) {

        console.log(shopjson) ;
    var shopstr = "0#" 
            + shopjson['locationid'] + "#"
            + shopjson['shopdate'] + "#"
            + shopjson['shopamount'] + "#"
            + shopjson['shopdiscount'] + "#" ;
    shopstr += "\n" ;
    console.log(shopstr) ;
        var i=1;
        shopjson['items'].forEach(element => {
            console.log(element)     ;       
            shopstr += element + "#" + i++ + "#\n" ;
        }) ;
    
        console.log("before send") ;

    return shopstr ;
            
}


