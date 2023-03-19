import LeftSideMenu from '../props/LeftSideMenu';
import PageStatus from '../props/PageStatus';
import TopBar from '../props/TopBar';
import '../css/updateData.css';
import React,{ useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../css/allStudentRecords.css";
import '../css/filterSearch.css';

// icons
import { MdOutlineDeleteOutline } from 'react-icons/md';
import StudentContext from '../context/StudentContext';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export default function DeleteStudentRecord() {
const {setIdOfStudentData}=useContext(StudentContext);
let navigate = useNavigate();
const [filterData,setFilterData]=useState([]);
const [byName,setByName]=useState("");
const [byClass,setByClass]=useState("");
const [byGender,setByGender]=useState("");

const [dataStates,setDataState]=useState([]);


async function getStudentAllData(){
try {
  const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/student/fetchstudentdata`,{
    method: "GET",
    headers:{
        "Content-Type": "application/json",
        "auth-Token": `${localStorage.getItem("token")}`
            }
});
let json=await res.json();

setDataState(json);
setFilterData(json);
} catch (error) {
  console.log(error);
}
} 

useEffect(()=>{

getStudentAllData();


},[])
const filterDataFunction=()=>{

//1. if name,gender,class
if(byName&&byGender&&byClass){

let data=dataStates.filter((itm)=>{
return (itm.studentName.toLowerCase().includes(`${byName}`)&& itm.className.toLowerCase()===`${byClass}`&& itm.gender.toLowerCase()===`${byGender}`);
})
setFilterData(data);
}


//2. by name and class
else if(byName&&byClass){

let data=dataStates.filter((itm)=>{
return (itm.studentName.toLowerCase().includes(`${byName}`)&& itm.className.toLowerCase()===`${byClass}`);
})
setFilterData(data);
}
//3. by name and gender
else 
if(byName&&byGender){

let data=dataStates.filter((itm)=>{
return (itm.studentName.toLowerCase().includes(`${byName}`)&& itm.gender.toLowerCase()===`${byGender}`);
})
setFilterData(data);
}


//4. by class and gender
else 
if(byClass&&byGender){

let data=dataStates.filter((itm)=>{
return (itm.className.toLowerCase()===`${byClass}`&& itm.gender.toLowerCase()===`${byGender}`);
})
setFilterData(data);
}

//5. by name
else if(byName){
let data=dataStates.filter((itm)=>{
return itm.studentName.toLowerCase().includes(`${byName}`);
})
setFilterData(data);
}

//6. by class
else if(byClass){
let data=dataStates.filter((itm)=>{
return itm.className.toLowerCase()===`${byClass}`;
})
setFilterData(data);
}
// 7. by gender
 else if(byGender){
let data=dataStates.filter((itm)=>{
return itm.gender.toLowerCase()===`${byGender}`;
})
setFilterData(data);
}
// 8. if not
if(!byName&&!byClass&&!byGender){

getStudentAllData();
}

}
async function deleteStudentRecord(e){
setIdOfStudentData(e);

try {
confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to delete this record ?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {
          const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/student/deletestudentdata/${e._id}`,{
    method: "DELETE",
    headers:{
        "Content-Type": "application/json",
        "auth-Token": `${localStorage.getItem("token")}`
            }
});

if(res.status===404){
toast.success("This Is Data Of Different User / Deleting Data Is Not Allowed", {
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
toast.success("Please Login Again", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
if(res.status===500){
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
navigate('/deleteStudent');
getStudentAllData();
}

          }
        },
        {
          label: 'No',
          onClick: () => {
navigate('/deleteStudent');
          
          }
        }
      ]
    });


   

} catch (error) {
    console.log(error)
}
}

  return (
     <div className='updateStudents'>
     
    <LeftSideMenu />
    


    <div className="updateStudent">
    <TopBar />

    <h6>DELETE STUDENT RECORD</h6>
    <PageStatus pageLink="/" MainHeading="STUDENT" currentPage="DELETE RECORDS"/>
<div className="tables">
   <div className="searchFilter">
      <h4>search here to filter data</h4>
      <div className="searchBar">
      <input type="text" name="name" placeholder='Search by Name...' value={byName} onChange={(e)=>{setByName(e.target.value.toLowerCase())}} />
      <input type="text" name="class" placeholder='Search by Class...' value={byClass} onChange={(e)=>{setByClass(e.target.value.toLowerCase())}}/>
      <input type="text" name="class" placeholder='Search by Gender...'value={byGender} onChange={(e)=>setByGender((e.target.value.toLowerCase()))} />
      <button onClick={filterDataFunction}>Search</button>
      </div>
        </div>

    <div className="searchAllStudent"></div>
    <div className="main-table" style={{marginTop:"-8%"}}>


  
    {(filterData.length===0) ? "NO RECORD FOUND":<>
    <h6>Click on the Record To Delete</h6>
        <div className="th">
<div id="name">Student Name</div>
<div id="age">Age</div>
<div id="gender">Gender</div>
<div id="class">Class</div>
<div id="year">Year</div>
<div id="op">-</div>
</div> 



{filterData.slice(0,15).map((items,ind)=>{
return <div key={items._id}><div className="td" onClick={()=>deleteStudentRecord(items)}>
<div id="name">{items.studentName}</div>
<div id="age">{(items.age)? items.age :"-"}</div>
<div id="gender">{(items.gender)? items.gender  : "-"}</div>
<div id="class">{items.className}</div>
<div id="year">{(items.year) ? items.year : "-"}</div>
<div id="op" >
<MdOutlineDeleteOutline id="menu" />
</div>




</div>



</div>
})}
</>}





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
