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

export default function UpdateActivityForm() {
const navigate = useNavigate();
const {getsCoActivity}=useContext(StudentContext);

useEffect(()=>{
if(!getsCoActivity){
navigate("/updateCoActivity");
}

},[])
const [ids,setIds]=useState(getsCoActivity._id)
const [ActivityName,setActivityName]=useState(getsCoActivity.ActivityName);
const [Fee,setFee]=useState(getsCoActivity.Fee);
const [Date,setDate]=useState(getsCoActivity.Date);
const [Month,setMonth]=useState(getsCoActivity.Month);
const [Year,setYear]=useState(getsCoActivity.Year);


async function updateCoActivitiey(e){
e.preventDefault();

try {
// if name not change
if(getsCoActivity.ActivityName===ActivityName){

confirmAlert({
     title: 'Confirm to Update Co Activity Record',
      message: 'Are you sure to update this record ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {

 const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coactivity/updateCoActivityData/${ids}`,{
   method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({Date,Fee,Month,Year
    })
});
if(res.status===404){
toast.warn("ACTIVITY NOT FOUND , PLEASE TRY AGAIN  ", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

}
if(res.status===409){
toast.warn("THIS ACTIVITY IS ALREADY PRESENT", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

}
if(res.warn===400){

toast.error("PLEASE ENTER NEW RECORD NOT SAME RECORD", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
if(res.status===501){

toast.error("INTERNAL SERVER ERROR", {
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
toast.success("succesfully activity update", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate("/updateCoActivity");
}

}
        },
        {
          label: 'No',
          onClick: () => {
          
          }
        }
      ]
    });


}

else{
confirmAlert({
      title: 'Confirm to Update Co Activity Record',
      message: 'Are you sure to update this record ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {
  const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coactivity/updateCoActivityData/${ids}`,{
   method: "POST",
    headers:{
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({
  ActivityName,Date,Fee,Month,Year
    })
});



if(res.status===404){
toast.warn("ACTIVITY NOT FOUND , PLEASE TRY AGAIN  ", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

}
if(res.status===409){
toast.warn(`${ActivityName} IS ALREADY PRESENT`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
setActivityName(getsCoActivity.ActivityName);
}
if(res.warn===400){

toast.error("PLEASE ENTER NEW RECORD NOT SAME RECORD", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
if(res.status===501){

toast.error("INTERNAL SERVER ERROR", {
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
toast.success("succesfully activity update", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate("/updateCoActivity");
}


}
        },
        {
          label: 'No',
          onClick: () => {
          
          }
        }
      ]
    });




}


   

} catch (error) {
    console.error("eror is",error);
}

}

  return (
    <div className='addStudent'>
    <LeftSideMenu />
        <div className="rightSideStudent">
    <TopBar />
    <h6>UPDATE Co Activity Record</h6>
     <div className="addDataForm">
    <h1>Update Co-Activity Students</h1>
      <h3>**please override our records in existing data fields**</h3>
      <form>
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
<input type="submit" value="ADD CO-ACTIVITY" id="submit" onClick={updateCoActivitiey}/>
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
