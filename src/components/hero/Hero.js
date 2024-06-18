
import React from 'react'
import "./Hero.css"
import manEating  from "../../assets/man-having-his-meal.svg"
import {AiOutlineArrowDown} from 'react-icons/ai'
import homefood from "../../assets/main.jpg"
const Hero = () => {
  return (
    <section id="home" className="containerr">
    <div className="wrapper">
      <div className="left">
        <h2 className="titlee">Do you crave delicious food</h2>
        <p className="firstMsg">But going out to take <span>food costs time....</span></p>
        <p className="secondMsg">
          Why not order <span>pizza</span> or something <br /> <span>delicious</span>
          from our restaurant
        </p>
        <p className="desc">
          Our restaurant always puts the client above.
          They are our single most important thing for our business.
        </p>
        <div className="buttons">
          <button className="buttonOrder">Order now!</button>
          <button className="buttonSee"><a href="#foods">See what's available <AiOutlineArrowDown /></a></button>
        </div>
      </div>
      <div className="amitimg">
        <img src={homefood} alt="Man eating" className="manEatingImg" />
      </div>
    </div>
  </section>
  )
}

export default Hero