// Component is responsible for containing every component
// making sure the components are centered vertically and horizontally

import React from "react";

const Wrapper = (props) => {
  return <div className="wrapper">{props.children}</div>;
};

export default Wrapper;
