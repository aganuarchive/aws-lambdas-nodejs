import { SNSClient, PublishCommand, ListTopicsCommand, ListTagsForResourceCommand } from "@aws-sdk/client-sns";

let topicarn = "" ;
export const handler = async (event) => {
  // TODO implement
  let message = "" ;
  console.log("Dynamo DB straem change") ;
  console.log(event['Records'][0]['dynamodb']) ;
  if (event['Records'][0]['dynamodb']['Keys']['FLAGNAME']['S'] == 'RDSIMPORT') {
    const oldstatus = event['Records'][0]['dynamodb']['OldImage']['STATUS']['S'] ;
    const newstatus = event['Records'][0]['dynamodb']['NewImage']['STATUS']['S'] ;
    console.log("Old = " + oldstatus) ;
    console.log("New = " + newstatus) ;
    if (newstatus == "IMPORTSTARTED" && oldstatus != "IMPORTSTARTED") {
      message = "RDS import started."
    }
    if (newstatus == "IMPORTDONE" && oldstatus != "IMPORTDONE") {
      message = "RDS import done."
    }
  }
  const client = new SNSClient() ;
    const ilist = {} ;
    const listcom = new ListTopicsCommand() ;
    const result2 = await client.send(listcom) ;
    console.log(result2['Topics']) ;
    for (const topic in result2['Topics']) {
      console.log(result2['Topics'][topic]) ;
      const itopic = {"ResourceArn" : result2['Topics'][topic]['TopicArn'] };
      const itcom = new ListTagsForResourceCommand(itopic) ;
      const itresult = await client.send(itcom ) ;
      console.log(itresult) ;
      for ( let itag in itresult['Tags']) {
        if (itresult['Tags'][itag]['Key'] == 'TopicType' && itresult['Tags'][itag]['Value'] == 'rds-status-email') {
          topicarn = result2['Topics'][topic]['TopicArn'] ;
        }
        
      }
    }
  console.log("Message -> " + message) ;
  if (message != "") {

    console.log("Sending SNS") ;
    const input = {"TopicArn" : topicarn, "Message" : message} ;
    console.log(input) ;
    const command = new PublishCommand(input) ;
    const result = await client.send(command) ;
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
