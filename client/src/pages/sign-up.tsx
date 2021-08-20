import React from "react";
import MediaQuery from "react-responsive";

import trail from "../assets/paper-airplane.png";


import "../style/sign-up.scss";
import "../style/images.scss";

import Clouds from "../components/clouds";
import Textbox from "../components/textbox";

const Signup: React.FC = () => {

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
            <h5 className="card-title page-title">Sign Up</h5>
            <div className="text-boxes">
              <Textbox title="Email" />
              <Textbox title="Username" />
              <Textbox title="Password" />
              <Textbox title="Confirm Password" />
            </div>
            <h5 className="password-info">*Password must contain atleast 6 characters and a special character</h5>
            

           
            <button className="btn" type="button">
                Enter
            </button>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
