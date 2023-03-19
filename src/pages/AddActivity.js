import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import '../css/addStudent.css';
import React,{  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import PageStatus from '../props/PageStatus';

let d=new Date();
let month=parseInt(d.getMonth()+1);

export default function AddActivity() {
const navigate = useNavigate();

useEffect(()=>{

},[])



const [ActivityName,setActivityName]=useState("");
const [Fee,setFee]=useState("");
const [Date,setDate]=useState(d.getDate());
const [Month,setMonth]=useState(month);
const [Year,setYear]=useState(d.getFullYear());






const updatePeronsalData=async(e)=>{
e.preventDefault();
try {
confirmAlert({
      title: 'Confirm to ADD This Activity ',
      message: 'Are you sure to Add this activity ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {         
 try {
        const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coactivity/addCoActivity`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({
   ActivityName,Fee,Date,Month,Year
    })
});

if(res.status===401){
toast.warn("PLEASE ENTER DATA IN ALL THE FIELDS", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
if(res.status===405){
toast.warn("THIS ACTIVITY ALREADY ADDED/PLEASE ENTER DIFFERENT ACTIVITY", {
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
toast.success("ACTIVITY SUCCESSFULLY ADDED ", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
    navigate("/viewActivity");
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
    <h6>WELCOME TO CO-ACTIVITY MANAGEMENT SYSTEM</h6>
<PageStatus pageLink="/" MainHeading="CO ACTIVITY" currentPage="ADD ACTIVITY"/>
     <div className="addDataForm">
    <h1>INSERT ACTIVITIES DETAILS</h1>
    <form onSubmit={updatePeronsalData}>

    <li><h4>ENTER ACTIVITY NAME <span>*</span></h4>
    <input type="text" name="ActivityName" value={ActivityName} minLength={3} onChange={(e)=>setActivityName(e.target.value.toLowerCase())} required/>
    </li>

       <li><h4>ENTER FEE AMOUNT<span>*</span></h4>
    <input type="NUMBER" name="Fee"  value={Fee} onChange={(e)=>setFee(e.target.value.toLowerCase())}/>
    </li>
   <li><h4>ENTER DATE <span>*</span></h4>
    <input type="text" name="Date" value={Date} onChange={(e)=>setDate(e.target.value.toLowerCase())} required/>
    </li>
 <li><h4>ENTER MONTH NUMBER <span>*</span></h4>
    <input type="text" name="Month" value={Month} onChange={(e)=>setMonth(e.target.value.toLowerCase())} required/>
    </li>
 <li><h4>ENTER YEAR <span>*</span></h4>
    <input type="text" name="Year" value={Year} onChange={(e)=>setYear(e.target.value.toLowerCase())} required/>
    </li>



<div className="btn">
<input type="submit" value="ADD CO-ACTIVITY" id="submit"/>
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
