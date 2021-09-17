import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Employe from "./Employe/Employe";

const App = () => {
  return (
    <>
      <Router>
        <Route path="/" exact component={Employe} />
      </Router>
    </>
  );
};

export default App;
