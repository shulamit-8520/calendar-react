import React, { useState, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage=()=> {
  const [userId, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const FirstNameRef=useRef('')
  const phoneRef=useRef('')
  const emailRef=useRef('')
  const lastNameRef=useRef('')
  const navigate = useNavigate();


async function register(user) {
  try {
// החלף את:
// const response = await axios.post('http://localhost:5102/User/Register', user);
// עם:
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5102";
const response = await axios.post(`${API_URL}/User/Register`, user);
    console.log(response);
    // save user id locally so Show can load correct events
    if (user && user.userId) localStorage.setItem('userKey', user.userId);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await registerUser();
      navigate('/Show', { replace: false });
    } catch (err) {
      alert('הרשמה נכשלה. נסו שוב.');
    }
  }

  const registerUser = async () => {
    const user = {
      userId: userId,
      firstName: FirstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: password,
    };
    await register(user);
  }

  return (
    <div className='reg-container'>
      <div className='reg-card'>
        <h1 className='reg-title'>רישום משתמש חדש</h1>
        <p className='reg-subtitle'>הצטרף אלינו וביניהו את לוח השנה שלך</p>
        
        <form onSubmit={handleRegistration} className='reg-form'>
          <div className='form-group'>
            <label className='form-label'>מזהה משתמש</label>
            <input
              type="text"
              placeholder='הכנס מזהה משתמש'
              id="username"
              className='form-input'
              onBlur={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>שם פרטי</label>
            <input
              type="text"
              placeholder='הכנס שם פרטי'
              ref={FirstNameRef}
              className='form-input'
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>שם משפחה</label>
            <input
              type="text"
              placeholder='הכנס שם משפחה'
              ref={lastNameRef}
              className='form-input'
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>טלפון</label>
            <input
              type="text"
              placeholder='הכנס מספר טלפון'
              ref={phoneRef}
              className='form-input'
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>דוא"ל</label>
            <input
              type="email"
              placeholder='הכנס דוא"ל'
              ref={emailRef}
              className='form-input'
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>סיסמה</label>
            <input
              type="password"
              placeholder='הכנס סיסמה חזקה'
              className='form-input'
              onBlur={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className='reg-button'>הרשמה</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;