
const AWS = require("aws-sdk" ) 

exports.formatStr = function(shopbody) {

  var shopdoc = JSON.parse(shopbody);
  //var shopdoc = shopbody;
  console.log("shopdoc") ;
  console.log(shopdoc) ;
  var shopjson = shopdoc['shopping'] ;
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

const formatData = (input) => {
  if (input > 9) {
    return input;
  } else return `0${input}`;
};

exports.formatTime = function() {
  var date = new Date() ;
  var dd = formatData(date.getDate()) ;
  var mm = formatData(date.getMonth() + 1) ;
  var yyyy = date.getFullYear() ;
  var HH = formatData(date.getHours()) ;
  var MM = formatData(date.getMinutes()) ;
  var SS = formatData(date.getSeconds()) ;

  return `${dd}${mm}${yyyy}-${HH}${MM}${SS}`;
};

