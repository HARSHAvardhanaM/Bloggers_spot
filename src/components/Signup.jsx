import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Logo, Input, Button } from "./index"
import { login as authLogin } from '../store/authSlice'

function Signup() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let { register, handleSubmit } = useForm();

  let create = async (data) => {
    setError("");
    try {
      let user = await authService.createAccount(data);
      if (user) {
        let userData = await authService.getCurrUser();
        if (userData) {
          dispatch(authLogin(user));
        }
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div
      className='flex items-center justify-center w-full'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width='100%' />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">Already have an account?&nbsp;
          <Link className="font-medium text-primary transition-all duration-200 hover:underline" to={"/login"}>Login</Link>
        </p>
        {error && <p className='text-red-600 text-center'>{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>
            <Input type="text" placeholder="Enter your Fullname" label="Full Name" {...register("name", {
              required: true
            })} />
            <Input {...register("email", {
              required: true,
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email address must be a valid address",  // Custom error message
              }
            })} label="email" type="email" placeholder="Enter your email" />
            <Input label="Password" type="password" placeholder="Enter password" {...register("password", {
              required: true
            })} />
            <Button type="submit" className="w-full">Create Account</Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Signup
