// Component will wrap everything below the header

import React from "react";

const Content = (props) => {
  return <div className="content">{props.children}</div>;
};

export default Content;
