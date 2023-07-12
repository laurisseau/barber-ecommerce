const handleJWTError = () => {
  const message = 'invalid token please login again';
  return message;
};
const handleJWTExpired = () => {
  const message = 'your session has expired. Please login again';
  return message;
};
const handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}.`;
  return message;
};

const handleDuplicateFieldsDB = (err) => {
  const keyObj = err.keyValue;
  const message = `${Object.keys(keyObj)} is already in use`;
  return message;
};

const awsDuplicateFields = () => {
  const message = 'An account with the given email already exists.';
  return message;
};

const awsValidation = (err) => {
  const errorMessage = err.message;
  const messageArr = errorMessage.split(': ');
  const message = messageArr[1];
  return message;
};

const handleValidatorErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  // to loop through errors.
  // object.values() runs the givin array
  // .map can only be used on arrays and takes only functions to give
  // back a new array with what the function does
  const message = `${errors.join('. ')}`;
  //console.log(message)

  //return appError(message, 400);
  return message;
};

const prodErrors = (err, req, res, next) => {
  console.log(err);
  return res.status(404).send({ message: err });
};

const devErrors = (err, req, res) => {
  console.log(err);
  return res.status(500).send({ message: err.stack });
};

export const errorController = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    devErrors(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // mongodb

    if (err.name === 'ValidationError') error = handleValidatorErrorDB(err);

    if (err.name === 'CastError') error = handleCastErrorDB(err);

    if (err.name === 'JsonWebTokenError') error = handleJWTError();

    if (err.name === 'TokenExpiredError') error = handleJWTExpired();

    if (err.code === 11000) error = handleDuplicateFieldsDB(err);

    //aws

    const jwtErrorMessage = err.message.split(' ');
    const errorCode = jwtErrorMessage[0] + ' ' + jwtErrorMessage[1];

    if (err.code === 'UsernameExistsException') {
      error = awsDuplicateFields();
    } else if (err.code === 'InvalidPasswordException') {
      error = awsValidation(err);
    } else if (errorCode === 'Token expired') {
      error = handleJWTExpired();
    } else {
      error = err.message;
    }

    prodErrors(error, req, res);
  }
};
