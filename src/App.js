import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SearchComponent from "./searchComponent.js";
import UserDetailsContainer from './user-details-container.js';
import './App.css';

function App() {
  return (
  <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="navbar-item">
            <Link to="/pulls" className="nav-link">Pull requests</Link>
          </li>
          <li className="navbar-item">
            <Link to="/issues" className="nav-link">Issues</Link>
          </li>
          <li className="navbar-item">
            <Link to="/marketplace" className="nav-link">Marketplace</Link>
          </li>
          <li className="navbar-item">
            <Link to="/explore" className="nav-link">Explore</Link>
          </li>
        </ul>
      </nav>
      <Route
        exact
        path="/"
        render={() => {
          return (
              <Redirect to="/search" />
            )
          }
        }
      />
      <Route exact path="/search" component={ SearchComponent } />
      <Route path="/pulls" />
      <Route path="/issues" />
      <Route path="/marketplace" />
      <Route path="/explore" />
      <Route path="/users" component={ UserDetailsContainer } />
      </div>
    </Router>
  );
}

export default App;
