import React from 'react'
import { TypeAnimation } from 'react-type-animation'

import "../styles/style.css"
import ladka from "../images/ladka.png"
const HeroSection = () => {
  return (
    <>
      <div className="row bg-dark">
        {/* left text */}
        <div className="padding col-sm-6 text-light leftBox " >
          <div className=' font-size'>
           <h1>
  Limitless learning at <br />
  <TypeAnimation 
    sequence={[
      "your fingertips",
      2000,
      "your comfort",
      2000,
      "your home",
      2000,
    ]}
    speed={10}
    repeat={Infinity}
    cursor={true}
  />
</h1>
        </div>
          <p className='fs-6 mt-3'>Online learning and teaching marketplace with 5K+ courses
            & 10M students. Taught by experts to help you acquire new skills.</p>
          <p className=''>✔ Learn with experts ✔ Get certificate✔ Get membership</p>
          <button className='btn btn-danger ms-4 mt-4'>Get Started</button>
          <button className='btn btn-primary ms-4 mt-4'>▶️ Watch now</button>
        </div>


        {/* right image */}
        <div className="col-sm-6 padding mt-5">
          <div className='picBackground'>
            <img className='picImage'  height={650} src={ladka} alt="" />
           </div>
        </div>
    </div>
    </>
  )
}

export default HeroSection