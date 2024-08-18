import React,{memo} from 'react'
import "../App.css"
// import '../images/logo.png'


function Logo({width = '40px'}) {
  return (
    <div className='flex space-x-2'>
     <div className='ima'></div>
      {/* <h1 className=' font-extrabold '>Writing-Budyy</h1> */}
    </div>
  )
}

export default memo(Logo)