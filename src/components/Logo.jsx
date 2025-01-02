import React from 'react'
import logo from "../assets/Blogger logo.png"

function Logo({width = "100px"}) {
  return (
    <div>
      <img className='rounded-lg ' src={logo} width={width}/>
    </div>
  )
}

export default Logo
