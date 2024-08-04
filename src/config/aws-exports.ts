/*
Configuration object for AWS Amplify Authentication
    - userPoolId: ID of the Cognito User Pool
    - userPoolClientId: ID of the Cognito User Pool Client
*/

import { USER_POOL_CLIENT_ID, USER_POOL_ID} from '../utils/constants'

const awsconfig = {
    Auth: {
      Cognito: {
        userPoolClientId: USER_POOL_CLIENT_ID,
        userPoolId: USER_POOL_ID,
      }
    }
  };
  
  export default awsconfig;
  