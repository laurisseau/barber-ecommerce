import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, decode } from '../utils.js';
import pkg from 'aws-sdk';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const { CognitoIdentityServiceProvider } = pkg;

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

const cognito = new CognitoIdentityServiceProvider({ region: 'us-east-1' });

export const signup = expressAsyncHandler(async (req, res) => {
  const attributeList = [];
  const emailToken = generateToken({ email: req.body.email });

  const dataEmail = {
    Name: 'email',
    Value: req.body.email, // Replace with the user's email
  };

  const dataUsername = {
    Name: 'preferred_username',
    Value: req.body.username, // Replace with the user's username
  };

  const dataWebsite = {
    Name: 'custom:website',
    Value: `${req.protocol}://${req.get('x-forwarded-host')}`,
  };

  const dataLink = {
    Name: 'custom:link',
    Value: `${req.protocol}://${req.get(
      'x-forwarded-host'
    )}/signup/otp/${emailToken}`,
  };

  const dataRole = {
    Name: 'custom:role',
    Value: 'user',
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeUsername = new CognitoUserAttribute(dataUsername);
  const attributeLink = new CognitoUserAttribute(dataLink);
  const attributeRole = new CognitoUserAttribute(dataRole);
  const attributeWebsite = new CognitoUserAttribute(dataWebsite);

  attributeList.push(attributeEmail);
  attributeList.push(attributeUsername);
  attributeList.push(attributeLink);
  attributeList.push(attributeRole);
  attributeList.push(attributeWebsite);

  userPool.signUp(
    req.body.email,
    req.body.password,
    attributeList,
    null,
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      const cognitoUser = result.user;
      const user = cognitoUser.getUsername();

      res.send({
        email: user,
        url: `${req.protocol}://${req.get(
          'x-forwarded-host'
        )}/otp/${emailToken}`,
        token: emailToken,
      });
    }
  );
});

export const decodeJwtToVerify = expressAsyncHandler(async (req, res) => {
  const decoded = decode(req.params.id);

  res.send({ email: decoded.email });
});

export const emailVerification = expressAsyncHandler(async (req, res) => {
  const params = {
    ConfirmationCode: req.body.code,
    Username: req.body.username,
    ClientId: process.env.CLIENT_ID,
  };

  await cognito.confirmSignUp(params).promise();
  res.send('User email confirmed successfully.');
});

export const login = expressAsyncHandler(async (req, res) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: req.body.username,
      PASSWORD: req.body.password,
    },
  };

  const data = await cognito.initiateAuth(params).promise();
  const idToken = data.AuthenticationResult.IdToken;
  const accessToken = data.AuthenticationResult.AccessToken;

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: 'id',
    clientId: process.env.CLIENT_ID,
  });

  const payload = await verifier.verify(idToken);

  payload['token'] = idToken;
  payload['accessToken'] = accessToken;

  res.send(payload);
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const attributeList = [
    {
      Name: 'email',
      Value: req.body.email,
    },
    {
      Name: 'preferred_username',
      Value: req.body.username,
    },
  ];

  const params = {
    UserAttributes: attributeList,
    AccessToken: req.body.accessToken,
  };

  cognito.updateUserAttributes(params, (err, data) => {
    if (err) {
      console.error('Failed to update user attributes:', err);
      res.send('Failed to update user attributes');
    } else {
      console.log('User attributes updated successfully:', data);
      res.send({ email: req.body.email, username: req.body.username });
    }
  });
  // refactor this code
  /*
  const updatedUser = await cognito.updateUserAttributes(params);
  res.send(updatedUser)
*/
});

export const updatedEmailVerification = expressAsyncHandler(
  async (req, res) => {
    const params = {
      AccessToken: req.body.accessToken,
      AttributeName: 'email',
      Code: req.body.code,
    };

    const result = await cognito.verifyUserAttribute(params).promise();
    res.send('User email confirmed successfully.');
    console.log(result);
  }
);

export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const userData = {
    Username: req.body.email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.forgotPassword({
    onSuccess: () => {
      console.log('Password reset code sent successfully');
      res.send('Password reset code sent successfully');
    },
    onFailure: (err) => {
      console.error('Failed to send password reset code:', err);
      res.status(400).send('Failed to send password reset code');
    },
  });
});


export const resetPassword = expressAsyncHandler(async (req, res) => {

  const obj = decode(req.params.token);

  console.log(obj)
  res.send(obj)
/*
  const code = '123'
  const email = 'email'

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmPassword(code, req.body.newPassword, {
    onSuccess: () => {
      console.log('Password reset confirmed successfully');
      res.send('Password reset confirmed successfully');
    },
    onFailure: (err) => {
      console.error('Failed to confirm password reset:', err);
      res.status(400).send('Failed to confirm password reset');
    },
  });
  */
});