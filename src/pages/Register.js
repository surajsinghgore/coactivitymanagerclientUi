import React,{ useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/register.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {

useEffect(()=>{
if(localStorage.getItem("token")){
navigate("/admin");
}
})


const navigate = useNavigate("");
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [mobile,setMobile]=useState("");
const [dob,setDob]=useState("");
const [gender,setGender]=useState("male");
const[designation,setDesignation]=useState("");
const [password,setPassword]=useState("");
const [cpassword,setcPassword]=useState("");

const sendData=async (e)=>{
e.preventDefault();


try {
const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/register`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        
    },
    body: JSON.stringify({
        name,email,mobile,dob,gender,designation,password,cpassword
    })
});

// field empty warings
if(res.status===400){
let ress=await res.json();
for(let i=0;i<ress.errors.length;i++){
if(i<1){
  toast.warn(`${ress.errors[i].msg}`, {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
continue;
}
}
return 0;
}
// confirm password empty
if(!cpassword){
toast.warn("Please Enter confirm password ", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;
}
if(!dob){
toast.warn("Enter Our Dob", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;

}
if(!gender){
toast.warn("Enter Our Gender", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;

}
if(!designation){
toast.warn("Enter Our Designation", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;

}
// password and confrim password not match
if(cpassword!==password){
  toast.warn("password and confirm password not match", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;

}
// check weather email id already used or not
if(res.status===422){
  toast.warn("This email Id Is Already Used, Please Enter Different Email Account", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;

}

if(res.status===423){
  toast.warn("This Mobile Number Is Already Used, Please Enter Different Mobile Number", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
return 0;

}
if(res.status===201){
toast.success("Account Successfully Created", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate('/login');
}

} catch (error) {
	toast.error("Sorry Internal Server Error, Please Try After Sometime", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}

}

   return (
   <div className="container1">
	<div className="screen1">
		<div className="screen__content1">
			<form className="login1" onSubmit={sendData}>
            <div className="login__field1">
					<i className="login__icon1 fas fa-user"></i>
					<input type="text" className="login__input" value={name}
					onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name"/>
				</div>
        
				<div className="login__field1">
				<i className="login__icon1 fa-solid fa-at"></i>
					<input type="text" className="login__input1" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email Id"/>
				</div>
                 <div className="login__field1">
					<i className="login__icon1 fa-solid fa-mobile"></i>
					<input type="number" className="login__input" onChange={(e)=>setMobile(e.target.value)} value={mobile} placeholder="Enter Your Mobile Number"/>
				</div>
				<div className="login__field1">
					<i className="login__icon1" style={{fontWeight:"800"}}>DOB</i>
					<input type="date" className="login__input1" onChange={(e)=>setDob(e.target.value)}  value={dob} placeholder="dob" id="date"/>
				</div>
				<div className="login__field1">
					<i className="login__icon1 fa-solid fa-venus-double"></i>
				
<select name="gender" defaultValue="male" onChange={(e)=>setGender(e.target.value)}>
<option value="male" >Male</option>
<option value="female" >Female</option>
<option value="transgender" >Transgender</option>
</select>

				</div>
				<div className="login__field1">
					<i className="login__icon1 fa-solid fa-question"></i>
					<input type="text" className="login__input1" onChange={(e)=>setDesignation(e.target.value)}  value={designation}placeholder="Designation"/>
				</div>
				<div className="login__field1">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input1" onChange={(e)=>setPassword(e.target.value)}  value={password}placeholder="Password"/>
				</div>
                <div className="login__field1">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" onChange={(e)=>setcPassword(e.target.value)} value={cpassword}
					placeholder="Confirm Password"/>
				</div>
				<button className="button login__submit1">
					<span className="button__text" >Register Now</span>
					<i className="button__icon1 fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login1">
				<h3><Link to="/login">Login ? </Link></h3>
			</div>
		</div>
		<div className="screen__background1">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape22"></span>		
			<span className="screen__background__shape screen__background__shape22"></span>
			<span className="screen__background__shape screen__background__shape22"></span>
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
