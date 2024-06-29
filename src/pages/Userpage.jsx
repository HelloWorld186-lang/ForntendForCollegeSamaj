import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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

const Userpage = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const accessToken = useSelector((state) => state.accessToken.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      fetchProfile();
    } else {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('https://backendforcollegesamaj-2.onrender.com/user', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }
      setProfile(data);
      dispatch(setuserdetail(data));
      setMessage('Profile fetched successfully');
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage(error.message);
    }
  };

  if (!profile) {return <div className='bg-gray-900'></div>};

  console.log(profile);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toast message={message} type={message.includes('Failed') ? 'error' : 'info'} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Your Profile</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <img src={profile.avatar_link} alt="Profile Avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Username : {profile.username}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">First Name : {profile.first_name}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Last Name : {profile.last_name}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Mobile no. : {profile.mobile_number}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Email id : {profile.email}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Occupation : {profile.occupation}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Address : {profile.address}</span>
          </p>
          <div className="mt-6 space-y-4">
            <Link to="/update-profile" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update Profile
            </Link>
            <Link to="/post" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Post Page
            </Link>
            <Link to="/users" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpage;