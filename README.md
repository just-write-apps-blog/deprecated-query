# Deprecating AppSync Queries

This is a companion project to the blog post [Deprecating AppSync Queries](https://justwriteapps.com/deprecating-appsync-queries).

To deploy the project, make sure you have the AWS CDK setup on your system--instructions can be found here: https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html

Then it's pretty standard:

```bash
npm i
npm run deploy
```

After the CDK finishes deploying, you'll see a list of outputs that includes the api key and url to use for testing.

## Cleanup

When you're done experimenting, run the following command

```bash
npm run cdk destroy
```

This will remove all resources so you don't get charged for anything!