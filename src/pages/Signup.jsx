import React, { memo } from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
  return (
    <div className='py-8'>
        <SignupComponent />
    </div>
  )
}

export default memo(Signup)