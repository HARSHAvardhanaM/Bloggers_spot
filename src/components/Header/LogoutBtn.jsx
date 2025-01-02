import React from 'react'
import {useDispatch} from "react-redux"
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    let dispatch = useDispatch();
    let navigate = useNavigate()
    const logOutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
            window.location.reload(navigate("/"));
        })
    }

  return (
    <button onClick={logOutHandler} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout</button>
  )
}

export default LogoutBtn
