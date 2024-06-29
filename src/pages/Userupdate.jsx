import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setuserdetail } from '../utils/Userdetailslice';
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

const Userupdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdetail = useSelector((state) => state.userdetail.value);
  const accessToken = useSelector((state) => state.accessToken.value);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    mobileNumber: '',
    occupation: '',
    address: '',
    avatarlink: ''
  });

  const [isAvatarSelectOpen, setIsAvatarSelectOpen] = useState(false);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
    if (userdetail) {
      setFormData({
        firstName: userdetail.first_name || '',
        lastName: userdetail.last_name || '',
        username: userdetail.username || '',
        email: userdetail.email || '',
        mobileNumber: userdetail.mobile_number || '',
        occupation: userdetail.occupation || '',
        address: userdetail.address || '',
        avatarlink: userdetail.avatar_link || ''
      });
    }
  }, [userdetail, accessToken, navigate]);

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

  const formSubmitFunction = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://backendforcollegesamaj-2.onrender.com/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          mobile_number: formData.mobileNumber,
          occupation: formData.occupation,
          address: formData.address,
          avatar_link: formData.avatarlink
        })
      });
      if (!response.ok) { throw new Error('Update failed') };
      const data = await response.json();
      dispatch(setuserdetail({...data, avatar_link: data.avatar_link}));
      setMessage('Profile updated successfully');
      navigate('/user');
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-y-auto custom-scrollbar">
      <Toast message={message} type={message.includes('failed') ? 'error' : 'info'} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Update Profile</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formSubmitFunction} className="space-y-6">
            {['firstName', 'lastName', 'username', 'email', 'mobileNumber', 'occupation', 'address'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-300">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
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
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userupdate;