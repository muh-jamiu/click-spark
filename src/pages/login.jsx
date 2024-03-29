import React, { useEffect, useRef, useState } from 'react'
import { CookiesProvider, useCookies } from "react-cookie";
import axios from '../utils/axios';
import { useSearchParams } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const userEmail = useRef("")
  const userPassword = useRef("")
  const [cookie, setCookie] = useCookies("")
  const CLIENT_ID = '1089248889378-hib3g0kdhtnc04u3osqh0inrj49h8ga5.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REDIRECT_URI = `${window.location.origin}/login`;
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code")
  
  useEffect(() => {
    var focus = document.querySelectorAll(".focus")
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

  const logIn = e => {
    e.preventDefault()
    var submitbtn = document.querySelector(".submitbtn")
    submitbtn.innerHTML = `<div class="spinner-border spinner-border-sm"></div>`
    axios.post("/earn/login", {
      email : userEmail.current.value,
      password : userPassword.current.value,
    })
    .then(res => {
      setCookie("SparkUser",res.data.user)
      alert("success", "User is login")
      window.location.href = "/dashboard"
    })
    .catch(err => {
      alert("error", "invalid credentials")
      console.log(err)
      submitbtn.innerHTML = `Login`
    })
  }

  useEffect(() => {
    if(code){
      var google = document.querySelector(".google")
      google.innerHTML = `<div class="spinner-border text-white p-2 spinner-border-sm"></div>`

      axios.get(`/auth/google/callback?code=${code}`,)
      .then(res => {
        console.log(res)
        setCookie("SparkUser",res.data.data[0])
        alert("success", "User is login")
        // window.location.href = "/dashboard"
      })
      .catch(err => {
        alert("error", "Something went wrong")
        console.log(err)
        google.innerHTML = `<i class="fa-brands fa-google text-white"></i>`
      })
    }
  },[])

  const googlelogIn = e => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    window.location.href = url
  }


  return (
    <div className='login d-flex'>
      <div className="img">
        <img src="" alt="" />
      </div>

      <div className="form pb-5">
        <a href="/" className='mb-4 green'><h2 className="text-center mt-5 fw-bold"><i class="fa-solid fa-computer-mouse"></i> Click Spack</h2></a>
        <h4 className="text-center fw-bold">Login to Continue</h4>
        <p className="mb-0 text-center mt-3 alt">Don't have an account? <a href="/signup" className='mx-2'>Sign up</a></p>

        <div className="inputs mt-5">
           <form action="" onSubmit={logIn}>
              <div className="text">
                  <input required className='focus' type="text" ref={userEmail} onClick={e => setEmail(e.target.value)} />
                  <p className='move_up'>Email</p>
              </div>
              <div className="text">
                  <input required className='focus' type="password" ref={userPassword} onClick={e => setPassword(e.target.value)} />
                  <p className='move_up'>Password</p>
              </div>
              <div className="text-center">
                  <a href="/forgot-password">Forgot Password?</a>
                  <button className='btn submitbtn'>Login</button>
              </div>
           </form>
           
            {/* <p className="text-center mt-4">Or sign up using </p>
            <div className="social d-flex text-center">
              <p className="mb-0 google btn bg-danger p-1" onClick={googlelogIn}><i class="fa-brands fa-google text-white"></i></p>
              <p className="mb-0 mx-4"><i class="fa-brands fa-facebook text-primary"></i></p>
            </div> */}
        </div>
      </div>
    </div>
  )
}
