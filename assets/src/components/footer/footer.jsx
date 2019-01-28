import React from "react";
import "./footer.css";
const Footer = props => {
  return (
    <div id="footer">
      {/* <div className="footer-buttons">
        <button type="button" className="btn btn-secondary">
          Pagrindinis
        </button>
        <button type="button" className="btn btn-secondary">
          Nuomoti dabar
        </button>
        <button type="button" className="btn btn-secondary">
          Nuomotis
        </button>
      </div> */}
      <div className="footer-text text-center">
        <p>CarBooking 2019. Atnaujinto puslapio adresas: <a href="https://cbooking.lt">CarBooking</a></p>
      </div>
    </div>
  );
};

export default Footer;
