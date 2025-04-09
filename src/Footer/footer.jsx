import "../Styling/home.css";
import React from "react";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 PharmaGuard. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="mailto:support@marketmood.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;