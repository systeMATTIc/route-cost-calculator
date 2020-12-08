import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import AddressBasedCalculator from "../pages/AddressBasedCalculator";
import CoordinatesBasedCalculator from "../pages/CoordinatesBasedCalculator";
import ManualCalculator from "../pages/ManualCalculator";

function App() {
  return (
    <Router>
      <div
        className="h-screen flex flex-col items-center space-y-10 bg-red-300"
        id="App"
      >
        <nav className="mt-8">
          <ul className="flex bg-white py-1">
            <li>
              <NavLink
                exact
                className="px-4 py-3"
                to="/"
                activeClassName="bg-gray-500 text-white"
              >
                Manual
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className="px-4 py-3"
                to="/coordinates"
                activeClassName="bg-gray-500 text-white"
              >
                Coordinates
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className="px-4 py-3"
                to="/address"
                activeClassName="bg-gray-500 text-white"
              >
                Address
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/address">
            <AddressBasedCalculator />
          </Route>
          <Route path="/coordinates">
            <CoordinatesBasedCalculator />
          </Route>
          <Route path="/">
            <ManualCalculator />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
