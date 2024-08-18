import React, { memo } from 'react'
import { Login as LoginComponent } from '../components/Login'
function Login() {
  return (
    <div className='py-10 my-2'>
        <LoginComponent />
    </div>
  )
}

export default memo(Login)