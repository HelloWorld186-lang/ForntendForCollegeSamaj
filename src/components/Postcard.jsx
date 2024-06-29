import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Toast from './Toast'; 

const Postcard = ({ post, fetchPosts }) => {
  const userdetail = useSelector((state) => state.userdetail.value);
  const accessToken = useSelector((state) => state.accessToken.value);
  const [likes, setLikes] = useState(post.likes);
  const [unlikes, setUnlikes] = useState(post.unlikes);
  const [message, setMessage] = useState('');  

  const handleAction = async (action) => {
    try {
      const response = await fetch(`https://backendforcollegesamaj-2.onrender.com/post/${post.id}/${action}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setUnlikes(data.unlikes);
        setMessage(`Post ${action}d successfully`);
      } else {
        throw new Error(`Error ${action}ing post`);
      }
    } catch (error) {
      console.error(`Error ${action}ing post:`, error);
      setMessage(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://backendforcollegesamaj-2.onrender.com//post/${post.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (response.ok) {
        await fetchPosts();
        setMessage('Post deleted successfully');
      } else {
        throw new Error('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg p-6 relative">
      <Toast message={message} type={message.includes('Error') ? 'error' : 'info'} />
      <div className="flex items-center mb-4">
        <img src={post.author_avatar || post.avatar_link} alt="" className="w-12 h-12 rounded-full mr-4"/>
        <div>
          <p className="text-lg font-semibold text-white">{post.author}</p>
          <p className="text-sm text-gray-400">{new Date(post.date_posted).toLocaleString()}</p>
        </div>
      </div>
      <p className="text-lg mb-4 text-white break-words">{post.post_text}</p>
      <div className="flex space-x-4">
        <button onClick={() => handleAction('like')} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Like ({likes})
        </button>
        <button onClick={() => handleAction('unlike')} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
          Unlike ({unlikes})
        </button>
        {(userdetail.username === post.author) && (
          <button onClick={handleDelete} className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Postcard;