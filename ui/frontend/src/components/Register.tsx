import React from 'react'
import "../styles/style.css"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userRegisterService } from '../services/services';
import { showAlert } from '../utils';
const Register = () => {
  const navigate = useNavigate()

  // ✅ Validation Schema (extended only)
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Minimum 3 characters"),

    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .min(10, "Too short")
      .max(40, "Too long"),

    mobile: yup
      .string()
      .required("Mobile is required")
      .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),

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

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data:any) => {
    try {
      const res = await userRegisterService(data);
      if (res.success) {
        showAlert("User Register Successfully", res?.message, "success")
        reset()
        navigate("/login")
      } else {
        showAlert("User not Register", res?.message, "error")
      }
      
    }
    catch (error) {
      showAlert("User not Register", "Internal server error", "error")
    }

    reset()
  }

  return (
    <>
      <div className="row " style={{ background: "#070b12", height: "713px" }}>
        <div className="col-sm-5 mx-auto text-light">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='p-4 shadow-lg rounded-3 custom-input'
            style={{ marginTop: "60px", background: "#030508" }}
          >

            <h2 className='text-center text-light mb-3'>Create Your Account 🚀</h2>

            {/* Name */}
            Name <br />
            <input
              {...register("name")}
              type="text"
              className='mb-3 form-control border-dark shadow-lg mt-1'
              placeholder='Enter your name'
              style={{ background: "#5d847b" }}
            />
            {errors.name && (<span className="text-danger">{errors.name.message}</span>)}

            <br />

            {/* Email */}
            Email <br />
            <input
              {...register("email")}
              type="email"
              className='mb-3 form-control border-dark shadow-lg mt-1'
              placeholder='Enter your email'
              style={{ background: "#5d847b" }}
            />
            {errors.email && (<span className="text-danger">{errors.email.message}</span>)}

            <br />

            {/* Mobile */}
            Mobile <br />
            <input
              {...register("mobile")}
              type="text"
              className='mb-3 form-control border-dark shadow-lg mt-1'
              placeholder='Enter your mobile number'
              style={{ background: "#5d847b" }}
            />
            {errors.mobile && (<span className="text-danger">{errors.mobile.message}</span>)}

            <br />

            {/* Password */}
            Password <br />
            <input
              {...register("password")}
              type="password"
              className='form-control border-dark shadow-lg mt-1 mb-4'
              placeholder='Enter your password'
              style={{ background: "#5d847b" }}
            />
            {errors.password && (<span className="text-danger">{errors.password.message}</span>)}

            <div>
              <button className="btn btn-primary w-100 rounded-3">
                Register
              </button>

              <p className="text-center text-light mt-3">
                Already have an account?{" "}
                <span style={{ color: "#4dabf7", cursor: "pointer" }}>
                  <Link to="/login" className='text-decoration-none'>Login</Link>
                </span>
              </p>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Register