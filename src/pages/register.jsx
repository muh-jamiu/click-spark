import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'
import { useSearchParams } from 'react-router-dom'

export default function Register() {
  const [cookie, setCookie] = useCookies("")
  const [email, setEmail] = useState("")
  const [role, setrole] = useState("user")
  const [password, setPassword] = useState("")
  const userEmail = useRef("")
  const userPhone= useRef("")
  const username= useRef("")
  const userPassword = useRef("")
  const confirm_password = useRef("")
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = searchParams.get("ref")
 

  useEffect(() => {
    var focus = document.querySelectorAll(".focus")
    focus = document.querySelectorAll(".focus")
    var move_up = document.querySelectorAll(".move_up")
    focus.forEach((val, index) => {
      focus[index].addEventListener("focusin",() => {
        move_up[index].classList.add("active")
        focus[index].classList.add("active")
      })

      val.addEventListener("keydown", () => {
        move_up[index].classList.add("active")
        focus[index].classList.add("active")
      })
    })
  })

  const alert = (icon, msg) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: icon,
        title: msg
      });
  }

  const signUp = e => {
    e.preventDefault()
    if(userPassword.current.value != confirm_password.current.value){
      alert("error", "Password does not match")
      return;
    }
    var submitbtn = document.querySelector(".submitbtn")
    submitbtn.innerHTML = `<div class="spinner-border spinner-border-sm"></div>`
    axios.post(`/earn/signup?ref=${ref}`, {
      email : userEmail.current.value,
      phone : userPhone.current.value,
      fullname : username.current.value,
      password : userPassword.current.value,
    })
    .then(res => {
      console.log(res)
      if(res.data.message == "user already exist"){
        alert("error", res.data.message)
      }else{
        alert("success", "signup was successful")
        setCookie("SparkUser", res.data.user)
        window.location.href = "/dashboard"
      }
      submitbtn.innerHTML = `Sign up`
    })
    .catch(err => {
      alert("error", "invalid credentials")
      console.log(err)
      submitbtn.innerHTML = `Sign up`
    })
  }


  return (
    <div className='login d-flex'>
      <div className="img">
        <img src="" alt="" />
      </div>

      <div className="form pb-5">
        <a href="/" className='text-dark green mb-4'><h2 className="text-center mt-5 fw-bold"><i class="fa-solid fa-computer-mouse"></i> Click Spack</h2></a>
        <h4 className="text-center fw-bold">Sign up to Continue</h4>
        <p className="mb-0 text-center mt-3 alt">Already have an account? <a href="/login" className='mx-2'>Login in</a></p>

        <form action="" onSubmit={signUp}>
          <div className="inputs mt-3">
            <div className="text">
                <input ref={userEmail} required className='focus' type="email" />
                <p className='move_up'>Email</p>
            </div>
            <div className="text">
                <input ref={username} required className='focus' type="text" />
                <p className='move_up'>Full Name</p>
            </div>
            <div className="text">
                <input ref={userPhone} required className='focus' type="text" />
                <p className='move_up'>Phone Number</p>
            </div>
            <div className="text">
                <input ref={userPassword} required className='focus' type="password" />
                <p className='move_up'>Password</p>
            </div>
            <div className="text">
                <input ref={confirm_password} required className='focus' type="password" />
                <p className='move_up'>Confirm Password</p>
            </div>            

            <div className="text-center">
                <button className='btn submitbtn'>Sign up</button>
            </div>
            
              {/* <p className="text-center mt-4">Or sign up using </p>
              <div className="social d-flex text-center">
                <p className="mb-0"><i class="fa-brands fa-google text-danger"></i></p>
                <p className="mb-0 mx-4"><i class="fa-brands fa-facebook text-primary"></i></p>
              </div> */}
          </div>
        </form>
      </div>
    </div>
  )
}
