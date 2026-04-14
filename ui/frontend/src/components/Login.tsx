import React from 'react'
import "../styles/style.css"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userLoginService } from '../services/services';
import { useContext } from 'react'; // ← add karo
import { UserContext } from '../context/user/UserContext'; // ← add karo


import { showAlert } from "../utils/index"
import { useDispatch } from 'react-redux';
// eslint-disable-next-line react-hooks/rules-of-hooks

import { setAuth } from '../redux';
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { setUser }: any = useContext(UserContext);
  //  Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .min(10, "Too short")
    .max(40, "Too long"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters")
    .max(15, "Maximum 15 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Must contain letters & numbers"
    ),
});
  
  
  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: yupResolver(schema),
  });


   const onSubmit = async(data:any) => {
    try {
      const res = await userLoginService(data);
      if (res.success) {
        showAlert("User Login", res?.message, "success")
        console.log(res,"#############");
        dispatch(setAuth({ token: res?.result?.token, userType: "user" }));
        setUser(res?.result?.isExist);
        navigate('/user-dashboard');
        reset()
      } else {
        showAlert("User Login", res?.message, "error")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showAlert("User Login", "Internal Server Error", "error")
    }
  }
  return (
    <>
      <div className="row " style={{background:"#070b12" , height:"713px"}}>
        <div className="col-sm-5 mx-auto  text-light"  >
          <form onSubmit={handleSubmit(onSubmit)} className='p-4  shadow-lg rounded-3 custom-input' style={{marginTop:"200px",background:"#030508"}}>
            <h2 className='text-center text-light'>Let’s Get You Logged In</h2>
            Email <br />
            <input {...register("email")} type="email" className='mb-3 form-control border-dark shadow-lg mt-1 ' placeholder='Enter your email ' style={{ background: "#5d847b" }} />
            {errors.email && (<span className="text-danger"> {errors.email.message} </span>)}
            
            <br />
               Password <br />
            <input  {...register("password")} type="password" className='form-control border-dark shadow-lg mt-1  mb-4 ' placeholder='Enter your password ' style={{ background: "#5d847b" }} />
              {errors.password && ( <span className="text-danger"> {errors.password.message} </span>)}
 
            <div>

               <button className="btn btn-primary w-100 rounded-3">
            Login
              </button>
              
               <p className="text-center text-light mt-3">
            Don't have an account?{" "}
            <span style={{ color: "#4dabf7", cursor: "pointer" }}>
              <Link to="/register" className='text-decoration-none'>Signup</Link>
            </span>
          </p>  

            </div>
          </form>
        </div>
      </div>
      
    </>
  )
}

export default Login

