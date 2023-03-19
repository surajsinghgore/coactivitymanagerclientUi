import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import '../css/addStudent.css';
import React,{ useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentContext from '../context/StudentContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function MainUpdateForm() {
const navigate = useNavigate();
const {getIdOfStudentData}=useContext(StudentContext);
console.log(getIdOfStudentData)
useEffect(()=>{
if(!getIdOfStudentData){
navigate("/updateStudent")
}
},[])

const [studentName,setStudentName]=useState(getIdOfStudentData.studentName);
const [age,setAge]=useState(getIdOfStudentData.age);
const [gender,setGender]=useState(getIdOfStudentData.gender);
const [email,setEmail]=useState(getIdOfStudentData.email);
const [mobile,setMobile]=useState(getIdOfStudentData.mobile);
const [dob,setDob]=useState(getIdOfStudentData.dob);
const [className,setClassName]=useState(getIdOfStudentData.className);
const [year,setYear]=useState(getIdOfStudentData.year);
const [bloodGroup,setBloodGroup]=useState(getIdOfStudentData.bloodGroup);
const [address,setAddress]=useState(getIdOfStudentData.address);

const updateStudentData=async(e)=>{
e.preventDefault();
try {





confirmAlert({
      title: 'Confirm to Update Record',
      message: 'Are you sure to Update This Record.',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {
          
      const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/student/updatestudentdata/${getIdOfStudentData._id}`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({
       studentName,age,gender,email,mobile,dob,className,year,bloodGroup,address
    })
});
if(res.status===400){
toast.warn("Student of this class is Already Present Please , Enter Different Roll Number", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}

if(res.status===404){
toast.warn("Sorry You Can't Update this record", {
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
toast.warn("You Can't Update Different User Data", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate("/updateStudent");
}
if(res.status===501){
toast.warn("Internal Server Error", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate("/updateStudent");
}
if(res.status===201){
toast.warn("Record Successfully Updted", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate("/updateStudent");
}

          }
        },
        {
          label: 'No',
          onClick: () => {
          navigate("/mainUpdateForm");
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
    <h6>UPDATE SURAJ SINGH</h6>
     <div className="addDataForm">
    <h1>Add New Students</h1>
      <h3>**please override our records in existing data fields**</h3>
    <form onSubmit={updateStudentData}>
    <li><h4>Student Full Name <span>*</span></h4>
    <input type="text" name="studentName" value={studentName} minLength={3} onChange={(e)=>setStudentName(e.target.value.toLowerCase())} required/>
    </li>
  <li><h4>Student Age </h4>
    <input type="Number" name="age" value={age}  onChange={(e)=>setAge(e.target.value.toLowerCase())} />
    </li> 
     <li><h4>Gender <span>*</span></h4>
   <select name="gender" value={gender} onChange={(e)=>setGender(e.target.value)} required>
   <option value="null">Select Here</option>
      <option value="Male">Male</option>
   <option value="Female">Female</option>
   <option value="Transgender">Transgender</option>
   </select>
    </li>
    <li><h4>Email ID </h4>
    <input type="email" name="email"  value={email} onChange={(e)=>setEmail(e.target.value.toLowerCase())}/>
    </li>
     <li><h4>Mobile Number</h4>
    <input type="number" name="mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
    </li>
    <li><h4>Date Of Birth </h4>
    <input type="date" name="dob"  value={dob} onChange={(e)=>setDob(e.target.value)}/>
    </li>
      <li><h4>Which Standard? <span>*</span></h4>
   <select name="className" value={className} required onChange={(e)=>setClassName(e.target.value)}>
   <option value="null">Select Here</option>
   <option value="1">1</option>
   <option value="2">2</option>
   <option value="3">3</option>
   <option value="4">4</option>
   <option value="5">5</option>
   <option value="6">6</option>
   <option value="7">7</option>
   <option value="8">8</option>
   <option value="9">9</option>
   <option value="10">10</option>
   <option value="11">11</option>
   <option value="12">12</option>
   </select>
    </li>

  <li><h4>Year</h4>
    <input type="text" name="year" value={year} onChange={(e)=>setYear(e.target.value.toLowerCase())}/>
   
    </li>



    <li><h4>BLOOD GROUP</h4>
   <select name="bloodGroup" value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}>
   <option value="null">Select Here</option>
   <option value="A+">A+</option>
   <option value="A-">A-</option>
   <option value="B+">B+</option>
   <option value="B-">B-</option>
     <option value="AB+">AB+</option>
   <option value="AB-">AB-</option>
   <option value="O+">O+</option>
   <option value="O-">O-</option>
 
   </select>
    </li>
<li><h4>Address</h4>
    <input type="text" name="address" value={address} onChange={(e)=>setAddress(e.target.value.toLowerCase())}/>
   
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
