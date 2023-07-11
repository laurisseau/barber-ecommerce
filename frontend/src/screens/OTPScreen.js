import { useParams } from 'react-router-dom';
//import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpBox from '../components/OtpBox';

export default function OTPScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { jwt } = params;
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const { data } = await axios.get(`/api/users/email/${jwt}`);
        setEmail(data.email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmail();
  }, [jwt]);

  const handleSubmit = async (otp) => {
    const otpValue = otp.join('');
    try {
      const { data } = await Axios.post('/api/users/emailVerification', {
        username: email,
        code: otpValue,
      });

      if (data) {
        navigate(`/signin`);
      }
    } catch (err) {
      console.log(err);
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <OtpBox handleSubmit={handleSubmit} email={email} />
    </div>
  );
}
