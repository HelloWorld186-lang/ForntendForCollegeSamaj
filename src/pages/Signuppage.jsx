import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Emailverification from './Emailverification';
import Toast from '../components/Toast';

import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';
import image11 from '../assets/11.png';
import image12 from '../assets/12.png';
import image13 from '../assets/13.png';
import image14 from '../assets/14.png';
import image15 from '../assets/15.png';
import image16 from '../assets/16.png';
import image17 from '../assets/17.png';
import image18 from '../assets/18.png';
import image19 from '../assets/19.png';
import image20 from '../assets/20.png';

const Signuppage = () => {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    occupation: '',
    address: '',
    avatarlink: ''
  });

  const [isAvatarSelectOpen, setIsAvatarSelectOpen] = useState(false);

  const avatarOptions = [
    { value: image1, label: 'Avatar 1' },
    { value: image2, label: 'Avatar 2' },
    { value: image3, label: 'Avatar 3' },
    { value: image4, label: 'Avatar 4' },
    { value: image5, label: 'Avatar 5' },
    { value: image6, label: 'Avatar 6' },
    { value: image7, label: 'Avatar 7' },
    { value: image8, label: 'Avatar 8' },
    { value: image9, label: 'Avatar 9' },
    { value: image10, label: 'Avatar 10' },
    { value: image11, label: 'Avatar 11' },
    { value: image12, label: 'Avatar 12' },
    { value: image13, label: 'Avatar 13' },
    { value: image14, label: 'Avatar 14' },
    { value: image15, label: 'Avatar 15' },
    { value: image16, label: 'Avatar 16' },
    { value: image17, label: 'Avatar 17' },
    { value: image18, label: 'Avatar 18' },
    { value: image19, label: 'Avatar 19' },
    { value: image20, label: 'Avatar 20' }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleAvatarSelect = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatarlink: value
    }));
    setIsAvatarSelectOpen(false);
  };

  const handleVerificationComplete = (email) => {
    setIsEmailVerified(true);
    setVerifiedEmail(email);
    setFormData(prevData => ({ ...prevData, email }));
    setMessage('Email verified successfully');
  };

  const formSubmitFunction = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://backendforcollegesamaj-2.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobile_number: formData.mobileNumber,
          occupation: formData.occupation,
          address: formData.address,
          avatar_link: formData.avatarlink
        })
      });
      if (!response.ok) { 
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign up failed');
      }
      setMessage('Sign up successful! Redirecting to sign in...');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

  if (!isEmailVerified) {
    return <Emailverification onVerificationComplete={handleVerificationComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-y-auto custom-scrollbar">
      <Toast message={message} type={message.includes('successful') ? 'info' : 'error'} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Complete Sign Up</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formSubmitFunction} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={verifiedEmail}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                readOnly
              />
            </div>
            {['firstName', 'lastName', 'username', 'password', 'mobileNumber', 'occupation', 'address'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-300">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                  required
                />
              </div>
            ))}
            <div>
              <label htmlFor="avatarlink" className="block text-sm font-medium text-gray-300">Avatar</label>
              <div className="relative mt-1">
                <div
                  className="block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white cursor-pointer"
                  onClick={() => setIsAvatarSelectOpen(!isAvatarSelectOpen)}
                >
                  {formData.avatarlink ? (
                    <>
                      <img src={formData.avatarlink} alt="Selected Avatar" className="w-8 h-8 inline-block mr-2" />
                      <span>{avatarOptions.find(option => option.value === formData.avatarlink)?.label || 'Custom Avatar'}</span>
                    </>
                  ) : (
                    <span>Select an avatar</span>
                  )}
                </div>
                {isAvatarSelectOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
                    <div className="py-1">
                      {avatarOptions.map((option) => (
                        <div
                          key={option.label}
                          className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center"
                          onClick={() => handleAvatarSelect(option.value)}
                        >
                          <img src={option.value} alt={option.label} className="w-8 h-8 mr-2" />
                          <span className="text-white">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Complete Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signuppage;