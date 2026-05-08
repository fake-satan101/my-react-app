import React from "react";

function Bottom(props) {
  return (
    <div>
      <p className="info">
        {props.info}
        {props.rating}
      </p>
    </div>
  );
}
export default Bottom;
