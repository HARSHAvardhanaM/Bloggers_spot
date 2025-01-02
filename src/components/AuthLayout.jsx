import React,{useEffect,useState} from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

export default function Protected({children , authentication = true}) {

    const navigate = useNavigate();
    const authstatus = useSelector((state)=>state.auth.status);
    const [loader , setLoader] = useState(true);

    useEffect(()=>{
        if(authentication && authstatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authstatus!==authentication ){
            navigate("/")
        }
        setLoader(false)
    },[navigate,authentication,authstatus])

  return loader ? <h1>Loading....</h1> : <>{children}</>
}


