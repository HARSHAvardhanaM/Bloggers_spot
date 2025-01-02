import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth';
import {useDispatch} from "react-redux";
import { login , logout } from './store/authSlice';
import {Header , Footer} from "./components/index"
import { Outlet } from 'react-router-dom';

function App() {
  let [loading , setLoading] = useState(true);
  let dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})
  },[dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between' style={{height:"screen"}}>
      <div className='w-full block bg-white h-1/6'>
        <Header />
        <main>
          <Outlet className='h-3/6'  />
        </main>
        <Footer className='h-2/6' />
      </div>
    </div>
  ) : (<div></div>)
}

export default App
