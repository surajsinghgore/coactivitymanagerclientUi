import {  useEffect,useState } from 'react';
import '../css/thisMonth.css';
import {  Link, useNavigate } from 'react-router-dom';

import '../css/updateInsertRecord.css';
import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import '../css/monthWiseList.css';
let dates=new Date();
export default function ThisMonth() {
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const navigate=useNavigate();
const [rno,setRno]=useState("");
const [studentName,setStudentName]=useState("");
const [classes,setClasses]=useState("");
const[pay,setPay]=useState([]);
const[amount,setAmount]=useState("");
const[len,setLen]=useState("");
const[demos,setDemos]=useState([]);

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
let years=dates.getFullYear();

let months=dates.getMonth()+1;
var filteredArray = json.filter(element => element.activities
  .some((activities)=> activities.Month.toLowerCase().includes(months)&& activities.Year.toLowerCase().includes(years)))
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.Year.toLowerCase()==`${years}`&&subElement.Month.toLowerCase().includes(months))})
  return n;
})
setLen(filteredArray.length);

setPay(filteredArray)
setDemos(filteredArray)

const sumall = filteredArray.map((item)=>item.activities.map((itm)=>itm.Fee))
let total=sumall.reduce((prev, cur) =>{
let p=parseInt(prev);
let c=parseInt(cur);
return p + c;
});
setAmount(total);

if(!json){
navigate("/admin");
}
else{

}
} catch (error) {
  console.log(error);
}
} 







const filter=()=>{

if(studentName&&classes){

let data=pay.filter((itm)=>{
return (itm.studentName.toLowerCase().includes(`${studentName}`)&& itm.ClassName.toLowerCase()===`${classes}`);
})
setDemos(data);
}


else if(studentName){
let data=pay.filter((itm)=>{
return itm.studentName.toLowerCase().includes(`${studentName}`);
})
setDemos(data);
}

else if(classes){
let data=pay.filter((itm)=>{
return itm.className.toLowerCase()===`${classes}`;
})
setDemos(data);
}
else if(rno){
var filteredArray = pay.filter(element => element.activities
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

if(!rno&&!classes&&!studentName){
getStudentAllData();
}

}



useEffect(()=>{
getStudentAllData();
},[])




  return (
    <div className='updateInsertRecords'>
     <LeftSideMenu />
    <div className="updateInsertRecordsRight">
    <TopBar />
   <h1>This are the list of fee collection</h1>
<div className="tt">
<h1 style={{color:"blue"}}>{monthNames[dates.getMonth()]} </h1>
<h4 id="len">Total Records  : {len}</h4>

<div className="searchBox">
<h4>filter records</h4>
 <input type="text" name="year" id="year" value={rno} onChange={(e)=>setRno(e.target.value.toLowerCase())} placeholder='Enter Rashid Number..' style={{marginLeft:"3%"}}/>
    <input type="text" name="student"  value={studentName} onChange={(e)=>setStudentName(e.target.value.toLowerCase())} placeholder='Enter Student Name..'style={{marginLeft:"3%"}}/>
     <input type="text" name="class"  value={classes} onChange={(e)=>setClasses(e.target.value.toLowerCase())} placeholder='Enter Class..'style={{marginLeft:"3%"}}/>
    <button onClick={filter} >Search Record</button>
</div>
<div className="statuss">
<Link to="/thisMonth"><button id="pay" style={{cursor:"text"}}>Paid</button></Link>
<Link to="/notPay"><button id="notPay">Unpaid</button></Link>
<div id="feeTotal">Total Month Collection : <span id="amount">{amount}</span></div>
</div>


 {(demos.length===0)?<h1>NO RECORD FOUND</h1> : <>
    <h1 id="pays">All Paid Records</h1>
<div className="th2">
<div className="name2">Student Name</div>
<div className="age2">Age</div>
<div className="class2">Class Name</div>
<div className="gender2">Gender</div>
</div>

    </>}





<div className="data" >
{demos.map((item)=>{
return(
<div key={item._id}>
<div className="td2" key={item._id}  >
<div className="name2">{item.studentName}</div>
<div className="age2">{(item.age)? item.age:"-"}</div>
<div className="class2">{item.className}</div>
<div className="gender2">{item.gender}</div>
</div>
 <div id="show">
<div className="th3">
<div className="date3">R.NO</div>
<div className="activityname3" style={{width:"250px"}}>Activity Name</div>
<div className="fee3">Fee</div>
<div className="date3">Pay Date</div>
<div className="month3">Pay Month</div>
<div className="year3">Pay Year</div>
</div>
{item.activities.map((itm)=>{
return (
<div className="td3" key={itm._id}>
<div className="date3">{itm.RashidNumber}</div>
<div className="activityname3" style={{width:"250px"}}>{itm.ActivityName}</div>
<div className="fee3">{itm.Fee}</div>
<div className="date3">{itm.Date}</div>
<div className="month3">{itm.Month}</div>
<div className="year3">{itm.Year}</div>

</div>
)
})}
</div> 
</div>
)
})}
</div>
    </div>
    </div>
    </div>
  )
}
