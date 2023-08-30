const AWS = require("aws-sdk" ) 

module.exports.handler = async (event) => {
    // TODO implement
    console.log(event) ;
    var shopdoc = '{"shopping" : {"locationid" : 33, "shopdate" : "2019-03-03", "shopamount" : 3.3, "shopdiscount" : -1.1, "items" : [510,445,208] }}' ;
    //var shopjson = JSON.parse(event['shopping']);
    var shopjson = event['shopping'] ;
    console.log("shopping") ;
    console.log(shopjson['items'][1] ) ;
    var shopstr = shopdoc ;
    shopstr = formatStr(shopjson) ;
  
          const S3 = new AWS.S3() ;
          console.log("Before putobject 2") ;
          const command = 
              {
              Bucket: "expjun23store",
              Key: "hellos3main.txt",
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
  