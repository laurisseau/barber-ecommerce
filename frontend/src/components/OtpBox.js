import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function OtpBox({ handleSubmit, email, choice }) {
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleChange = (e, index) => {
    e.preventDefault();
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus to the previous box on Backspace key press
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        document.getElementById(`otp-box-${index - 1}`).focus();
      }
    }
  };

  const handleKeyUp = (e, index) => {
    // Move focus to the next box on key press
    if (e.target.value !== '' && index !== 5) {
      document.getElementById(`otp-box-${index + 1}`).focus();
    }
  };

  return (
    <Container className="d-flex justify-content-center ">
      <Card className="mt-5 p-3 shadow mb-5">
        <h4>We sent you a code</h4>

        <p className="fw-light">enter it below to verify {email}</p>
        <div className="otp-container">
          {otp.map((value, index) => (
            <input
              id={`otp-box-${index}`}
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              className="otp-input"
            />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="otp-submit "
            type="button"
            onClick={() => handleSubmit(otp)}
          >
            Submit
          </button>
        </div>
      </Card>
    </Container>
  );
}
