import React from "react";
import Wrapper from "./components/Wrapper";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
    <Header />
    <Wrapper>
      <Main />
    </Wrapper>
    <Footer />
    </div>
  );
};

export default App;
