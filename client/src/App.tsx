import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignOut from './components/SignOut';
import NavBar from './components/NavBar';
import Products from './pages/Products';
import Register from './pages/Register';
import Category from './pages/Category';
import About from './pages/About';
import Login from './pages/Login';
import Home from './pages/Home';
import './styles/App.css';

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about-us" element={<About/>}/>
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
