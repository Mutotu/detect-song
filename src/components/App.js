import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import Game from "./Game";
import Prize from "./Prize";

const App = () => (
  <div>
    <Route exact path='/' component={Home} />
    <Route exact path='/game' component={Game} />
    <Route exact path='/prize' component={Prize} />
  </div>
);

export default App;
