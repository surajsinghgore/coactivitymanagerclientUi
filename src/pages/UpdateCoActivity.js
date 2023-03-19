import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import React,{ useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import PageStatus from '../props/PageStatus';
import "../css/updateCoActivity.css";
import StudentContext from '../context/StudentContext';
import { AiFillEdit } from 'react-icons/ai';
import '../css/filterSearch.css';

let d=new Date();
let month=parseInt(d.getMonth()+1);

export default function UpdateCoActivity() {

const {setUpdateActivity}=useContext(StudentContext);
const navigate = useNavigate();
const [data,setData]=useState([]);
const [filterData,setFilterData]=useState([]);
const [byActivityName,setActivityNames]=useState("");
const [byFee,setByFee]=useState("");


const getDataFromToUpdate=async()=>{
try {
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coactivity/viewActivities`,{
    headers:{
    "auth-token":`${localStorage.getItem("token")}`
    }
    });
    const data=await res.json();
 setData(data);
 setFilterData(data);
} catch (error) {
    console.log(error)
}

}



useEffect(()=>{
getDataFromToUpdate();
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
        const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coActivity/addCoActivity`,{
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
    navigate("/admin");
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

const updateActivities=(e)=>{
setUpdateActivity(e);
navigate("/updateCoActivityForm");
}
const filterDataFunction=()=>{

// //1. if name,gender,class
if(byActivityName&&byFee){

let data1=data.filter((itm)=>{
return (itm.ActivityName.toLowerCase().includes(`${byActivityName}`)&& itm.Fee.toLowerCase()===`${byFee}`);
})
setFilterData(data1);
}

//5. by name
else if(byActivityName){
let data1=data.filter((itm)=>{
return itm.ActivityName.toLowerCase().includes(`${byActivityName}`);
})
setFilterData(data1);

}

// //6. by class
else if(byFee){
let data1=data.filter((itm)=>{
const ints=parseInt(byFee);
return itm.Fee===ints;
})
setFilterData(data1);
}
// 8. if not
if(!byActivityName&&!byFee){

getDataFromToUpdate();
}

}

  return (
    <div className='updateActivity'>
    <LeftSideMenu />
     <div className="rightSideStudent2">
    <TopBar />
    <h6>WELCOME TO CO-ACTIVITY MANAGEMENT SYSTEM</h6>
<PageStatus pageLink="/" MainHeading="CO ACTIVITY" currentPage="UPDATE ACTIVITY"/>
     <div className="addDataForm">


   <div className="searchFilter" >
      <h4>search here to filter Activity data</h4>
      <div className="searchBar" style={{paddingLeft:"3%",paddingTop:"1%"}}>
      <input type="text" name="name" placeholder='Search by Activity Name...' value={byActivityName} onChange={(e)=>{setActivityNames(e.target.value.toLowerCase())}}  style={{width:"300px",marginLeft:"8%",height:"45px"}}/>


      <input type="text" name="class" placeholder='Search by Fee...' value={byFee} onChange={(e)=>{setByFee(e.target.value.toLowerCase())}} style={{width:"300px",marginLeft:"3%",height:"45px"}}/>
      <button onClick={filterDataFunction}>Search</button>
      </div>
        </div>

{(filterData.length===0) ? "NO RECORD FOUND": <><h1 style={{fontSize:"18px"}}>CLICK ON EDIT SIGN TO EDIT</h1>
    <h3>All Activities Record</h3>
<div className="tables">
    <div className="searchAllStudent"></div>
    <div className="main-table">
<div className="th">
<div id="name">Activity Name</div>
<div id="mobile">Fee</div>
<div id="age">Date</div>
<div id="gender">Month</div>
<div id="email">Year</div>
<div id="op">-</div>
</div>

{filterData.slice(0,30).map((items,ind)=>{
return <div key={items._id}><div className="td"  onClick={()=>updateActivities(items)}>
<div id="name">{items.ActivityName}</div>
<div id="mobile">{items.Fee}</div>
<div id="age">{items.Date}</div>
<div id="gender">{items.Month}</div>
<div id="email">{items.Year}</div>
<div id="op" ><AiFillEdit id="menu"/>
</div>
</div>
</div>
})}
</div>
</div>

  </>}

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
