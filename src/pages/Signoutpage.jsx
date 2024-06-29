import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAccessToken } from '../utils/Acesstokenslice';
import { clearuserdetail } from '../utils/Userdetailslice';
import Toast from '../components/Toast';

const Signoutpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accessToken.value);
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleSignout();
  }, []);

  const handleSignout = async () => {
    try {
      const response = await fetch('https://backendforcollegesamaj-2.onrender.com/signout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(clearAccessToken());
        dispatch(clearuserdetail());
        setMessage(data.message || 'Successfully signed out');
      } else {
        throw new Error(data.message || 'Error signing out');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toast message={message} type={message.includes('Error') ? 'error' : 'info'} />
    </div>
  );
};

export default Signoutpage;