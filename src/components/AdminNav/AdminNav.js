import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

const AdminNav = (props) => (
    <div className="nav">
      <Link to="/admin">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to="/admin">
          Home
        </Link>
        <Link className="nav-link" to="/admin/about">
          About
        </Link>
        <Link className="nav-link" to="/admin/photos">
          Photos
        </Link>
        <Link className="nav-link" to="/admin/golfers">
          Golfers
        </Link>
        <Link className="nav-link" to="/admin/pledges">
          Pledges
        </Link>
        <Link className="nav-link" to="/admin/partners">
          Partners
        </Link>
        <Link className="nav-link" to="/admin/contact">
          Contact
        </Link>
        <LogOutButton />
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
  
  export default connect(mapStateToProps)(AdminNav);
  