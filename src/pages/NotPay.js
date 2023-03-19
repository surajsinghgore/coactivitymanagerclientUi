import {  useEffect,useState } from 'react';
import '../css/thisMonth.css';
import {  Link, useNavigate } from 'react-router-dom';

import '../css/updateInsertRecord.css';
import LeftSideMenu from '../props/LeftSideMenu';
import TopBar from '../props/TopBar';
import '../css/monthWiseList.css';
let dates=new Date();
export default function NotPay() {
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const navigate=useNavigate();
const [studentName,setStudentName]=useState("");
const [classes,setClasses]=useState("");
const[pay,setPay]=useState([]);
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
var filteredArray = json.filter(element => !element.activities
  .some((activities)=> activities.Month.toLowerCase().includes(months)&& activities.Year.toLowerCase().includes(years)))
.map(element => {
  let n = Object.assign({}, element, {'activities': element.activities.filter(
    subElement => subElement.Year.toLowerCase()==`${years}`&&subElement.Month.toLowerCase().includes(months))})
  return n;
})
setPay(filteredArray)
setDemos(filteredArray)
setLen(filteredArray.length);


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


if(!classes&&!studentName){
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
<h4 id="len">Total Records  : {len}</h4>
<h1 style={{color:"blue"}}>{monthNames[dates.getMonth()]}</h1>
<div className="searchBox">
<h4>filter records</h4>
    <input type="text" name="student"  value={studentName} onChange={(e)=>setStudentName(e.target.value.toLowerCase())} placeholder='Enter Student Name..'style={{marginLeft:"3%",width:"300px"}}/>
     <input type="text" name="class"  value={classes} onChange={(e)=>setClasses(e.target.value.toLowerCase())} placeholder='Enter Class..'style={{marginLeft:"3%",width:"300px"}}/>
    <button onClick={filter} style={{marginLeft:"5%"}}>Search Record</button>
</div>
<div className="statuss" style={{borderBottom:"3px solid rgb(215, 5, 5)"}}>
<Link to="/thisMonth"><button id="pay" style={{color:"rgb(34, 34, 34)",
backgroundColor:" rgb(213, 213, 213)"}}>Paid</button></Link>
<Link to="/notPay"><button id="notPay" style={{backgroundColor: "rgb(215, 5, 5)",color:"white",cursor:"text"}}>Unpaid</button></Link>
</div>


 {(demos.length===0)?<h1>NO RECORD FOUND</h1> : <>
    <h1 id="pays" style={{color:"rgb(215, 5, 5)",borderBottom:"3px solid rgb(215, 5, 5)"}}>All NOT Paid Records</h1>
<div className="th2" style={{marginBottom:"0px"}}>
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
</div>
)
})}
</div>
    </div>
    </div>
    </div>
  )
}
