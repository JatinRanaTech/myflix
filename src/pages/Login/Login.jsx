import React, { useState } from 'react';
import './Login.css';
import Logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      console.error("Authentication Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    if (showLogin) {
      setShowLogin(false);
      setSignState('Sign Up');
    } else {
      setShowLogin(true);
      setSignState('Sign In');
    }
  };

  return (
    loading ? (
      <div className='login-spinner'>
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className='login'>
        
        <img src={Logo} className='login-logo' alt='logo' />
        <div className='login-form'>
          <h1>{signState}</h1>
          <form>
            {!showLogin && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='Your Name'
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
            <input
              onClick={user_auth}
              type='submit'
              value={signState}
            />
            <div className='form-help'>
              <div className='remember'>
                <input type='checkbox' />
                <label>Remember&nbsp;&nbsp;Me</label>
              </div>
              <p>Need Help?</p>
            </div>
            <div className='account'>
              {showLogin ? (
                <>
                  <p>New to Netflix?</p>
                  <a href='#' onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}>Sign Up Now</a>
                </>
              ) : (
                <>
                  <p>Already have an account?</p>
                  <a href='#' onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}>Sign In Now</a>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Login;
