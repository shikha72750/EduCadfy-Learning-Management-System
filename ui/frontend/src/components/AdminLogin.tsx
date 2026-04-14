
import "../styles/style.css"
import {  useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { adminLoginService } from '../services/services';
import { showAlert } from '../utils/index';

import { useDispatch } from "react-redux";
import { setAuth } from "../redux";
const AdminLogin = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch();
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


   const onSubmit = async (data: any) => {
    try {
      const res = await adminLoginService(data);
      if (res.success) {
        showAlert("Admin Login", res?.message, "success")
        console.log(res, "#############");
        // storeData("token", res?.result?.token)
        // storeData("userType", "admin");
         dispatch(setAuth({ token: res?.result?.token, userType: "admin" }));
        navigate('/admin-dashboard');
        reset()
      } else {
        showAlert("Admin Login", res?.message, "error")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showAlert("Admin Login", "Internal Server Error", "error")
    }
  }
  return (
    <>
      <div className="row " style={{background:"#070b12" , height:"713px"}}>
        <div className="col-sm-5 mx-auto  text-light"  >
          <form onSubmit={handleSubmit(onSubmit)} className='p-4  shadow-lg rounded-3 custom-input' style={{marginTop:"200px",background:"#030508"}}>
            <h2 className='text-center text-light'>Admin Login</h2>
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
              
              
            </div>
          </form>
        </div>
      </div>
      
    </>
  )
}

export default AdminLogin