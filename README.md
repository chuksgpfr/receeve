# receeve
This is a lambda function that accepts webhook call, verify and store in Dynamo DB database.

## To build
- run `yarn build` OR `npm run build`

## Add ENV variables to your lambda
  ````
  MAILGUN_SIGNINKEY = 
  TABLE_NAME = webhookDb
  API_VERSION = 2012-08-10
  REGION = us-west-1
  SNS_TOPIC = mailgunWebhook
  ```
