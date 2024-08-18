import React,{useState,memo, useEffect} from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import "./style.css"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isHighlighted,setisHighlighted] = useState('/')

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
    name: "My Posts",
    slug: "/my-posts",
    active: authStatus,
},
  ]

  const handleClick = (item) =>{
    setisHighlighted(item);
    navigate(item);
  }


  return (
    <header className='py-3 shadow head  '>
      <Container>
        <nav className='flex  '>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto gap-3'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => handleClick(item.slug)}
                className={`inline-bock font-semibold  px-6 py-2 
                duration-200 hover:bg-blue-100
                hover:text-black ${isHighlighted === item.slug ? "bg-blue-100 text-black": "text-white "} rounded-full`}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn setisHighlighted = {setisHighlighted}/>
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default memo(Header)