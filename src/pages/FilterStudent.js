import LeftSideMenu from '../props/LeftSideMenu';
import PageStatus from '../props/PageStatus';
import TopBar from '../props/TopBar';
import '../css/addStudent.css';
import React,{ useEffect, useState } from 'react';
import boy from '../images/boy.webp';
import girl from '../images/girl.webp';
import "../css/allStudentRecords.css";
import '../css/filterSearch.css';

export default function FilterStudent() {

const [dataStates,setDataState]=useState([]);
const [filterData,setFilterData]=useState([]);
const [byName,setByName]=useState("");
const [byClass,setByClass]=useState("");
const [byGender,setByGender]=useState("");
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


},[]);



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



  return (
     <div className='addStudent'>
     
    <LeftSideMenu />
    


    <div className="rightSideStudent">
    <TopBar />

    <h6>STUDENT</h6>
    <PageStatus pageLink="/" MainHeading="STUDENT" currentPage="FILTER STUDENT"/>
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
  <div className="main-table">
 {(filterData.length===0) ? "NO RECORD FOUND"  :<>
  <div className="th">
<div id="profile">Profile</div> 
<div id="name">Student Name</div>
<div id="age">Age</div>
<div id="gender">Gender</div>
<div id="email">Email</div>
<div id="mobile">Mobie</div>
<div id="dob">Dob</div>
<div id="class">Class</div>
<div id="year">Year</div>
<div id="blood">Blood Group</div>
<div id="address">Address</div>
</div>
{filterData.slice(0,15).map((items,ind)=>{
return <div key={items._id}><div className="td" >
<div id="profile">{(items.gender==="Male")? <img src={boy} alt={boy}/>: <img src={girl} alt={girl}/>}</div>
<div id="name">{items.studentName}</div>
<div id="age">{(items.age)? items.age :"-"}</div>
<div id="gender">{(items.gender)? items.gender  : "-"}</div>
<div id="email">{(items.email)? items.email : "-"}</div>
<div id="mobile">+91 {(items.mobile)? items.mobile : "-"}</div>
<div id="dob">{(items.dob)?items.dob : "-"}</div>
<div id="class">{items.className}</div>
<div id="year">{(items.year) ? items.year : "-"}</div>
<div id="blood">{(items.bloodGroup) ? items.bloodGroup : "-"}</div>
<div id="address">{(items.address) ? items.address : "-"}</div>
</div>

</div>
})}
 </> }






 </div>
</div>
</div>       
    </div>
  )
}
