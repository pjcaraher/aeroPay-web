import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

const POOLDATA = {
  UserPoolId: 'us-east-1_nhF9sTRVD', // Your user pool id here
  ClientId: '3drob3qfmheloo0790eobjgc5g' // Your client id here
}

export function awsRegister ({email, password}) {
  const poolData = POOLDATA
  const userPool = new CognitoUserPool(poolData)

  const attributeList = []

  const dataEmail = {
    Name: 'email',
    Value: email
  }

  const attributeEmail = new CognitoUserAttribute(dataEmail)
  // const attributeUsername = new CognitoUserAttribute(dataUserName)
  attributeList.push(attributeEmail)
  // attributeList.push(attributeUsername)
  return new Promise((resolve, reject) =>
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err)
      } else {
        let cognitoUser = result.user
        resolve(cognitoUser)
      }
    })
  )
}

export function awsAuthenticate ({email, password}) {
  const poolData = POOLDATA
  // create user pool
  const userPool = new CognitoUserPool(poolData)
  const userData = {
    Username: email,
    Pool: userPool
  }
  const cognitoUser = new CognitoUser(userData)
  // user authentications
  const authenticationData = {
    // Username: '20160627test04@test.com',
    // Password: 'password'
    Username: email,
    Password: password
  }
  const authenticationDetails = new AuthenticationDetails(authenticationData)
  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        // console.log(result)
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken()
        })
      },
      onFailure: err => reject(err)
    })
  )
}