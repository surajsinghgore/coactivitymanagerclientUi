import React,{useState} from 'react';
import "../css/leftSideMenu.css";
import logo from '../images/logo.svg';
// cons
import { FaChild } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdSystemUpdateAlt } from 'react-icons/md';
import { MdChangeCircle } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdFindInPage } from 'react-icons/md';
import { BiBookAdd } from 'react-icons/bi';
import { BsCloudDownload } from 'react-icons/bs';
import { BsCalendarMinus } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { BiGame } from 'react-icons/bi';
import { AiOutlineMobile } from 'react-icons/ai';
import { CgInsertAfterR } from 'react-icons/cg';
import { AiOutlineMail } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { BsClipboardData } from 'react-icons/bs';
import { GoDiffModified } from 'react-icons/go';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { AiOutlineFolderView } from 'react-icons/ai';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdSecurityUpdateGood } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function LeftSideMenu() {
const [statesStudent,setStundentStates]=useState(false);
const [statesPesonal,setPersonalStates]=useState(false);
const [statesCoActivity,setCoActivityStates]=useState(false);
const [insertRecords,setInsertRecords]=useState(false);
const navigate = useNavigate();


// toggle Co Activity
const toogleActivitySubMenu=()=>{
if(statesCoActivity===false){
document.getElementById("coActivityData").style.display="block";
setCoActivityStates(true);
}
else{
document.getElementById("coActivityData").style.display="none";
setCoActivityStates(false);
}
}
// toggle personal menu
const tooglePerosnalSubMenu=()=>{
if(statesPesonal===false){
document.getElementById("personalData").style.display="block";
setPersonalStates(true);
}
else{
document.getElementById("personalData").style.display="none";
setPersonalStates(false);
}
}

// toggle student menu
const toggleStudentSubMenu=()=>{
if(statesStudent===false){
document.getElementById("studentData").style.display="block";
setStundentStates(true);
}
else{
document.getElementById("studentData").style.display="none";
setStundentStates(false);
}
}

// toggle insert records
const toggleInsertRecordsSubMenu=()=>{
if(insertRecords===false){
document.getElementById("insertRecords").style.display="block";
setInsertRecords(true);
}
else{
document.getElementById("insertRecords").style.display="none";
setInsertRecords(false);
}
}



const Logout=()=>{
localStorage.removeItem("token");
navigate("/login");

}
  return (
     <div className="left-section">
    <div className="logo-section">
    <div className="logo"><img src={logo} alt={logo} id="logo"/></div>
    </div>
    {/* links */}
    {/* students */}
    <div className="links">
    <li onClick={toggleStudentSubMenu}><FaChild id="outIcon"/> STUDENT   
    {(statesStudent)?<IoIosArrowDown id="arrows"/>: <IoIosArrowForward id="arrows" />}</li>
    <ul id="studentData">
    <Link to="/addStudent"><li><IoMdAddCircleOutline id="inIcon"/> ADD STUDENT</li></Link>
      <Link to="/filterStudent"><li><MdFindInPage id="inIcon" /> FILTER RECORDS</li></Link>
    <Link to="/updateStudent"><li><BiBookAdd id="inIcon" /> UPDATE STUDENT RECORDS</li></Link>
    <Link to="/allStudentRecords"><li><BsClipboardData id="inIcon" /> SEE ALL RECORDS</li></Link>
    <Link to="/deleteStudent"><li><AiFillDelete id="inIcon" /> DELETE STUDENT RECORDS</li></Link>
    </ul>



{/* insert records */}
    <li onClick={toggleInsertRecordsSubMenu}><CgInsertAfterR id="outIcon"/>INSERT RECORD
   {(insertRecords)?<IoIosArrowDown id="arrows"/>: <IoIosArrowForward id="arrows" />}
    </li>
   <ul id="insertRecords">
        <Link to="/insertRecords"><li><AiOutlineFileAdd id="inIcon" /> INSERT STUDENT RECORDS</li></Link>
      <Link to="/updateInsertRecord"><li><GoDiffModified id="inIcon" /> UPDATE INSERT RECORDS</li></Link>
      <Link to="/deleteInsertRecord"><li><AiFillDelete id="inIcon" /> DELETE INSERT RECORDS</li></Link>
      <Link to="/viewSpecificRecords"><li><BsFillPersonCheckFill id="inIcon" /> VIEW SPECIFIC RECORDS</li></Link>
      <Link to="/monthwise"><li><AiOutlineCalendar id="inIcon" /> VIEW MONTHLY RECORDS</li></Link>
      <Link to="/downloadPdf"><li><BsCloudDownload id="inIcon" /> DOWNLOAD RECORDS</li></Link>
   <Link to="/thisMonth"><li><BsCalendarMinus id="inIcon" /> THIS MONTH FEE RECORD</li></Link>
    </ul>



{/* co activity manage */}
 
    <li onClick={toogleActivitySubMenu}><BiGame id="outIcon"/>CO ACTIVITY
   {(statesCoActivity)?<IoIosArrowDown id="arrows"/>: <IoIosArrowForward id="arrows" />}
    </li>
   <ul id="coActivityData">
   <Link to="/addActivity"> <li><AiFillFileAdd id="inIcon"/> ADD ACTIVITY</li></Link>
   <Link to="/updateCoActivity"><li><MdSecurityUpdateGood id="inIcon"/>UPDATE ACTIVITY</li>
   </Link> <Link to="/deleteCoActivity"><li><AiFillDelete id="inIcon"/>DELETE ACTIVITY</li></Link> 
   <Link to="/viewActivity"><li><AiOutlineFolderView id="inIcon"/> VIEW ACTIVITY</li></Link> 
    </ul>

    
   {/* personal */}
    <li onClick={tooglePerosnalSubMenu}><BsPerson id="outIcon"/>PERSONAL
   {(statesPesonal)?<IoIosArrowDown id="arrows"/>: <IoIosArrowForward id="arrows" />}
    </li>
   <ul id="personalData">
   <Link to="/updateGeneralData"> <li><MdSystemUpdateAlt id="inIcon"/> GENERAL DATA UPDATE</li></Link>
   <Link to="/personalRecord"> <li><BsFillFileEarmarkPersonFill id="inIcon"/>SEE PERSONAL DATA</li></Link>
   <Link to="/updatePassword"><li><MdChangeCircle id="inIcon"/> CHANGE PASSWORD</li></Link> 
   <Link to="/updateMobileNumer"><li><AiOutlineMobile id="inIcon"/> CHANGE MOBILE</li></Link> 
     <Link to="/updateEmailId">  <li><AiOutlineMail id="inIcon"/> CHANGE EMAIL</li></Link>
    </ul>



{/* logout */}
    <li onClick={Logout}><BiLogOut id="outIcon"/> LOGOUT </li>
    </div>
    </div>
  )
}
