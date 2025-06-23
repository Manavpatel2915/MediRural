import React from "react";
import "./Footer.css"; // We'll add styles here

const Footer = () => (
  <footer>
    <div className="f-info">
      <div className="f-info-socials">
        <a href="/facebook"><i className="fa-brands fa-facebook"></i></a>
        <a href="/instagram"><i className="fa-brands fa-instagram"></i></a>
        <a href="/linkedin"><i className="fa-brands fa-linkedin"></i></a>
      </div>
      <div>&copy;MediRural Private Limited</div>
      <div className="f-info-links">
        <a href="/privacy">Privacy</a>
        <a href="/help">Help</a>
        <a href="/contact">Contact Us</a>
      </div>
    </div>
  </footer>
);

export default Footer;
