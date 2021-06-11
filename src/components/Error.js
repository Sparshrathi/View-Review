import React, { useContext } from "react";
import Context from "../Context";

const Error = () => {
  const { error } = useContext(Context);
  return <div className="error">{error}</div>;
};

export default Error;
