import React from 'react'
import {AiOutlineSend} from 'react-icons/ai'
import newsletterIllustration from '../../assets/get-newsletter-updates.svg'
import "./Newsletter.css"
const Newsletter = () => {
  return (
    <section id='contacts' className= "NewLetter_container">
    <div className="NewLetter_wrapper">
      <h4 className= "subtitle">Get our latest offers</h4>
      <h2 className= "title">Newsletter</h2>
      <div className= "inputContainer">
        <input type="text" placeholder='Enter email...'/>
        <AiOutlineSend className= "sendIcon"/>
      </div>
      <img src={newsletterIllustration} className= "illustration" alt=""/>
    </div>
  </section>
  )
}

export default Newsletter
