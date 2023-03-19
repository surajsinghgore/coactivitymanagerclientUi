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

export default function UpdateEmail() {
const navigate = useNavigate();





const [oldEmail,setOldEmail]=useState("");
const [newEmail,setNewEmail]=useState("");
const [mobile,setMobile]=useState("");
const [password,setPassword]=useState("");;

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

const updateEmailID=async(e)=>{
e.preventDefault();
try {
confirmAlert({
      title: 'Confirm to Update Your Email Id',
      message: 'Are you sure to Change Your Email Account ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {         
 try {
    
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/updateEmailID/${userId}`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({
      oldEmail,newEmail,mobile,password
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


if(res.status===410){
toast.warn("NEW EMAIL ID IS SAME AS CURRENT EMAIL ID, PLEASE ENTER DIFFERENT EMAIL ID", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
if(res.status===402){
toast.warn("INVALID USER ID / PLEASE LOGIN AGAIN", {
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
if(res.status===401){
toast.warn("RECORD NOT FOUND", {
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
if(res.status===409){
toast.warn("PLEASE ENTER CORRECT CURRENT EMAIL ID", {
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
toast.warn("PLEASE ENTER CORRECT MOBILE NUMBER", {
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
if(res.status===413){
toast.warn("NEW EMAIL ID IS ALREADY REGISTERED , PLEASE ENTER DIFFERENT EMAIL ID", {
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
if(res.status===411){
toast.warn("PASSWORD IS WRONG, PLEASE ENTER CORRECT PASSWORD", {
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
toast.success("EMAIL ID SUCCESSFULLY UPDATED", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
 navigate("/personalRecord");
}

 } catch (error) {
toast.error("SORRY,INTERNAL SERVER ERROR ,PLEASE TRY AGAIN LATER", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

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
<PageStatus pageLink="/s" MainHeading="PERSONAL" currentPage="EMAIL ID CHANGE"/>
     <div className="addDataForm">
    <h1>EMAIL ID CHANGE</h1>
    <h3>**PLEASE PROVIDE CORRECT DATA TO UPDATE YOUR EMAIL ACCOUNT**</h3>
    <form onSubmit={updateEmailID}>

    <li><h4>ENTER CURRECT EMAIL ID</h4>
    <input type="email" name="oldEmail" value={oldEmail}  onChange={(e)=>setOldEmail(e.target.value.toLowerCase())} required/>
    </li>

 <li><h4>ENTER NEW EMAIL ID</h4>
    <input type="email" name="newEmail" value={newEmail}  onChange={(e)=>setNewEmail(e.target.value.toLowerCase())} required/>
    </li>

 <li><h4>ENTER MOBILE NUMBER</h4>
    <input type="number" name="mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} required/>
    </li>
  <li><h4>ENTER PASSWORD</h4>
    <input type="password" name="password" value={password} minLength={3} onChange={(e)=>setPassword(e.target.value)} required/>
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
