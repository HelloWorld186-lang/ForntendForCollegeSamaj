import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Postcard from '../components/Postcard';
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

const Userpostpage = () => {
  const [posts, setPosts] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [message, setMessage] = useState('');
  const accessToken = useSelector((state) => state.accessToken.value);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && userId) {
      fetchUserPosts();
    } else {
      navigate('/');
    }
  }, [accessToken, userId, navigate]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`https://backendforcollegesamaj-2.onrender.com/user/${userId}/posts`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user posts');
      }
      setPosts(data.posts);
      setUserDetail(data.userdetail);
      setMessage('User posts fetched successfully');
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Toast message={message} type={message.includes('Failed') ? 'error' : 'info'} />
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">User Profile</h2>
          <img src={userDetail.avatar_link} alt="" className="w-32 h-32 rounded-full mx-auto mb-4"/>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Username : {userDetail.username}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">First Name : {userDetail.first_name}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Last Name : {userDetail.last_name}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Mobile no. : {userDetail.mobile_number}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Email id : {userDetail.email}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Occupation : {userDetail.occupation}</span>
          </p>
          <p className="mb-2 text-gray-300">
              <span className="font-semibold">Address : {userDetail.address}</span>
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white">Posts by User</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <Postcard key={post.id} post={post} fetchPosts={fetchUserPosts} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userpostpage;