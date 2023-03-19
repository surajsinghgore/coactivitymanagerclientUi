import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';

import "react-toastify/dist/ReactToastify.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import PageStatus from '../props/PageStatus';
import "../css/updateCoActivity.css";
import '../css/PersonalRecord.css';
import boy from '../images/boy.webp'
import girl from '../images/girl.webp'
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';


export default function PersonalRecord() {
const [data,setData]=useState([]);
const nevigate=useNavigate();
const datafetch=async()=>{
const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/userData`,{
method:"POST",
headers:{
   "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
}
})
let dataget=await res.json();
setData(dataget);
}


useEffect(()=>{
datafetch();
if(!localStorage.getItem("token")){
nevigate("/login");
}
},[])


  return (
    <div className='updateActivity'>
    <LeftSideMenu />
     <div className="rightSideStudent2">
    <TopBar />
    <h6 style={{textAlign:"center"}}>WELCOME TO CO-ACTIVITY MANAGEMENT SYSTEM</h6>
<PageStatus pageLink="/" MainHeading="PERSONAL" currentPage="SEE PERSONAL DATA"/>
 <div className="personal">
 <h5>Personal Details</h5>
 <div className="img">
 {(data.gender==="male")?  <img src={boy} alt={boy} id="profile"/>: <img src={girl} alt={girl} id="profile"/>}

 </div>
 <div className="personaldata">
 <li>NAME: <span>{data.name}</span></li>
 <li>EMAIL: <span>{data.email}</span></li>
 <li>MOBILE: <span>+91-{data.mobile}</span></li>
 <li>DOB: <span>{data.dob}</span></li>
 <li>GENDER: <span>{data.gender}</span></li>
 <li>DESIGNATION: <span>{data.designation}</span></li>
 </div>
 </div>
    </div>
    

    </div>
  )
}
