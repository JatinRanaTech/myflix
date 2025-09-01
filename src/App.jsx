import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';


const App = () => {

  const navigate = useNavigate();
  const location = useLocation();
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && location.pathname === '/Login') {
        navigate('/');
      } else if (!user && location.pathname !== '/Login') {
        navigate('/Login');
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, [navigate, location]);

  return (   
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/Login' element={<Login/>}/>  
        <Route path='/Player/:id' element={<Player/>}/>  
      </Routes>
    </div> 
  )
}

export default App