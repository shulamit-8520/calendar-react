import React, { useState } from 'react';
import axios from 'axios';
import './loginPage.css'
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import { login } from './UserAPI';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username || !username.trim() || !password) {
      setError('אנא מלא שם משתמש וסיסמה');
      return;
    }
    setError('');
    const user = { 
      userId: username.trim(),
      password: password
    };
    login(user);
  }
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5102";

async function login(user) {
  try {
    const response = await axios.post('/User/Login', user);
    if (response && response.data && response.data.statusCode === 200) {
      localStorage.setItem('userKey', username);
      navigate('/Show', { replace: true });
    } else {
      // show confirmation to navigate to registration
      const goRegister = window.confirm('פרטי המשתמש אינם נכונים. להירשם למשתמש חדש?');
      if (goRegister) {
        navigate('/Register', { replace: false });
      } else {
        setError('פרטי המשתמש אינם נכונים.');
      }
    }
  } catch (e) {
    console.log(e);
    setError('שגיאת רשת - לא מצליח להתחבר לשרת');
  }
}

  const checkUserExists = (username, password) => {
   
 
  }

//   const loadUserEvents = (username) => {
//     const [{ data, loading, error }, refetch] = useAxios(
//         `http://localhost:5102/User/Login`//${user.userId}`
//     )

//  }
// }
// function login(userid,psw) {
//   try {
//       axios.post('http://localhost:5102/User/Login', { userid, psw })
//           .then((response) => {
//               if (response.data.statusCode === 200)
//                   console.log(response);
//           })
//   }
//   catch (error) {
//       console.log(error);
//   }

// }
  return (
    <div className='log'>
      <h1>כניסה למערכת</h1>
      <h4>ע"מ להכנס עליך להכניס את פריטיך האישיים </h4>
      {/* <form onSubmit={handleLogin}> */}
      
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
        //   value={username}
          onBlur={(e) => setUsername(e.target.value)}
          required//שדה חובה
        />
        <br />
        <label htmlFor="password">password:</label>
        <input
          type="password"//מראה נקודות-סיסמה
          id="password"
          
          onBlur={(e) => setPassword(e.target.value)}
          required//שדה חובה
        />
        <br />
        <button type="submit" onClick={handleLogin}>כניסה</button>
            {error && <div className="login-error">{error}</div>}
      {/* </form> */}
    </div>
  );
}

export default LoginPage;

