import React from 'react';
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <section id="faq" className="Footer_container">
      <div className="footer_wrapper">
        <div className="col">
          <h2 className="title">Working days</h2>
          <ul className="Footer_list">
            <li>Monday - Friday</li>
            <li className="workingTime">08:00 - 22:00</li>
            <li>Saturday</li>
            <li className="workingTime">08:00 - 20:00</li>
          </ul>
        </div>
        <div className="col">
          <h2 className="title">Newsletter</h2>
          <ul className="Footer_list">
            <li>Subscribe to our newsletter</li>
            <li>Receive the latest meals</li>
            <li>Get the menu with promos</li>
            <li>Everything weekly!</li>
          </ul>
        </div>
        <div className="col">
          <h2 className="title">Social Media</h2>
          <ul className="iconList">
            <li><AiFillInstagram /></li>
            <li><AiFillFacebook /></li>
            <li><AiFillTwitterCircle /></li>
          </ul>
        </div>
      </div>
     
    </section>
  );
}

export default Footer;
