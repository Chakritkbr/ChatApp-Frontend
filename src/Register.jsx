import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext.jsx';

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        isLoginOrRegister === 'register'
          ? `/api/v1/auth/register`
          : `/api/v1/auth/login`;
      const { data } = await axios.post(
        url,
        // { withCredentials: true },
        {
          username,
          password,
        }
      );
      setLoggedInUsername(username);
      setId(data.id);

      if (data && data.success) {
        console.log(data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-blue-50 h-screen flex items-center '>
      <form className='w-64 mx-auto mb-12' onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type='text'
          placeholder='username'
          className='block w-full rounded-sm p-2 mb-2 border'
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type='password'
          placeholder='password'
          className='block w-full rounded-sm p-2 mb-2 border'
        />
        <button className='bg-blue-500 text-white block w-full rounded-sm p-2'>
          {isLoginOrRegister === 'register' ? 'Register' : 'Login '}
        </button>
        <div className='text-center mt-2'>
          {isLoginOrRegister === 'register' && (
            <div className=''>
              Already a member?
              <button
                className='ml-1'
                onClick={() => setIsLoginOrRegister('login')}
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div className=''>
              Dont have an account?
              <button
                className='ml-1'
                onClick={() => setIsLoginOrRegister('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLoginForm;
