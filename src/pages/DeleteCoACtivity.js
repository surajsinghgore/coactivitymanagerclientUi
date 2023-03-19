import LeftSideMenu from '../props/LeftSideMenu';
import PageStatus from '../props/PageStatus';
import TopBar from '../props/TopBar';
import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import '../css/filterSearch.css';

// icons
import { MdOutlineDeleteOutline } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export default function DeleteCoACtivity() {
let navigate = useNavigate();


const [dataStates,setDataState]=useState([]);
const [filterData,setFilterData]=useState([]);
const [byActivityName,setActivityName]=useState("");
const [byFee,setByFee]=useState("");

async function getsAllData(e){
try {
  const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coActivity/viewActivities`,{
    method: "GET",
    headers:{
        "Content-Type": "application/json",
        "auth-Token": `${localStorage.getItem("token")}`
            }
});
let json=await res.json();
setFilterData(json);
setDataState(json);

} catch (error) {
  console.log(error);
}
} 

useEffect(()=>{

getsAllData();


},[])

const filterDataFunction=()=>{

// //1. if name,gender,class
if(byActivityName&&byFee){

let data1=dataStates.filter((itm)=>{
return (itm.ActivityName.toLowerCase().includes(`${byActivityName}`)&& itm.Fee.toLowerCase()===`${byFee}`);
})
setFilterData(data1);
}

//5. by name
else if(byActivityName){
let data1=dataStates.filter((itm)=>{
return itm.ActivityName.toLowerCase().includes(`${byActivityName}`);
})
setFilterData(data1);

}

// //6. by class
else if(byFee){
let data1=dataStates.filter((itm)=>{
const ints=parseInt(byFee);
return itm.Fee===ints;
})
setFilterData(data1);
}
// 8. if not
if(!byActivityName&&!byFee){

getsAllData();
}

}







const style1={
cursor:"pointer",
width: "830px",
}
async function deleteStudentRecord(e){
try {
confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do delete this activity ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {
          const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/coactivity/deleteActivity/${e._id}`,{
    method: "DELETE",
    headers:{
        "Content-Type": "application/json",
        "auth-Token": `${localStorage.getItem("token")}`
            }
});

if(res.status===404){
toast.success("DATA NOT FOUND PLEASE TRY AGAIN", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate("deleteCoActivity");
}
if(res.status===401){
toast.success("YOU ARE NOT THE OWNER OF THIS DATA", {
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
toast.success("Internal Server Error. Please Try After Some Time", {
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
toast.success("Successfully Deleted", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
getsAllData();
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


   

} catch (error) {
    console.log(error)
}
}
 const mystyle = {
 paddingLeft:"3%",
     overflowY:"auto",
     overflowX:"hidden",
     paddingBottom:"400px",
     marginBottom: "5%"
    };
  return (
     <div className='updateStudents'>
     
    <LeftSideMenu />
    


    <div className="updateStudent">
    <TopBar />

    <h6>DELETE ACTIVITY RECORDS</h6>
    <PageStatus pageLink="/" MainHeading="CO ACTIVITY" currentPage="DELETE ACTIVITY"/>
<div className="tables" style={{overflowY: "auto"}}>
    <div className="searchAllStudent"></div>
    <div className="main-table" style={mystyle}>
  
  <div className="searchFilter" style={{marginLeft:"-5%",marginTop:"-1%"}}>
      <h4>search here to filter Activity data</h4>
      <div className="searchBar" style={{paddingLeft:"3%",paddingTop:"1%"}}>
      <input type="text" name="name" placeholder='Search by Activity Name...' value={byActivityName} onChange={(e)=>{setActivityName(e.target.value.toLowerCase())}}  style={{width:"300px",marginLeft:"2%",height:"45px"}}/>


      <input type="text" name="class" placeholder='Search by Fee...' value={byFee} onChange={(e)=>{setByFee(e.target.value.toLowerCase())}} style={{width:"300px",height:"45px",marginLeft:"4%"}}/>
      <button onClick={filterDataFunction} style={{marginLeft:"5%"}}>Search</button>
      </div>
        </div>


<div className="th">
<div id="name">Activity Name</div>
<div id="mobile" style={{width:"100px"}}>Fee</div>
<div id="age">Date</div>
<div id="gender">Month</div>
<div id="email" style={{width:"100px"}}>Year</div>
<div id="op" >-</div>
</div>


{filterData.slice(0,30).map((items,ind)=>{
return<div key={items._id}><div className="td" style={style1} onClick={()=>deleteStudentRecord(items)} >
<div id="name">{items.ActivityName}</div>
<div id="mobile" style={{width:"100px"}}>{items.Fee}</div>
<div id="age">{items.Date}</div>
<div id="gender">{items.Month}</div>
<div id="email" style={{width:"100px"}}>{items.Year}</div>
<div id="op"  >
<MdOutlineDeleteOutline id="menu" />
</div>
</div>
</div>
})}

</div>
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
