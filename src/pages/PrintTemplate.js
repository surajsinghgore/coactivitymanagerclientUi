import '../css/printTemplate.css';
import React, { useRef ,useContext, useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import StudentContext from '../context/StudentContext';
import { Link, useNavigate } from 'react-router-dom';
const numberWords = require('number-words');








export default function PrintTemplate() {
const navigate=useNavigate();
 let componentRef = useRef();
const {getStudentData,getInsertRecord}=useContext(StudentContext);
const [names,setNames]=useState(getStudentData.studentName);
const [rashid,setRashid]=useState(getInsertRecord.RashidNumber);
const [fee,setFee]=useState(getInsertRecord.Fee);
const [date,setDate]=useState(getInsertRecord.Date);
const [month,setMonth]=useState(getInsertRecord.Month);
const [year,setYear]=useState(getInsertRecord.Year);
const fulldate=date+"/"+month+"/"+year;
const [activity,setActivity]=useState(getInsertRecord.ActivityName);
const[word,setWords]=useState(numberWords.convert(fee));


useEffect(()=>{
if(getStudentData.length===0&&getInsertRecord.length===0){
navigate("/downloadPdf");
}
if(getStudentData.length===0){
navigate("/downloadPdf");
}
if(getInsertRecord.length===0){
navigate("/downloadPdf");
}
},[])


  return (
  <>
  <ReactToPrint
          trigger={() => <button id="button">Click Here To Print</button>}
          content={() => componentRef} />
<Link to="/downloadPdf"><button id="back">Go Back</button></Link>

    <div className='demos' ComponentToPrint ref={(el) => (componentRef = el)}>
    <div className="names">
    <h2>Strawberry Fields Hight School</h2>
    <p>unser the auspices of the Durga Das Foundation</p>
    <p>Sector 26, Chandigarh.</p>
    <p>Phone: 2795903 / 2795904</p>
    </div>
    <div className="number">
    <p><span id="no">No. <span id="rno">{rashid}</span></span> <span id="date">Dated <span id="d">{fulldate}</span></span></p>
    </div>
    <div className="msg">
    Received with thanks from <span id="owner">{names}</span> a sum of rupees <span id="rupee">{word}</span>on account of <span id="game">{activity} </span> by cash/cheque/draf no.  &nbsp;&nbsp;____________________
    </div>
    <div className="bottom">

<p><span id="rs">Rs.<span id="amount">{fee}</span></span> <span id="found">For <span id="foundName">Durga Das Foundation</span> </span></p>
    </div>
    </div>
    </>
  )
}
