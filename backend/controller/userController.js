import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, decode } from '../utils.js';
import AWS from 'aws-sdk';
//import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
//import fetch from 'node-fetch/esm'

const poolData = {
  UserPoolId: 'us-east-1_FXpZlVYPc',
  ClientId: '4qqed9a375uh0mpgsmjphjbe09',
};

const userPool = new CognitoUserPool(poolData);

export const signup = expressAsyncHandler(async (req, res) => {
  const attributeList = [];
  const emailToken = generateToken({email: req.body.email})

  const dataEmail = {
    Name: 'email',
    Value: req.body.email, // Replace with the user's email
  };

  const dataUsername = {
    Name: 'preferred_username',
    Value: req.body.username, // Replace with the user's username
  };

  const dataJwt = {
    Name: 'custom:jwt',
    Value: emailToken ,
  };

  const dataLink = {
    Name: 'custom:link',
    Value: `${req.protocol}://${req.get("x-forwarded-host")}/otp/${emailToken}`
  }

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeUsername = new CognitoUserAttribute(dataUsername);
  const attributeJwt = new CognitoUserAttribute(dataJwt);
  const attributeLink = new CognitoUserAttribute(dataLink)

  attributeList.push(attributeEmail);
  attributeList.push(attributeUsername);
  attributeList.push(attributeJwt);
  attributeList.push(attributeLink)

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

      // Find the CognitoUserAttribute with the 'custom:jwt' Name
      const customJwtAttribute = attributeList.find(
        (attribute) => attribute.Name === 'custom:jwt'
      );

      // Get the value of the 'custom:jwt' attribute
      const customJwtValue = customJwtAttribute
        ? customJwtAttribute.Value
        : null;

      res.send({
        email: user,
        token: customJwtValue,
      });
    }
  );
});

export const decodeJwtToVerify = expressAsyncHandler(async (req, res) => {
  const email = decode(req.params.id);

  res.send({email: email });
});

export const emailVerification = expressAsyncHandler(async (req, res) => {});


console.log('hi')
