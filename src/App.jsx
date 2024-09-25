import React, { useState } from 'react';
import axios from 'axios';

const OtpForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Handle sending the phone number and country code
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.carbyk.com/api/user/sendLoginOTP', {
        phoneNumber: phone,
        phoneCountryCode: countryCode,
      });

      console.log('OTP sent:', response.data);
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Handle verifying OTP and receiving the token
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.carbyk.com/api/user/verifyOtp', {
        phoneCountryCode: countryCode,
        phoneNumber: phone,
        name: name,         
        otp: otp,
      });
      console.log(name + "" + phone+ "" + countryCode + otp)

      // Storing the token in localStorage
      localStorage.setItem('authToken', response.data.token);
      console.log('Token received and saved to localStorage:', response.data.token);

      // Show token in an alert
      alert(`Token: ${response.data.token}`);

    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <div>
            <label>Country Code</label>
            <input
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div>
            <label>Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default OtpForm;
