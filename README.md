# receeve
This is a lambda function that accepts webhook call, verify and store in Dynamo DB database.

## To build
- run `yarn build` OR `npm run build`

## Add ENV variables to your lambda
  ````
  MAILGUN_SIGNINKEY = 559adca8794c99b917de57afc473dd93-1f1bd6a9-e9a649f8
  TABLE_NAME = webhookDb
  API_VERSION = 2012-08-10
  REGION = us-west-1
  SNS_TOPIC = mailgunWebhook
  ```
