import { useContext, useEffect,useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import '../css/insertRecords.css';
import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import StudentContext from '../context/StudentContext';
import '../css/filterSearch.css';

export default function InsertRecords() {
const navigate=useNavigate();
const {setStuentData}=useContext(StudentContext);
const [fetchData,setFetchData]=useState([]);
const [filterData,setFilterData]=useState([]);
const [byName,setByName]=useState("");
const [byClass,setByClass]=useState("");
const [byGender,setByGender]=useState("");
// feteching students all data
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
setFetchData(json);
setFilterData(json);

if(!json){
navigate("/admin");
}
} catch (error) {
  console.log(error);
}
} 






useEffect(()=>{
getStudentAllData();

},[])

const insertRecordsData=async(data)=>{
setStuentData(data);
navigate("/insertRecordDataForm");

}

const filterDataFunction=()=>{

//1. if name,gender,class
if(byName&&byGender&&byClass){

let data=fetchData.filter((itm)=>{
return (itm.studentName.toLowerCase().includes(`${byName}`)&& itm.className.toLowerCase()===`${byClass}`&& itm.gender.toLowerCase()===`${byGender}`);
})
setFilterData(data);
}


//2. by name and class
else if(byName&&byClass){

let data=fetchData.filter((itm)=>{
return (itm.studentName.toLowerCase().includes(`${byName}`)&& itm.className.toLowerCase()===`${byClass}`);
})
setFilterData(data);
}
//3. by name and gender
else 
if(byName&&byGender){

let data=fetchData.filter((itm)=>{
return (itm.studentName.toLowerCase().includes(`${byName}`)&& itm.gender.toLowerCase()===`${byGender}`);
})
setFilterData(data);
}


//4. by class and gender
else 
if(byClass&&byGender){

let data=fetchData.filter((itm)=>{
return (itm.className.toLowerCase()===`${byClass}`&& itm.gender.toLowerCase()===`${byGender}`);
})
setFilterData(data);
}

//5. by name
else if(byName){
let data=fetchData.filter((itm)=>{
return itm.studentName.toLowerCase().includes(`${byName}`);
})
setFilterData(data);
}

//6. by class
else if(byClass){
let data=fetchData.filter((itm)=>{
return itm.className.toLowerCase()===`${byClass}`;
})
setFilterData(data);
}
// 7. by gender
 else if(byGender){
let data=fetchData.filter((itm)=>{
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
    <div className='insertRecords'>
     <LeftSideMenu />
    <div className="right">
    <TopBar />
    <h1>Click on Student Data Below to Insert Records</h1>
<div className="tables">
    <div className="searchFilter" style={{paddingBottom:"4%",marginLeft:"-5%"}}>
      <h4>search here to filter data</h4>
      <div className="searchBar">
      <input type="text" name="name" placeholder='Search by Name...' value={byName} onChange={(e)=>{setByName(e.target.value.toLowerCase())}} />
      <input type="text" name="class" placeholder='Search by Class...' value={byClass} onChange={(e)=>{setByClass(e.target.value.toLowerCase())}}/>
      <input type="text" name="class" placeholder='Search by Gender...'value={byGender} onChange={(e)=>setByGender((e.target.value.toLowerCase()))} />
      <button onClick={filterDataFunction}>Search</button>
      </div>
        </div>

{(filterData.length===0) ? "NO RECORD FOUND"  :<>
<h4 >ALL STUDENT RECORDS</h4>
<div className="th" >
<div className="name">Student Name</div>
<div className="age">Age</div>
<div className="class">Class Name</div>
<div className="gender">Gender</div>
</div>
<div className="data">
{filterData.slice(0,15).map((item)=>{
return(
<div className="td" key={item._id} onClick={()=>insertRecordsData(item)} style={{cursor:"pointer"}}>
<div className="name">{item.studentName}</div>
<div className="age">{(item.age)? item.age:"-"}</div>
<div className="class">{item.className}</div>
<div className="gender">{item.gender}</div>
</div>
)
})}
</div>

</>}



 </div>
    </div>
    </div>
  )
}
