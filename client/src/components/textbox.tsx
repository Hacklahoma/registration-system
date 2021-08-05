import React from "react";

import "../style/components.scss";

const Textbox: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="sm textbox">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder={title}
          aria-label={title}
        />
      </div>
    </div>
  );
};

export default Textbox;
