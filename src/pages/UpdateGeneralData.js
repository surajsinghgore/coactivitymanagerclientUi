import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import '../css/addStudent.css';
import React,{ useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import PageStatus from '../props/PageStatus';

export default function UpdateGeneralData() {
const navigate = useNavigate();

useEffect(()=>{

userDataFetch();
},[])

const [name,setName]=useState("");
const [gender,setGender]=useState("");
const [dob,setDob]=useState("");;
const [designation,setDesignation]=useState("");
const [userId,setUserId]=useState("");


const userDataFetch=async()=>{

try {
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/userData`,{
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
setName(data.name);
setGender(data.gender);
setDob(data.dob);
setUserId(data._id);
setDesignation(data.designation);

} catch (error) {
    
}
}

const updatePeronsalData=async(e)=>{
e.preventDefault();
try {
confirmAlert({
      title: 'Confirm to Update Personal Record',
      message: 'Are you sure to Update Your Personal Record ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {         
 try {
    
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/updategeneraldata/${userId}`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({
      name,gender,dob,designation
    })
});

if(res.status===401){
toast.warn("Please Login Again", {
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
toast.warn("SORRY DATA NOT FOUND, PLEASE LOGIN AGAIN", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}

if(res.status===201){
toast.success("SUCCESSEFULLY GENERAL DATA UPDATE", {
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
if(res.status===501){
toast.error("SORRY,INTERNAL SERVER ERROR ,PLEASE TRY AGAIN LATER", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
userDataFetch();
}

 } catch (error) {
   console.log(error);
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
    <div className='addStudent'>
    <LeftSideMenu />
    

    <div className="rightSideStudent">
    <TopBar />
    <h6>HII <span id="userName">{name}</span> WELCOME</h6>
<PageStatus pageLink="/s" MainHeading="PERSONAL" currentPage="UPDATE PEROSNAL RECORD"/>
     <div className="addDataForm">
    <h1>UPDATE PERSONAL ACCOUNT DATA</h1>
    <h3>**please override our records in existing data fields**</h3>
    <form onSubmit={updatePeronsalData}>
    <li><h4>Full Name</h4>
    <input type="text" name="name" value={name} minLength={3} onChange={(e)=>setName(e.target.value.toLowerCase())} />
    </li>

       <li><h4>Date Of Birth </h4>
    <input type="date" name="dob"  value={dob} onChange={(e)=>setDob(e.target.value.toLowerCase())}/>
    </li>
     <li><h4>Gender</h4>
   <select name="gender" value={gender} onChange={(e)=>setGender(e.target.value.toLowerCase())}>
   <option value="null">Select Here</option>
      <option value="Male">Male</option>
   <option value="Female">Female</option>
   <option value="Transgender">Transgender</option>
   </select>
    </li>

  <li><h4>Designation</h4>
    <input type="text" name="designation" value={designation}  onChange={(e)=>setDesignation(e.target.value.toLowerCase())} />
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
