import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"

function Login() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { register, handleSubmit } = useForm();
    let [error, setError] = useState("");

    let login = async (data) => {
        setError("")
        try {
            let session = await authService.login(data);
            if (session) {
                let user = await authService.getCurrUser()
                if (user) {
                    const userData = await authService.getCurrUser()
                    dispatch(authLogin(userData));
                    navigate("/");
                }
                
            }
        } catch (err) {
            setError(err.message)
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
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <div className="p-2 w-full">
                            <p>Credentials</p>
                            <p>email : test@test.com</p>
                            <p>password : test1234 </p>
                        </div>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input {...register("email", {
                            required: true,
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be a valid address",
                            }
                        })} label="email" type="email" placeholder="Enter your email" />

                        <Input label="password" type="password" placeholder="Enter your password" {...register("password", {
                            required: true,
                        })} />
                        <Button className="w-full" type="submit">Log in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
