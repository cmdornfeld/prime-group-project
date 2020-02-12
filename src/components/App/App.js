import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

// import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import PhotosPage from '../PhotosPage/PhotosPage';
import GolfersPage from '../GolfersPage/GolfersPage';
import PledgePage from '../PledgePage/PledgePage';
import PartnersPage from '../PartnersPage/ParntersPage';
import ContactPage from '../ContactPage/ContactPage';

import AdminHome from '../AdminHomePage/AdminHomePage';
import AdminAbout from '../AdminAboutPage/AdminAboutPage';
import AdminPhotos from '../AdminPhotosPage/AdminPhotosPage';
import AdminGolfers from '../AdminGolfersPage/AdminGolfersPage';
import AdminPledges from '../AdminPledgesPage/AdminPledgesPage';
import AdminPartners from '../AdminPartnersPage/AdminPartnersPage';
import AdminContact from '../AdminContactPage/AdminContactPage';
import golferDetails from '../golferDetails/golferDetails';
import AdminGolferDetails from '../AdminGolferDetails/AdminGolferDetails';
import AdminPartnerDetails from '../AdminPartnerDetails/AdminPartnerDetails';
import AdminFoundationDetails from '../AdminFoundationDetails/AdminFoundationDetails';
import AdminChangePassword from '../AdminChangePassword/AdminChangePassword';


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
              path='/view/:id' 
              component={golferDetails}
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
              component={AdminHome}
            />
            <ProtectedRoute
              exact
              path="/admin/about"
              component={AdminAbout}
            />
            <ProtectedRoute
              exact
              path="/admin/foundation/:id"
              component={AdminFoundationDetails}
            />
            <ProtectedRoute
              exact
              path="/admin/photos"
              component={AdminPhotos}
            />
            <ProtectedRoute
              exact
              path="/admin/golfers"
              component={AdminGolfers}
            />
            <ProtectedRoute 
              path="/admin/golfers/:id"
              component={AdminGolferDetails}
            />
            <ProtectedRoute
              exact
              path="/admin/pledges"
              component={AdminPledges}
            />
            <ProtectedRoute
              exact
              path="/admin/partners"
              component={AdminPartners}
            />
            <ProtectedRoute
              exact
              path="/admin/partners/:id"
              component={AdminPartnerDetails}
            />
            <ProtectedRoute
              exact
              path="/admin/contact"
              component={AdminContact}
            />
            <ProtectedRoute 
              exact
              path="/admin/password"
              component={AdminChangePassword}
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
