import { SNSClient, PublishCommand, ListTopicsCommand, ListTagsForResourceCommand } from "@aws-sdk/client-sns";

let topicarn = "" ;
export const handler = async (event) => {
  // TODO implement
  let message = "" ;
  console.log("Dynamo DB straem change") ;
  console.log(event['Records'][0]['dynamodb']) ;
    let newstatus = "*" ;
    if ( 'NewImage' in event['Records'][0]['dynamodb'] ) {
      newstatus = event['Records'][0]['dynamodb']['NewImage']['RESOURCE-STATUS']['S'] ;
    } 
    console.log("New = " + newstatus) ;
    if (newstatus == "PRV" ) {
      message = "Resource provisioned."
    }
    if (newstatus == "TER" ) {
      message = "Resource terminated."
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
        if (itresult['Tags'][itag]['Key'] == 'TopicType' && itresult['Tags'][itag]['Value'] == 'status-email') {
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
