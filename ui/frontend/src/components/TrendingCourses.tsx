import React from 'react'
import { FaStar, FaClock } from "react-icons/fa";
import tre from '../images/tre.jpg'; 
// import tre2 from '../images'; 
// import tre3 from '../images/tre3.jpg'; 
import girll from '../images/girll.jpg'; 





    
const TrendingCourses = () => {


  return (
      <>
          <div className="row  bg-dark py-5">
              <div className="col-sm-10 mx-auto mt-5 ">
                  <h1 className='text-center text-light'>Our Popular Courses</h1>
                  <p className='text-center text-light'>Check out most 🔥 courses in the market</p>
                  <div className="row g-4">
                      
                      {/* card  1  */}

                      <div className="col-sm-4 ">
                          <img src={tre}  height={250} width={402} alt="" />
                           <div className=" text-light p-2" style={{background:"#1b1e21"}}>
                          
                              <div>
                                  <span className='px-2 bg-primary text-light w-25 text-center rounded'>Design</span>
                                  <span className=' px-2 ms-2 bg-secondary text-light w-25 text-center rounded'>Beginner</span>
                          </div>
                          <h5>Time Management Mastery: Do More, <br /> Stress Less</h5>
                         
                          <span>
                              <FaStar style={{ color: "gold" }} />
                             
                              4
                          </span>

                              <p><FaClock style={{ color: "#0d6efd", fontSize: "15px" }} />12h 56m</p>
                         
                              <div>
                                   <hr />
                                  <span>
                                      <img height={50} className='rounded-3' src={girll} alt="" /> Aanya Deshmukh
                                      <span className='fs-4 text-success' style={{marginLeft:"150px"}}>$200</span>
                                  </span>
                              </div>
    
                      </div>
                     </div>
                      

                      {/* card  2 */}
                         <div className="col-sm-4 ">
                          <img src={tre}  height={250} width={402} alt="" />
                           <div className=" text-light p-2" style={{background:"#1b1e21"}}>
                          
                              <div>
                                  <span className='px-2 bg-primary text-light w-25 text-center rounded'>Design</span>
                                  <span className=' px-2 ms-2 bg-secondary text-light w-25 text-center rounded'>Beginner</span>
                          </div>
                          <h5>Time Management Mastery: Do More, <br /> Stress Less</h5>
                         
                          <span>
                              <FaStar style={{ color: "gold" }} />
                             
                              4
                          </span>

                              <p><FaClock style={{ color: "#0d6efd", fontSize: "15px" }} />12h 56m</p>
                         
                              <div>
                                   <hr />
                                  <span>
                                      <img height={50} className='rounded-3' src={girll} alt="" /> Aanya Deshmukh
                                      <span className='fs-4 text-success' style={{marginLeft:"150px"}}>$200</span>
                                  </span>
                              </div>
    
                      </div>
                     </div>
 

                      {/* card  3  */}
                         <div className="col-sm-4 ">
                          <img src={tre}  height={250} width={402} alt="" />
                           <div className=" text-light p-2" style={{background:"#1b1e21"}}>
                          
                              <div>
                                  <span className='px-2 bg-primary text-light w-25 text-center rounded'>Design</span>
                                  <span className=' px-2 ms-2 bg-secondary text-light w-25 text-center rounded'>Beginner</span>
                          </div>
                          <h5>Time Management Mastery: Do More, <br /> Stress Less</h5>
                         
                          <span>
                              <FaStar style={{ color: "gold" }} />
                             
                              4
                          </span>

                              <p><FaClock style={{ color: "#0d6efd", fontSize: "15px" }} />12h 56m</p>
                         
                              <div>
                                 <hr />
                                  <span>
                                      <img height={50} className='rounded-3' src={girll} alt="" /> Aanya Deshmukh
                                      <span className='fs-4 text-success' style={{marginLeft:"150px"}}>$200</span>
                                  </span>
                              </div>
    
                      </div>
                     </div>
  
                      


                      
                      

                  </div>
             </div>
                  </div>
             
             
      </>
  )
}

export default TrendingCourses