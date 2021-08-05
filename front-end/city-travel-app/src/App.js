import logo from "./logo.svg";
import "./App.css";
import AddCity from "./CRUD/add.city";
import Cities from "./CRUD/Fetch/Cities";
import Login from "./LoginLogout/Login";
import SignUp from "./LoginLogout/SignUp";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavBar from "./CRUD/NavBar/Navbar";
//---------------Done With Import---------------//

function App() {
  return (
    <>
      {/* //  <div className="row"> */}

      <Router>
        <Switch>
          <Route path="/add" component={AddCity} />

          <Route path="/edit/:_id" component={AddCity} />
          <Route path="/" exact component={Cities} />
          <Route path="/login/:email" exact component={Cities} />
          <Route path="/signup/" exact component={SignUp} />
          <Route path="/login/" exact component={Login} />
        </Switch>
      </Router>
      {/* //  </div> */}
    </>
  );
}

export default App;
