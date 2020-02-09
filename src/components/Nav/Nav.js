import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">100 Holes for Hope</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        Home
      </Link>
      <Link className="nav-link" to="/about">
        About
      </Link>
      <Link className="nav-link" to="/photos">
        Photos
      </Link>
      <Link className="nav-link" to="/golfers">
        Golfers
      </Link>
      <Link className="nav-link" to="/pledge">
        Pledge
      </Link>
      <Link className="nav-link" to="/partners">
        Partners
      </Link>
      <Link className="nav-link" to="/contact">
        Contact
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
