import {
  CognitoUserPool,
  CognitoUserAttribute,
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

  const dataLink = {
    Name: 'custom:link',
    Value: `${req.protocol}://${req.get('x-forwarded-host')}/otp/${emailToken}`,
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeUsername = new CognitoUserAttribute(dataUsername);
  const attributeLink = new CognitoUserAttribute(dataLink);

  attributeList.push(attributeEmail);
  attributeList.push(attributeUsername);
  attributeList.push(attributeLink);

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
        url: `${req.protocol}://${req.get('x-forwarded-host')}/otp/${emailToken}`
      });
    }
  );
});

export const decodeJwtToVerify = expressAsyncHandler(async (req, res) => {
  const email = decode(req.params.id);

  res.send({ email: email });
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

  payload['token'] = accessToken;

  res.send(payload);
});
