import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const Userslist = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const accessToken = useSelector((state) => state.accessToken.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      fetchUsers();
    } else {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://backendforcollegesamaj-2.onrender.com/users', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users');
      }
      setUsers(data.users);
      setMessage('Users fetched successfully');
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Toast message={message} type={message.includes('Failed') ? 'error' : 'info'} />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-6">User List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <Link key={user.id} to={`/users/${user.id}/post`} className="bg-gray-800 shadow rounded-lg p-6 hover:bg-gray-700 transition duration-300">
              <img src={user.avatar_link} alt={`${user.username}'s avatar`} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-lg font-semibold text-white text-center">{user.username}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userslist;