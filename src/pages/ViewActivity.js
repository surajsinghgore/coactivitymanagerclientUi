import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import React,{useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import PageStatus from '../props/PageStatus';
import "../css/viewActivity.css";
import '../css/filterSearch.css';


export default function ViewActiviy() {

const navigate = useNavigate();
const [data,setData]=useState([]);
const [filterData,setFilterData]=useState([]);
const [byActivityName,setActivityName]=useState("");
const [byFee,setByFee]=useState("");


const getDataFromToUpdate=async()=>{
try {
    const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coActivity/viewActivities`,{
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
if(!localStorage.getItem("token")){
navigate("/login");
}
getDataFromToUpdate();
},[])




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
    <div className='viewActivity'>
    <LeftSideMenu />
     <div className="rightSideStudent4">
    <TopBar />
    <h6>WELCOME TO CO-ACTIVITY MANAGEMENT SYSTEM</h6>
<PageStatus pageLink="/" MainHeading="CO ACTIVITY" currentPage="VIEW ACTIVITY"/>
     <div className="addDataForm">

   <div className="searchFilter" >
      <h4>search here to filter Activity data</h4>
      <div className="searchBar" style={{paddingLeft:"3%",paddingTop:"1%"}}>
      <input type="text" name="name" placeholder='Search by Activity Name...' value={byActivityName} onChange={(e)=>{setActivityName(e.target.value.toLowerCase())}}  style={{width:"300px",marginLeft:"8%",height:"45px"}}/>


      <input type="text" name="class" placeholder='Search by Fee...' value={byFee} onChange={(e)=>{setByFee(e.target.value.toLowerCase())}} style={{width:"300px",marginLeft:"3%",height:"45px"}}/>
      <button onClick={filterDataFunction}>Search</button>
      </div>
        </div>

{(filterData.length===0) ? "NO RECORD FOUND"  :<>
    <h1 style={{marginTop:"-3%"}}>ALL THE ACTIVITIES ENTERED BY YOU</h1>
<div className="tables" style={{marginLeft:"5%"}}>
    <div className="searchAllStudent"></div>
    <div className="main-table">
<div className="th">
<div id="name">Activity Name</div>
<div id="mobile">Fee</div>
<div id="age">Date</div>
<div id="gender">Month</div>
<div id="email">Year</div>
</div>

{filterData.slice(0,30).map((items,ind)=>{
return <div key={items._id}><div className="td" >
<div id="name">{items.ActivityName}</div>
<div id="mobile">{items.Fee}</div>
<div id="age">{items.Date}</div>
<div id="gender">{items.Month}</div>
<div id="email">{items.Year}</div>
</div>
</div>
})}
</div>
</div>
</>}


</div>
</div>
    </div>
  )
}
