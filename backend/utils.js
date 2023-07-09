import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

export const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_USER_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const decode = (emailToken) => {
  const decoded = jwt.verify(emailToken, process.env.JWT_USER_SECRET);
  const email = decoded.email;
  return email;
};

/*

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

    jwt.verify(token, process.env.JWT_USER_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;

        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};


*/

export const isAuth = expressAsyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.USER_POOL_ID,
      tokenUse: 'id',
      clientId: process.env.CLIENT_ID,
    });

    await verifier.verify(token)

  }
  next()
});
