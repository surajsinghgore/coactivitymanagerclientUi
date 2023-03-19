import adminMale from '../images/male.png';
import adminFemale from '../images/female.png';
import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TopBar.css';
export default function TopBar() {
const [userName,setUserName]=useState("");
const [userGender,setUserGender]=useState("");
const [userDesignation,setUserDesignation]=useState("");
const navigate = useNavigate();

const getUserDetails=async()=>{
const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/userData`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token":`${localStorage.getItem("token")}`, 
    }
});
let data=await res.json();
if(res.status===421){
localStorage.removeItem("token");
navigate('/login');

}
setUserName(data.name);
setUserGender(data.gender);
setUserDesignation(data.designation)
}
useEffect(()=>{
if(!localStorage.getItem("token")){
navigate('/login');
}
getUserDetails();
},[])



  return (
     <div className="top-bar">
    <div className="search">
    <i className="fa-solid fa-magnifying-glass"></i>
    <input type="search" name="topsearch" id="topsearch" placeholder='Find something...'readOnly / >
    </div>
    <div className="user">
    <div className="username">
    <h1>{userName}</h1>
    <p>{userDesignation}</p>
    </div>
    <i className="fa-solid fa-caret-down"></i>
    {(userGender==="male")?<img src={adminMale} alt={adminMale}/>:
    <img src={adminFemale} alt={adminFemale}/>
        }
  
    </div>
    </div>
  )
}
