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
    Value: 'reso',
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeUsername = new CognitoUserAttribute(dataUsername);
  const attributeJwt = new CognitoUserAttribute(dataJwt);

  attributeList.push(attributeEmail);
  attributeList.push(attributeUsername);
  attributeList.push(attributeJwt);

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
        token: generateToken({ email: user }),
      });
    }
  );
});

export const decodeJwtToVerify = expressAsyncHandler(async (req, res) => {
  const email = decode(req.params.id);

  res.send({ email });
});

export const emailVerification = expressAsyncHandler(async (req, res) => {});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlc28wMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY4ODQ1NjAzMCwiZXhwIjoxNjkxMDQ4MDMwfQ.6rL45Ov1_opQLC4IVCnleZdaHfcXbAvMDiL4GlSVwxo

const att = () => {};
