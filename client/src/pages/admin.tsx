import React from "react";
import MediaQuery from "react-responsive";
import slack from "../assets/slack_logo.svg"
import "../style/admin.scss"

import Clouds from "../components/clouds";
import trail from "../assets/paper-airplane.png"

const Admin: React.FC = () => {
  return (
  <div className="admin-login-page d-flex align-items-center justify-content-center">
    <div className="center">

    <MediaQuery minWidth={480}>
    <img 
      src={trail} 
      className="trail"
      style={{ top: "5vh", left: "0"}}
      alt="plane"
      />
      <img 
      src={trail} 
      className="trail"
      style={{ bottom: "0", right: "5vw"}}
      alt="plane"
      />
      </MediaQuery>
      <Clouds/>

      <h1 className="hacklahoma">Hacklahoma</h1>
        <div className="login-card admin-card">
          <h6 className="card-title">Admin Login</h6>



        <img src={slack} alt="" className="slack-logo" />

      </div>
    


    



      </div>
  </div>

  );

};
  

export default Admin;
