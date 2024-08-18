import React,{memo} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn({setisHighlighted}) {
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/login");
            setisHighlighted("/login")
        })
        
    }
  return (
    <button
    className='inline-bock px-6 py-2 font-semibold duration-200 
    text-white
    hover:bg-blue-100 hover:text-black rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default memo(LogoutBtn)