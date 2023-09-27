# How to Use

1. Install the dependencies

```bash
npm install
```

2. Set up correct account and region on `/Users/acquilasantosrocha/Workplace/aws-tutorial/PubSubAws/bin/start-cdk.ts`

3. Create the CDK stack

```bash
npx aws-cdk deploy \
  --outputs-file ./cdk-outputs.json
```

4. Open the AWS CloudFormation Console and the stack should be created in your
   default region

5. Cleanup

```bash
npx aws-cdk destroy
```

6. Invoke lambda with

```bash
aws sns publish \
    --subject "Test" \
    --message "{ \"number1\": 2, \"number2\": 3, \"operation\": \"+\"}" \
    --topic-arn "<GENERATED_TOPIC_ARN>"
```

7. See results in CloudWatch