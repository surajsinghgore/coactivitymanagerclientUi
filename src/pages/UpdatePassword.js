import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import '../css/updateEmail.css';
import React,{ useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import PageStatus from '../props/PageStatus';

export default function UpdatePassword() {
const navigate = useNavigate();





const [mobile,setMobile]=useState("");
const [email,setEmail]=useState("");
const [dob,setDob]=useState("");
const [currentPassword,setCurrentPassword]=useState("");;
const [NewPassword,setNewPassword]=useState("");;
const [cNewPassword,setcNewPassword]=useState("");;

const [userId,setUserId]=useState("");



// getting user id

const userDataFetch=async()=>{

try {
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/userData`,{
    method:"POST",
   headers:{
   "Content-Type":"application/json",
   "auth-token":`${localStorage.getItem("token")}`
      }
    });
    if(!res){
    navigate("/login");
    }
const data=await res.json();
setUserId(data._id);

} catch (error) {
   console.log(error) 
}
}


useEffect(()=>{
userDataFetch();
},[])

const updatePasswords=async(e)=>{
e.preventDefault();
try {
confirmAlert({
      title: 'Confirm to Update Your Password',
      message: 'Are you sure to Update Our Change Your Password ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {         
 try {
    
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/updatePassword//${userId}`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({
    email,mobile,dob,currentPassword,NewPassword,cNewPassword
    })
});


// field empty warings
if(res.status===400){
let ress=await res.json();
for(let i=0;i<ress.errors.length;i++){
if(i<1){
  toast.warn(`${ress.errors[i].msg}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
continue;
}
}
return 0;
}



if(res.status===401){
toast.warn("DATA NOT FOUND,PLEASE LOGIN AGAIN", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}

if(res.status===402){
toast.warn("EMAIL ID NOT MATCH,PLEASE ENTER CORRECT EMAIL ID", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status===403){
toast.warn("MOBILE NUMBER IS NOT CORRECT,PLEASE ENTER CORRECT MOBILE NUMBER", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status===403){
toast.warn("MOBILE NUMBER IS NOT CORRECT,PLEASE ENTER CORRECT MOBILE NUMBER", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status===405){
toast.warn("DATE OF BIRTH IS NOT CORRECT,PLEASE ENTER CORRECT DATE OF BIRTH", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status===406){
toast.warn("CURRENT AND NEW PASSWORD IS SAME,PLEASE ENTER DIFFERENT PASSWORD", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}

if(res.status===408){
toast.warn("NEW PASSWORD AND CONFIRM NEW PASSWORD NOT MATCH", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status===410){
toast.warn("PLEASE ENTER CORRECT CURRENT PASSWORD", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(res.status===201){
toast.success("PASSWORD SUCCESSFULLY UPDATED", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
 navigate("/personalRecord");
localStorage.removeItem("token");
}

 } catch (error) {
console.log(error)

 } 
      }
        },
        {
          label: 'No',
          onClick: () => {
        //   navigate("/mainUpdateForm");
          }
        }
      ]
    });







} catch (error) {
    console.log(error)
}

}

  return (
    <div className='updatePersonalData'>
    <LeftSideMenu />
    

    <div className="rightSideStudent">
    <TopBar />
    <h6>PERSONAL SETTING</h6>
<PageStatus pageLink="/s" MainHeading="PERSONAL" currentPage="CHANGE PASSWORD"/>
     <div className="addDataForm">
    <h1>ACCOUNT PASSWORD CHANGE</h1>
    <h3>**PLEASE PROVIDE CORRECT DATA TO UPDATE YOUR ACCOUNT PASSWORD**</h3>
    <form onSubmit={updatePasswords}>
    
 <li><h4>ENTER EMAIL ID</h4>
    <input type="email" name="email" value={email}  onChange={(e)=>setEmail(e.target.value.toLowerCase())} required/>
    </li>
 <li><h4>ENTER MOBILE NUMBER</h4>
    <input type="Number" name="mobile" value={mobile}  onChange={(e)=>setMobile(e.target.value)} required/>
    </li>
 <li><h4>ENTER DATE OF BIRTH</h4>
    <input type="date" name="dob" value={dob}  onChange={(e)=>setDob(e.target.value.toLowerCase())} required/>
    </li>
  <li><h4>ENTER CURRENT PASSWORD</h4>
    <input type="password" name="currentPassword" value={currentPassword}  onChange={(e)=>setCurrentPassword(e.target.value)} required/>
    </li>
 <li><h4>ENTER NEW PASSWORD</h4>
    <input type="password" name="NewPassword" value={NewPassword}  onChange={(e)=>setNewPassword(e.target.value)} required/>
    </li>
<li><h4>ENTER CONFIRM NEW PASSWORD</h4>
    <input type="password" name="currentPassword" value={cNewPassword}  onChange={(e)=>setcNewPassword(e.target.value)} required/>
    </li>






<div className="btn">
<input type="submit" value="UPDATE" id="submit"/>
   </div>
    </form>
    </div>
    </div>
    
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
