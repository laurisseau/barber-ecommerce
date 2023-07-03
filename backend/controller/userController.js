import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';
import AWS from 'aws-sdk';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
//import fetch from 'node-fetch/esm'

const poolData = {
  UserPoolId: 'us-east-1_FXpZlVYPc',
  ClientId: '4qqed9a375uh0mpgsmjphjbe09',
};

const userPool = new CognitoUserPool(poolData);

export const signup = expressAsyncHandler(async (req, res) => {
  const attributeList = [];
  const dataEmail = {
    Name: 'email',
    Value: req.body.email, // Replace with the user's email
  };

  const dataUsername = {
    Name: 'preferred_username',
    Value: req.body.username, // Replace with the user's username
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeUsername = new CognitoUserAttribute(dataUsername);

  attributeList.push(attributeEmail);
  attributeList.push(attributeUsername);

  userPool.signUp(
    req.body.email,
    req.body.password,
    attributeList,
    null,
    (err, result) => {
      if (err) {
        res.send(err);
      }
      const cognitoUser = result.user;
      const user = cognitoUser.getUsername();
      res.send({
        email: user,
        token: generateToken(user),
      });
    }
  );
});
