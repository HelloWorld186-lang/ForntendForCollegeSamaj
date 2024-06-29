import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './utils/Store';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Signinpage from './pages/Signinpage';
import Signuppage from './pages/Signuppage';
import Userpage from './pages/Userpage';
import Userupdate from './pages/Userupdate';
import Postpage from './pages/Postpage';
import Userslist from './pages/Userslist';
import Userpostpage from './pages/Userpostpage';
import Signoutpage from './pages/Signoutpage';
import Errorpage from './pages/Errorpage';

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <div className="min-h-screen custom-scrollbar">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signin" element={<Signinpage />} />
              <Route path="/signup" element={<Signuppage />} />
              <Route path="/user" element={<Userpage />} />
              <Route path="/update-profile" element={<Userupdate />} />
              <Route path="/post" element={<Postpage />} />
              <Route path="/users" element={<Userslist />} />
              <Route path="/users/:userId/post" element={<Userpostpage />} />
              <Route path="/signout" element={<Signoutpage />} />
              <Route path="*" element={<Errorpage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;