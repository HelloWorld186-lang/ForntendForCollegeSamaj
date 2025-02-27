import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

const Postpage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [message, setMessage] = useState('');
  const accessToken = useSelector((state) => state.accessToken.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      fetchPosts();
    } else {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://backendforcollegesamaj-2.onrender.com/post', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch posts');
      }
      setPosts(data);
      setMessage('Posts fetched successfully');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setMessage(error.message);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backendforcollegesamaj-2.onrender.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ post_text: newPostText })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }
      setNewPostText('');
      await fetchPosts();
      setMessage('Post created successfully');
    } catch (error) {
      console.error('Failed to create post:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Toast message={message} type={message.includes('Failed') ? 'error' : 'info'} />
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Create a New Post</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <textarea 
              value={newPostText} 
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
              rows="4"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">All Posts</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <Postcard key={post.id} post={post} fetchPosts={fetchPosts} setMessage={setMessage} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postpage;