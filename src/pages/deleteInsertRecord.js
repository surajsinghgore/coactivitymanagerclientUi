import {  useEffect,useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import '../css/updateInsertRecord.css';
import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import '../css/monthWiseList.css';

export default function DeleteInsertRecords() {
const navigate=useNavigate();

const [month,setMonth]=useState("");
const [years,setYears]=useState("");
const [rno,setRno]=useState("");
const[demos,setDemos]=useState([]);

const [fetchData,setFetchData]=useState([]);


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
setDemos(json);

if(!json){
navigate("/admin");
}
} catch (error) {
  console.log(error);
}
} 




const filter=()=>{
// if all
if(rno&&month&&years){
var filteredArray = fetchData.filter(element => element.activities
  .some((activities)=> activities.Year.toLowerCase().includes(years)&&activities.Month.toLowerCase().includes(month)&& (activities.RashidNumber.toLowerCase()===rno)))
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.Year.toLowerCase().includes(years) && subElement.Month.toLowerCase().includes(month)&&(subElement.RashidNumber.toLowerCase()===rno))})
  return n;
})

setDemos(filteredArray);
}



// if rno and year
 else if(rno&&years){
var filteredArray = fetchData.filter(element => element.activities
  .some((activities)=> activities.Year.toLowerCase().includes(years)&& (activities.RashidNumber.toLowerCase()===rno)))
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.Year.toLowerCase().includes(years) &&(subElement.RashidNumber.toLowerCase()===rno))})
  return n;
})

setDemos(filteredArray);
}


// if  month and year
else if(month&&years){

var filteredArray = fetchData.filter(element => element.activities
  .some(activities => activities.Month.toLowerCase()===`${month}`&& activities.Year.toLowerCase().includes(years))
)
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.Year.toLowerCase()===`${years}`&&subElement.Month.toLowerCase().includes(month)
  )})
  return n;
})
setDemos(filteredArray);
}

// if rno and month
else if(rno&&month){

var filteredArray = fetchData.filter(element => element.activities
  .some(activities => activities.RashidNumber.toLowerCase()===`${rno}`&& activities.Month.toLowerCase().includes(month))
)
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.RashidNumber.toLowerCase()===`${rno}`&&subElement.Month.toLowerCase().includes(month)
  )})
  return n;
})
setDemos(filteredArray);
}


// if rashidNumber
else if(rno){

var filteredArray = fetchData.filter(element => element.activities
  .some(activities => activities.RashidNumber.toLowerCase()===`${rno}`)
)
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.RashidNumber.toLowerCase()===`${rno}`
  )})
  return n;
})
setDemos(filteredArray);
}

// if month
else if(month){
var filteredArray = fetchData.filter(element => element.activities
  .some(activities => activities.Month.toLowerCase().includes(month))
)
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.Month.toLowerCase().includes(month)
  )})
  return n;
})
setDemos(filteredArray);
}
// if year
else if(years){

var filteredArray = fetchData.filter(element => element.activities
  .some(activities => activities.Year.toLowerCase().includes(years))
)
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.Year.toLowerCase().includes(years)
  )})
  return n;
})
setDemos(filteredArray);
}

// if nothing
if(!rno&&!month&&!years){
console.log("fire31")

getStudentAllData();
}
}



useEffect(()=>{
getStudentAllData();

},[])


// delete records
const deleteInsertRecord=async(itm,item)=>{

try {
confirmAlert({
      title: 'Confirm to Delete This Insert Record ',
      message: 'Are you sure to Delete this Insert Record?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () => {  
   const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/addRecord/deleteRecords/${item._id}/${itm._id}`,{
   method:"DELETE",
   headers:{
   "Content-Type":"application/json",
   "auth-token":`${localStorage.getItem("token")}`
   }
   }) 
if(res.status===404){
toast.warn("RECORD NOT FOUND", {
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
toast.success("Insert Record Successfully Deleted", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
getStudentAllData();
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
}
catch (error) {
   console.log(error) 
}



}
  return (
    <div className='updateInsertRecords'>
     <LeftSideMenu />
    <div className="updateInsertRecordsRight">
    <TopBar />
    <h1>Click on Activity Which Wanted to Delete</h1>
<div className="tt">
<div className="searchBox">
<h4>filter records</h4>
 <input type="text" name="year" id="year" value={rno} onChange={(e)=>setRno(e.target.value.toLowerCase())} placeholder='Enter Rashid Number..'/>
<select id='gMonth2'  value={month} onChange={(e)=>setMonth(e.target.value.toLowerCase())}>
    <option value=''>--Select Month--</option>
    <option  value='1'>Janaury</option>
    <option value='2'>February</option>
    <option value='3'>March</option>
    <option value='4'>April</option>
    <option value='5'>May</option>
    <option value='6'>June</option>
    <option value='7'>July</option>
    <option value='8'>August</option>
    <option value='9'>September</option>
    <option value='10'>October</option>
    <option value='11'>November</option>
    <option value='12'>December</option>
    </select> 

    <input type="number" name="year" id="year" value={years} onChange={(e)=>setYears(e.target.value)} placeholder='Enter Year..'/>
    <button onClick={filter}>Search Record</button>
</div>
{(demos.length===0)?<h1>NO RECORD FOUND</h1>:<>
<div className="th2">
<div className="RollNumber2">Roll Number</div>
<div className="name2">Student Name</div>
<div className="age2">Age</div>
<div className="class2">Class Name</div>
<div className="section2">Section</div>
<div className="gender2">Gender</div>
</div>
</>}


<div className="data" >
{demos.slice(0,15).map((item,ind)=>{
return(
<div key={item._id}>
{(item.activities.length===0)? "" :<>
<div className="td2" key={item._id}  >
<div className="RollNumber2" >{item.rollNumber}</div>
<div className="name2">{item.studentName}</div>
<div className="age2">{(item.age)? item.age:"-"}</div>
<div className="class2">{item.className}</div>
<div className="section2">{item.section}</div>
<div className="gender2">{item.gender}</div>


</div>
{(item.activities.length===0)? "" :<>
 <div id="show">
<div className="th3">
<div className="date3">R.No</div>
<div className="activityname3" style={{width:"250px"}}>Activity Name</div>
<div className="fee3">Fee</div>
<div className="date3">Pay Date</div>
<div className="month3">Pay Month</div>
<div className="year3">Pay Year</div>
<div className="opt3">-</div>
</div>

{item.activities.map((itm,ind)=>{
return (
<div className="td3" onClick={()=>deleteInsertRecord(itm,item)}  key={itm._id}>
<div className="date3">{itm.RashidNumber}</div>
<div className="activityname3" style={{width:"250px"}}>{itm.ActivityName}</div>
<div className="fee3">{itm.Fee}</div>
<div className="date3">{itm.Date}</div>
<div className="month3">{itm.Month}</div>
<div className="year3">{itm.Year}</div>
<div className="opt3"  style={{cursor:"pointer"}} ><MdOutlineDeleteOutline id="icon"/></div>
</div>
)
})}
</div> 
</>}
 </>}
</div>
)
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
