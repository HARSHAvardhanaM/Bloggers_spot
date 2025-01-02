import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { LogoutBtn, Container, Logo, Button } from "../index"

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  let navigate = useNavigate();

  let navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signin",
      slug: "/signin",
      active: !authStatus
    },
    {
      name: "Allposts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Addpost",
      slug: "/add-post",
      active: authStatus
    },
  ]

  return (
    <header className='py-3 shadow  bg-white border-b-1'>
    <Container>
      <nav className='flex h-20'>
        <div className='mr-4'>
          <Link to='/'>
            <Logo />
            </Link>
        </div>
        <ul className='flex ml-auto'>
          {navItems.map((item) => 
          item.active ? (
            <li key={item.name}>
              <button
              onClick={() => navigate(item.slug)}
              className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              >{item.name}</button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
      </Container>
  </header>
  )
}

export default Header

