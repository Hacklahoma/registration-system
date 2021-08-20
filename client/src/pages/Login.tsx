import React from "react";
import MediaQuery from "react-responsive";

import trail from "../assets/paper-airplane.png";
import microsoft from "../assets/microsoft-logo.svg";
import google from "../assets/google-logo.svg";

import "../style/login.scss";
import "../style/images.scss";

import Clouds from "../components/clouds";
import Textbox from "../components/textbox";

const Login: React.FC = () => {
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
            <h5 className="card-title page-title">Login</h5>
            <Textbox title="Email" />
            <Textbox title="Password" />

            <div className="flex col">
              <div className="flex row">
                <img src={microsoft} alt="Microsoft" className="logo" />
                <div className="logo-text">Login with Microsoft</div>
              </div>
              <div className="flex row">
                <img src={google} alt="Google" className="logo" />
                <div className="logo-text">Login with Google</div>
              </div>
              <button className="btn" type="button">
                Enter
              </button>
              <a href="google.com" className="new-user">
                New User? Register Here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
