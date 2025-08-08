export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "readerapp": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "readerapp": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "ReaderApp": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "storage": {
    "readerAppContentStorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}