import React,{ useState } from 'react'
import StudentContext  from './StudentContext'



const StudentState=(props)=>{
const [getsCoActivity,setUpdateActivity]=useState("");
const [getIdOfStudentData,setIdOfStudentData]=useState("");
const [getStudentData,setStuentData]=useState([]);
const [getInsertRecord,setInsertRecod]=useState([]);
return(
<StudentContext.Provider value={{getIdOfStudentData,setIdOfStudentData,getsCoActivity,setUpdateActivity,getStudentData,setStuentData,getInsertRecord,setInsertRecod}}>
{props.children}
</StudentContext.Provider>
)
}


export default StudentState;