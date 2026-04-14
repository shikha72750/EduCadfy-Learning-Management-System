import React from 'react'
import logo from "../images/logo.png"
const Footer = () => {
  return (
      <>
          <div className="row navbarBackground">
              <div className="col-sm-3 mt-5">
                  <img src={logo} height={80} alt="" />
                  <h6 className='text-light ms-4'>
                      EduCadfy education theme, built specifically
                      for the education centers which is dedicated to teaching and involve learners.
                  </h6>

              </div>




              <div className="col-sm-3 text-light">
                  <h2 style={{marginTop:"50px"}}>
                      Company
                  </h2>
                  <div className='text-light'>
                      <div>
                      About Us
                  </div>
                  <div>
                      Contact us 
                  </div>
                  <div>
                      News and Blogs
                  </div>
                  <div>
                      Library
                  </div>
                  <div>
                     Career
                  </div>
                  </div>
              </div>
            
              
                <div className="col-sm-3 text-light">
                  <h2 style={{marginTop:"50px"}}>
                      Community
                  </h2>
                  <div className='text-light'>
                      <div>
                      About Us
                  </div>
                  <div>
                      Contact us 
                  </div>
                  <div>
                      News and Blogs
                  </div>
                  <div>
                      Library
                  </div>
                  <div>
                     Career
                  </div>
                  </div>
              </div>



                <div className="col-sm-3 text-light">
                  <h2 style={{marginTop:"50px"}}>
                      Contact
                  </h2>
                  <div className='text-light'>
                      <div>
                      About Us
                  </div>
                  <div>
                      Contact us 
                  </div>
                  <div>
                      News and Blogs
                  </div>
                  <div>
                      Library
                  </div>
                  <div>
                     Career
                  </div>
                  </div>
              </div>

              

      </div>
      </>
  )
}

export default Footer