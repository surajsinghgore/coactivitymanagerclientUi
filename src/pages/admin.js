import '../css/admin.css';
import React from 'react';
import banner from '../images/banner.jpeg';
import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
let d=new Date();
export default function Admin() {

  return (

  
    <div className='admin'>
<LeftSideMenu />
     
    {/* right section */}
    <div className="right-section">
<TopBar />
    {/* <PageStatus pageLink="/admin" MainHeading="Admin Panel " currentPage=""/> */}
  
  <div className="homePage">
  <h1>WELCOME TO CO ACTIVITY MANAGER </h1>
<img src={banner} alt={banner} id="banner"/>


<footer>© Copyrights coactivitywebsite {d.getFullYear()}. All rights reserved. Designed by suraj singh</footer>
  </div>
    </div>
    </div>
  )
}
