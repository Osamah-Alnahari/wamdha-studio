"use client";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import devConfig from "./aws-exports";

// Production config
const prodConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION,
  aws_appsync_authenticationType: process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATIONTYPE,
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_AWS_APPSYNC_APIKEY,
  aws_user_files_s3_bucket: process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET,
  aws_user_files_s3_bucket_region: process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET_REGION,
};

// set the config based on the environment
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
Amplify.configure(config);
const client = generateClient();
