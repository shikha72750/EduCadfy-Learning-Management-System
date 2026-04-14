import React from 'react'
import { FaUser, FaGraduationCap, FaCheckCircle,FaLaptop } from "react-icons/fa";
const Counter = () => {

    

  return (
      <>
          <div className="row  bg-dark py-5">
              <div className="col-sm-10 mx-auto mt-5 ">
                  <div className="row g-4">
                      
                      {/* card  1  */}

                      <div className="col-sm-3">
             <div className=" p-3 border rounded-3 border-dark " style={{background:"#6d5821 ",width:"300px" } }>
                  <div className="row text-light mt-3">
                      <div className="col-sm-4 mt-4 text-center" style={{fontSize:"30px"}}>
                          <FaLaptop/>
                      </div>
                      <div className="col-sm-8">
                          <h1>10k</h1>
                          <p>Online Courses</p>
                      </div>
                  </div>
              </div>   
                      </div>
                      

                        {/* card  2 */}

                      <div className="col-sm-3">
             <div className=" p-3 border rounded-3 border-dark " style={{background:"#1f2a38 ",width:"300px" } }>
                  <div className="row text-light mt-3">
                      <div className="col-sm-4 mt-4 text-center" style={{fontSize:"30px"}}>
                           <FaUser />
                      </div>
                      <div className="col-sm-8">
                          <h1>200+</h1>
                          <p>Expert Tutors</p>
                      </div>
                  </div>
              </div>   
                      </div>
                      


                        {/* card  3  */}

                      <div className="col-sm-3">
             <div className=" p-3 border rounded-3 border-dark " style={{background:"#2d2447 ",width:"300px" } }>
                  <div className="row text-light mt-3">
                      <div className="col-sm-4 mt-4 text-center" style={{fontSize:"30px"}}>
                           <FaGraduationCap />  
                      </div>
                      <div className="col-sm-8">
                          <h1>60k+</h1>
                          <p>Online Students</p>
                      </div>
                  </div>
              </div>   
                      </div>
                      


                        {/* card  1  */}

                      <div className="col-sm-3">
             <div className=" p-3 border rounded-3 border-dark " style={{background:"#1d3c40",width:"300px" } }>
                  <div className="row text-light mt-3">
                      <div className="col-sm-4 mt-4 text-center" style={{fontSize:"30px"}}>
                           <FaCheckCircle />
                      </div>
                      <div className="col-sm-8">
                          <h1>60k+</h1>
                          <p>   Certified Courses</p>
                      </div>
                  </div>
              </div>   
                      </div>
                      



                  </div>
             </div>
                  </div>
             
             
      </>
  )
}

export default Counter