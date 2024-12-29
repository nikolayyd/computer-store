import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Category from './pages/Category';
import NavBar from './components/NavBar';
import SignOut from './components/SignOut';
import './styles/App.css';
import Products from './pages/Products';

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/catalogue" element={<Category/>}/>
          <Route path="/catalogue/:id" element={<Products/>}/>
          <Route path="/sign-in" element={<Login/>}/>
          <Route path="/sign-up" element={<Register/>}/>
          <Route path="/sign-out" element={<SignOut/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
