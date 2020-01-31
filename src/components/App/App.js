import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import PhotosPage from '../PhotosPage/PhotosPage';
import GolfersPage from '../GolfersPage/GolfersPage';
import PledgePage from '../PledgePage/PledgePage';
import PartnersPage from '../PartnersPage/ParntersPage';
import ContactPage from '../ContactPage/ContactPage';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            <Route
              exact
              path="/home"
              component={UserPage}
            />
           <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/photos"
              component={PhotosPage}
            />
            <Route
              exact
              path="/golfers"
              component={GolfersPage}
            />
            <Route
              exact
              path="/pledge"
              component={PledgePage}
            />
            <Route
              exact
              path="/partners"
              component={PartnersPage}
            />
            <Route
              exact
              path="/contact"
              component={ContactPage}
            />
            <ProtectedRoute
              exact
              path="/admin"
              component={ContactPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
