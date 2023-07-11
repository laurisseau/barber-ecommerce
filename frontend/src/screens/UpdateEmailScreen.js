import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpBox from '../components/OtpBox';

export default function UpdateEmailScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const accessToken = userInfo.accessToken;
  const navigate = useNavigate();
  const params = useParams();
  const { encodedEmail } = params;
  const email = atob(encodedEmail);

  const handleSubmit = async (otp) => {
    const otpValue = otp.join('');
    try {
      const { data } = await Axios.post('/api/users/updateEmailVerification', {
        accessToken: accessToken,
        code: otpValue,
      });
      if (data) {
        const existingUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        existingUserInfo.email = email;

        localStorage.setItem('userInfo', JSON.stringify(existingUserInfo));

        navigate('/');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <OtpBox handleSubmit={handleSubmit} email={email} />
    </div>
  );
}
