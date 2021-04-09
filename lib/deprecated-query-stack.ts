import * as cdk from '@aws-cdk/core';
import * as appsync from "@aws-cdk/aws-appsync";
import { join } from 'path';

export class DeprecatedQueryStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, `API`, {
      name: 'deprecation-demo',
      schema: appsync.Schema.fromAsset(join(__dirname, 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        }
      }
    });

    new cdk.CfnOutput(this, `ApiKey`, {
      value: api.apiKey ?? ""
    });

    new cdk.CfnOutput(this, `ApiUrl`, {
      value: api.graphqlUrl
    });

    const demoDS = api.addNoneDataSource(`demoDataSource`, {
      name: "Demo",
      description: "Allows returning of mock data"
    });

    demoDS.createResolver({
      typeName: "Query",
      fieldName: "oldQuery",
      requestMappingTemplate: appsync.MappingTemplate.fromFile(join(__dirname, "mapping-templates", "Query.oldQuery.request.vtl")),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(join(__dirname, "mapping-templates", "Query.oldQuery.response.vtl"))
    });
  }
}
