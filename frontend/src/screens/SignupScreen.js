import { useLocation, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordArr = password.split('');
  const upperCaseArr = password.toUpperCase().split('');
  const lowerCaseArr = password.toLowerCase().split('');

  const filterLower = (lowerCaseArr) => {
    return lowerCaseArr.filter((char) => /[a-zA-Z]/.test(char));
  };

  const filterUpper = (upperCaseArr) => {
    return upperCaseArr.filter((char) => /[a-zA-Z]/.test(char));
  };

  const upperCaseArrResult = filterUpper(upperCaseArr);
  const lowerCaseArrResult = filterLower(lowerCaseArr);

  const [numVerification, setNumVerification] = useState('');
  const [findSpecialCharacters, setFindSpecialCharacters] = useState('');
  const [findUpperCase, setFindUpperCase] = useState('');
  const [findLowerCase, setFindLowerCase] = useState('');
  const [numOfCharacters, setNumOfCharacters] = useState('');

  useEffect(() => {
    const integerArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialCharacters = '~!@#$%^&*()_-+=[{]}|\\:;<>,.?/\'"';
    const specialCharactersArr = specialCharacters.split('');

    const findIntegers = passwordArr.find((e) => integerArr.includes(e));
    const findSpecialCharacters = passwordArr.find((e) =>
      specialCharactersArr.includes(e)
    );
    const findUpperCaseCharcters = passwordArr.find((e) =>
      upperCaseArrResult.includes(e)
    );

    const findLowerCaseCharcters = passwordArr.find((e) =>
      lowerCaseArrResult.includes(e)
    );

    const getClassBasedOnCondition = (condition) => {
      return condition ? 'text-success' : 'text-danger';
    };

    setNumVerification(getClassBasedOnCondition(findIntegers));
    setFindSpecialCharacters(getClassBasedOnCondition(findSpecialCharacters));
    setFindUpperCase(getClassBasedOnCondition(findUpperCaseCharcters));
    setFindLowerCase(getClassBasedOnCondition(findLowerCaseCharcters));
    setNumOfCharacters(getClassBasedOnCondition(password.length >= 8));
  }, [
    passwordArr,
    password,
    findUpperCase,
    upperCaseArr,
    lowerCaseArr,
    upperCaseArrResult,
    lowerCaseArrResult,
  ]);

  const { state } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        username,
        email,
        password,
      });
      navigate(`otp/${data.token}`);
    } catch (err) {
      //console.log(err);
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mt-3 mb-3">
          <div className={numOfCharacters}>
            Password must be at least 8 characters long.
          </div>
          <div className={findUpperCase}>
            password must have an uppercase character.
          </div>
          <div className={findLowerCase}>
            password must have a lowercase character.
          </div>
          <div className={findSpecialCharacters}>
            Password must have special characters.
          </div>
          <div className={numVerification}>Password must have numbers.</div>
        </div>

        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}
