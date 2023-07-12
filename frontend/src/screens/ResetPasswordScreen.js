import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import OtpBox from '../components/OtpBox';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  let [slideNum, setSlideNum] = useState(0);
  let slideMax = 1;

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const { data } = await Axios.get(`/api/users/email/${token}`);
        setEmail(data.email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmail();
  }, [token]);

  const nextSlide = async (otp) => {
    const otpValue = otp.join('');
    setCode(otpValue);

    setSlideNum(
      slideNum >= slideMax ? (slideNum = 1) : (slideNum = slideNum + 1)
    );
  };

  const prevSlide = async () => {
    setSlideNum(
      slideNum <= slideMax ? (slideNum = 0) : (slideNum = slideNum - 1)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      console.log('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.patch(`/api/users/resetPassword/${token}`, {
        code,
        newPassword,
      });
      if (data) {
        navigate(`/signin`);
      }
    } catch (err) {
      //console.log(err);
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>reset password</title>
      </Helmet>
      <h1 className="my-3">Reset password</h1>
      <Form onSubmit={submitHandler}>
        {slideNum === 0 ? (
          <OtpBox handleSubmit={nextSlide} email={email} />
        ) : (
          <Container className="d-flex justify-content-center ">
            <Card className="mt-5 p-3 shadow mb-5">
              <h4>Reset your password</h4>
              <div className="reset-otp-container mt-1">
                <Form.Group
                  className="mb-3 otp-reset-input"
                  controlId="newPassword"
                >
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 otp-reset-input"
                  controlId="confirmNewPassword"
                >
                  <Form.Label>Confirm new password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="otp-submit me-5"
                  type="button"
                  onClick={prevSlide}
                >
                  previous
                </button>

                <button className="otp-submit " type="submit">
                  Reset password
                </button>
              </div>
            </Card>
          </Container>
        )}
      </Form>
    </Container>
  );
}
