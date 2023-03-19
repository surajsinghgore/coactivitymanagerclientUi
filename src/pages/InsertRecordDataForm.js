import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import StudentContext from '../context/StudentContext';
import { ToastContainer, toast } from "react-toastify";
import "../css/insertFormData.css"


let d=new Date();
let month=parseInt(d.getMonth()+1);
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


export default function InsertRecordDataForm() {
const {getStudentData}=useContext(StudentContext);
const navigate=useNavigate();

const[activityFetch,setActivityFetch]=useState([]);
const [ActivityName,setActivityName]=useState("");
const [Fee,setFee]=useState("");
const [RashidNumber,setRashidNumber]=useState("");
const [Date,setDate]=useState(d.getDate());
const [Month,setMonth]=useState(month);
const [Year,setYear]=useState(d.getFullYear());


// fetching activity data

const getActivityData=async()=>{
try {
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coActivity/viewActivities`,{
    headers:{
    "auth-token":`${localStorage.getItem("token")}`
    }
    });
    const data=await res.json();
 setActivityFetch(data);
} catch (error) {
    console.log(error)
}

}

// select activities from database
const onChangeOption=(e)=>{
  if (e.detail === 0){

     activityFetch.map((items,ind)=>{
     if(e.target.value===items.ActivityName){
     setFee(items.Fee);
     setActivityName(items.ActivityName);
     }
     })
        }
  }





useEffect(()=>{
getActivityData();
if(getStudentData.length===0){
navigate("/updateInsertRecord");
}
},[])


const insertRecord=async(e)=>{
e.preventDefault();

try {
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/addRecord/insertRecord/${getStudentData._id}`,{
    method:"POST",
    headers:{
    "Content-Type":"application/json",
    "auth-token":`${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
   RashidNumber,ActivityName,Fee,Date,Month,Year
    })
    })

if(res.status===405){
toast.warn("PLEASE FILLS ALL THE FIELDS", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
if(res.status===401){
toast.warn("STUDENT DATA NOT FOUND, PLEASE TRY AGAIN", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
if(res.status===321){
toast.warn("STUDENT DATA NOT FOUND", {
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
toast.success("SUCCESSFULLY RECORD ENTER", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate("/viewSpecificRecords")
}
if(res.status===501){
toast.success("INTERNAL SERVER ERROR", {
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
   console.log(error) 
}
}

  return (
 <div className="form" id="insertForm" style={{boxSizing:"border-box",marginTop:"-3%",paddingTop:"3%"}}>

 <div className="personal" style={{width: "93%",marginTop:"3%"}}>
 
 <li> Student Name: <span>{getStudentData.studentName}</span></li>
 <li> Class :  <span>{getStudentData.className}</span></li>
 <li> Age :  <span>{getStudentData.age}</span></li>
 <li>Gender :  <span>{getStudentData.gender}</span></li>
 </div>
  <form onSubmit={insertRecord}>
  <h2>Enter <span id="month">{months[d.getMonth()]}</span> Month Record </h2>

   <li><h4>ENTER RECEIPT NUMBER <span>*</span></h4>
    <input type="text" name="RashidNumber" value={RashidNumber} onChange={(e)=>setRashidNumber(e.target.value.toLowerCase())} required/>
    </li>
    <li><h4>SELECT ACTIVITY NAME <span>*</span></h4>
   <select name="ActivityName"  onClick={onChangeOption}>
    <option>select activity</option>
    {activityFetch.map((item,ind)=>{
    return(
    <option value={item.ActivityName} key={item._id}>{item.ActivityName}</option>
    )
    })}
    
    </select>
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
<input type="submit" value="INSERT RECORD" id="submit"/>

   </div>
    </form>
<Link to="/insertRecords"><button id="back">Go Back</button></Link>

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
