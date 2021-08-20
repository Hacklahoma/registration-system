import React from "react";
import MediaQuery from "react-responsive";

import trail from "../assets/paper-airplane.png";


import "../style/confirmation.scss";
import "../style/images.scss";

import Clouds from "../components/clouds";




const Confirmation: React.FC = () => {
  return (
          <div className="register-page d-flex align-items-center justify-content-center">
          <div className="center">
            <MediaQuery minWidth={480}>
              <img
                src={trail}
                className="trail"
                style={{ top: "5vh", left: "0" }}
                alt="plane"
              />
              <img
                src={trail}
                className="trail"
                style={{ bottom: "0", right: "5vw" }}
                alt="plane"
              />
            </MediaQuery>
            <Clouds />

            <h1 className="hacklahoma">Hacklahoma</h1>
            <div className="card login-card">
              <div className="card-body">
                <h5 className="card-title page-title">Confirmation</h5>
                  <h6 className="confirmation-email-text">An email has been sent to <span className="user-email">email@gmail.com</span> to confirm your account. Follow the link in the email to make your account.</h6>

              
                <button className="btn resend-btn" type="button">
                    Resend Confirmation Email
                </button>
                
                <button className="btn" type="button">
                    Ok, Return to Login
                </button>
                  
              </div>
            </div>
          </div>
        </div>
      );  
};

export default Confirmation;
