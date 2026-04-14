import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Counter from './Counter'
import PopularCourses from './PopularCourse'
import TrendingCourses from './TrendingCourses'
import Footer from './Footer'



const Home = () => {
  return (
      <>
          <Navbar />

          <HeroSection />
          <Counter />
          <PopularCourses/>
          <TrendingCourses />
          <Footer/>
      </>
      
  )
}

export default Home