import { App, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { SqsSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import path from 'path';
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

export class PubSubStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope,id, props);

        const dlq = new Queue(this, 'dlq', {
            retentionPeriod: Duration.days(1),
        });

        const queue = new Queue(this, 'sqs-queue', {
            deadLetterQueue: {
                queue: dlq,
                maxReceiveCount:1,
            }
        });
        
        const topic = new Topic(this, 'sns-topic');

        topic.addSubscription(new SqsSubscription(queue));

        const sumLambda = new NodejsFunction(this, 'my-lambda', {
            memorySize: 1024,
            timeout: Duration.seconds(5),
            runtime: Runtime.NODEJS_16_X,
            handler: 'main',
            entry: path.join(__dirname, `/../src/sum_lambda/index.ts`),
        });
      
        sumLambda.addEventSource(
            new SqsEventSource(queue, {
                batchSize: 5,
            }),
        );
    }
}