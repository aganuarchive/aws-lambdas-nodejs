const AWS = require("aws-sdk" ) 
const receipt = require("./receipt.js")

module.exports.handler = async (event) => {
    console.log(event.body) ;
    var tmps= event.body ;
    console.log("input") ;
    //var shopdoc = JSON.parse(tmps);
    //console.log("shopdoc") ;
    //console.log(shopdoc) ;
    //var shopjson = shopdoc['shopping'] ;
    //var shopstr = shopdoc ;
    //shopstr = receipt.formatStr(shopjson) ;
    var shopstr = receipt.formatStr(tmps) ;
    var filename = receipt.formatTime() ;
    console.log(filename) ;
          const S3 = new AWS.S3() ;
          console.log("Before putobject 2") ;
          const command = 
              {
              Bucket: "expjun23store",
              Key: "Shopping-" + filename + ".txt",
              Body: shopstr,
              ContentType : "application/text"
          }
          ;
          await S3.putObject(command).promise() ;
          ;
  
  
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
  };
  
  