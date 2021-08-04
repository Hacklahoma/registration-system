import React from "react";

import cloud from "../assets/cloud.svg";

import "../styling/components.scss";
import "../styling/images.scss";

const Clouds: React.FC = () => {
  return (
    <div className="clouds">
      <img
        src={cloud}
        className="cloud"
        style={{ bottom: "25vh", left: "10vw" }}
        alt="cloud"
      />
      <img
        src={cloud}
        className="cloud"
        style={{ top: "5vh", right: "20vw" }}
        alt="cloud"
      />
      <img
        src={cloud}
        className="cloud"
        style={{ bottom: "8vh", left: "20vw" }}
        alt="cloud"
      />
    </div>
  );
};

export default Clouds;
