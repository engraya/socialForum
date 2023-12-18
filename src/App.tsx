import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CreatePost from './pages/createPost/CreatePost';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/main" element={<MainPage/>}/>
          <Route path="/newpost" element={<CreatePost/>}/>
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;
