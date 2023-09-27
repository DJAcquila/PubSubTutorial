/* eslint-disable @typescript-eslint/require-await */
import {APIGatewayProxyResultV2, SQSEvent} from 'aws-lambda';

interface EventMessage {
    number1: number;
    number2: number;
    operation: string;
}

export async function main(event: SQSEvent): Promise<APIGatewayProxyResultV2> {
  // console.log('event 👉', JSON.stringify(event, null, 2));

  // throw new Error('throwing an Error 💥');

  const messages = event.Records.map(record => {
    const body = JSON.parse(record.body) as {Subject: string; Message: string};

    let eventMessage: EventMessage = JSON.parse(body.Message);
    
    console.log("Event message ", eventMessage)

    let result;
    switch (eventMessage.operation) {
        case "+":
        case "add":
            result = eventMessage.number1 + eventMessage.number2;
            break;
        case "-":
        case "sub":
            result = eventMessage.number1 - eventMessage.number2;
            break;
        case "*":
        case "mul":
            result = eventMessage.number1 * eventMessage.number2;
            break;
        case "/":
        case "div":
          if (eventMessage.number2 == 0) {
                return {
                    body: "Wrong input! Cannot divide by 0",
                    statusCode: 400,
                };
          } else {
            result = eventMessage.number1 * eventMessage.number2;
          }
          break;
        default:
            return {
                body: "Wrong input! Invalid operator",
                statusCode: 400,
            };
      }

    return {subject: body.Subject, eventMessage: eventMessage, result: result};
  });


  console.log('messages 👉', JSON.stringify(messages, null, 2));
  messages.forEach(message => {
    const output: string = [message.eventMessage?.number1, message.eventMessage?.number2].join(message.eventMessage?.operation)
    console.log(output + '=' + message.result);
  })
  

  return {
    body: JSON.stringify({messages}),
    statusCode: 200,
  };
}