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
      "HostedUIDomain": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "OAuthMetadata": "string",
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