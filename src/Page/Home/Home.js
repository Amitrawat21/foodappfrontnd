import React from 'react'
import Hero from '../../components/hero/Hero'
import illustration1 from '../../assets/male-delivery-guy-riding-scooter.svg'
import illustration2 from '../../assets/delivery-location.svg'
import illustration3 from '../../assets/deliveryman-with-pizza.svg'
import Newsletter from '../../components/newsletter/Newsletter'
import Foods from '../../components/Foods/Foods'
import Footer from '../../components/footer/Footer'

import "./Home.css"
const Home = () => {
  return (
    <div className= "containerr">
      <Hero />
      <div className= "delivery">
        <div className= "titles">
          <span className= "deliverySubtitle">Delivery</span>
          <h2 className= "deliveryTitle">Always on time for you</h2>
        </div>
        <div className= "deliveryInfos">
          <div className= "deliveryInfo">
            <img src={illustration1} alt="" className= "firstImg"/>
            <h3>Our delivery guy i</h3>
          </div>
          <div className= "deliveryInfo">
            <img src={illustration2} alt="" className= "secondImg"/>
            <h3>He works very hard</h3>
          </div>
          <div className="cladeliveryInfo">
            <img src={illustration3} alt="" className= "thirdImg"/>
            <h3>He is friendly and social</h3>
          </div>
        </div>
      </div>
      
      <Foods />
      <Newsletter />
      <Footer/>
    </div>

  )
}

export default Home
