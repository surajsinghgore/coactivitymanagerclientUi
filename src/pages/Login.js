import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {

const navigate = useNavigate();
useEffect(()=>{
if(localStorage.getItem("token")){
navigate("/admin");
}

})


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


const loginFunction=async(e)=>{
e.preventDefault();

if(email===""){
toast.warn("Please Fill Email/Mobile Field", {
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
if(password===""){
toast.warn("Please Enter Password", {
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



let mobile=parseInt(email);
if(!mobile){
// login using email
try{
const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/login`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        
    },
    body: JSON.stringify({
        email,password
    })
});



if(res.status===401){
toast.warn("Invalid Email Id", {
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
if(res.status===402){
toast.warn("Password Is Incorrect", {
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
let token=await res.json();

if(token.token){
localStorage.setItem("token",token.token)
}
if(res.status===201){
toast.success("Successfully Login", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate('/admin');
  }
}
catch(e){
console.log(e)
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
// login with mobile and password
else{

try{
let mobile=parseInt(email);
const res=await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/login`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        
    },
    body: JSON.stringify({
        mobile,password
    })
});

if(res.status===401){
toast.warn("Invalid Mobile Number", {
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
if(res.status===402){
toast.warn("Password Is Incorrect", {
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





let token=await res.json();
if(token.token){
localStorage.setItem("token",token.token)
}
if(res.status===201){
toast.success("Successfully Login", {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
navigate('/admin');
}

}catch(e){
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



}


  return (
   <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" onChange={(e)=>setEmail(e.target.value.toLowerCase())} 
					value={email} placeholder="Email Id / Mobile No" required/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" 
				 onChange={(e)=>setPassword(e.target.value)}
					value={password}
					placeholder="Password" required/>
				</div>
				<button className="button login__submit" onClick={loginFunction}>
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
			<h3><Link to="/register">Register Now ? </Link></h3>	
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
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
