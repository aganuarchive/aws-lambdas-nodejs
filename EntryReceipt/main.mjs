import fs from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

console.log("Start process")

function test() {
    console.log("Test") ;
}

function genFileAsync(shopjson) {

        console.log("in genfile") ;
        fs.open('./shopfile.txt','w', function (err,fd){
            if (err) {
                return console.log(err);
    
            }
    
            fs.write( fd, "0#" 
                + shopjson['shopping']['locationid'] + "#"
                + shopjson['shopping']['shopdate'] + "#"
                + shopjson['shopping']['shopamount'] + "#"
                + shopjson['shopping']['shopdiscount'] + "#"
                , function(err) {
                if (err) {console.log("error in write : " + err) ;}
            });
            fs.write(fd,"\n", function(err) {if (err) {console.log("error in write : " + err) ;}});
            var i=1;
            shopjson['shopping']['items'].forEach(element => {
                console.log(element)     ;       
                fs.write(fd, element + "#" + i++ + "#\n", function(err,element) {console.log("element"); if (err) {return console.log("error in write : " + err) ;}});
            }) ;
    
            fs.close(fd, function(err) { 
                if (err) throw err;
            });
        });
        
        var data = fs.readFileSync('./shopfile.txt') ;
        console.log(data.toString());
        console.log("finished") ;
    }

    function genFileData(shopjson) {

        console.log("in genfile") ;
        fs.open('./shopfile.txt','w', function (err,fd){
            if (err) {
                return console.log(err);
    
            }
    
            fs.write( fd, "0#" 
                + shopjson['shopping']['locationid'] + "#"
                + shopjson['shopping']['shopdate'] + "#"
                + shopjson['shopping']['shopamount'] + "#"
                + shopjson['shopping']['shopdiscount'] + "#"
                , function(err) {
                if (err) {console.log("error in write : " + err) ;}
            });
            fs.write(fd,"\n", function(err) {if (err) {console.log("error in write : " + err) ;}});
            var i=1;
            shopjson['shopping']['items'].forEach(element => {
                console.log(element)     ;       
                fs.write(fd, element + "#" + i++ + "#\n", function(err,element) {console.log("element"); if (err) {return console.log("error in write : " + err) ;}});
            }) ;
    
            fs.close(fd, function(err) { 
                if (err) throw err;
            });
        });
        
        var data = fs.readFileSync('./shopfile.txt') ;
        console.log(data.toString());
        console.log("finished") ;

        return '{"shopping" : {"locationid" : 33, "shopdate" : "2019-03-03", "shopamount" : 3.3, "shopdiscount" : -1.1, "items" : [510,445,208] }}' ;
    }
    
    function genFileSync(shopjson) {

        console.log("in genfile") ;
        const fd = fs.openSync('./shopfile.txt','w') 
    
        fs.writeSync( fd, "0#" 
                + shopjson['shopping']['locationid'] + "#"
                + shopjson['shopping']['shopdate'] + "#"
                + shopjson['shopping']['shopamount'] + "#"
                + shopjson['shopping']['shopdiscount'] + "#");
        fs.writeSync(fd,"\n");
            var i=1;
            shopjson['shopping']['items'].forEach(element => {
                console.log(element)     ;       
                fs.writeSync(fd, element + "#" + i++ + "#\n");
            }) ;
    
            fs.closeSync(fd);

            var data = fs.readFileSync('./shopfile.txt') ;
        console.log(data.toString());
        console.log("finished") ;
    }

function copyToS3(datastr) {
    const client = new S3Client({});

      const command = new PutObjectCommand({
        Bucket: "expjun23store",
        Key: "shopfile.txt",
        Body: datastr
      });
    
      try {
        const response = client.send(command);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
}
var shopdoc = '{"shopping" : {"locationid" : 33, "shopdate" : "2019-03-03", "shopamount" : 3.3, "shopdiscount" : -1.1, "items" : [510,445,208] }}' 
var shopjson = JSON.parse(shopdoc)
console.log(shopjson['shopping']['items'][1] ) 
/*genFileAsync(shopjson) */
var data = genFileData(shopjson) ;
copyToS3(data) ;
