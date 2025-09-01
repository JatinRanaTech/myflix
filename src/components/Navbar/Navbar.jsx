import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import Logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { Link } from 'react-router-dom';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef =useRef();
  
 useEffect(() => {
  const handleScroll = () => {
      console.log('Scrolled:', window.scrollY);
    if (window.scrollY >= 80) {
      navRef.current.classList.add('nav-dark');
    } else {
      navRef.current.classList.remove('nav-dark');
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

  return (
    <div ref={navRef} className='navbar'>
     <div className='navbar-left'>
       <img src={Logo} className='logo'/>
       <ul>
         <li><a href='#'>Home</a></li>
         <li><a href='#'>TV Shows</a></li>
         <li><a href='#'>Movies</a></li>
         <li><a href='#'>New & Popular</a></li>
         <li><a href='#'>My List</a></li>
         <li><a href='#'>Browse by Languages</a></li>
       </ul>
     </div>
     <div className='navbar-right'>
       <img src={search_icon} className='icons'/>
       <p>Children</p>
       <img src={bell_icon} className='icons'/>
       <div className='navbar-profile'>
         <img src={profile_img} className='profile'/>
         <img src={caret_icon} className='caret' />
         <Link  to={'/Login'} className='dropdown'>
           <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
         </Link>
       </div>
     </div>
    
    </div>
  )
}

export default Navbar