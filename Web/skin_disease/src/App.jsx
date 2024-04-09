import React, { useState } from 'react';
import PatientChat from './PatientChat';
import DermatologistChat from './DermatologistChat';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Username: ${username}, Password: ${password}`);
    document.getElementById('login_div').style.display = 'none';
    if (username === 'patient' && password === 'patient') {
      document.getElementById('patientChat').style.display = 'block';
    }
    else if (username === 'dermatologist' && password === 'dermatologist') {
      document.getElementById('dermatologistChat').style.display = 'block';
    }

    else {
      alert('Login failed');
    }

    // Add your submit logic here
  };

  return (
    <div>

      <div id='login_div'>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <button onClick={handleSubmit}>Login</button>
      </div>

      <div id='patientChat' style={{display: 'none'}}>
        <PatientChat />
      </div>

      <div id='dermatologistChat' style={{display: 'none'}}>
        <DermatologistChat />
      </div>

    </div>
  );
}

export default LoginForm;
