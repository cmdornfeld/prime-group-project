import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import logo from './100HolesforHope.png';

// Material UI stuff
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles =  {
  buttonLeft: {
    float: 'left'
  },
  buttonRight: {
    marginTop: '50px'
  },
  right: {
    float: 'right'
  },
  buttonStyling: {
    textDecoration: 'none',
    color: 'white'
  }
};

class AdminNav extends Component{
  render(){

    const { classes } = this.props;

    return (
      <AppBar style={{backgroundColor: 'rgb(180,151,89)'}}>
        <Grid container spacing={4}>
          <Grid item className={classes.buttonLeft} sm={6}>
            <div style={{width: 300}}>
              <Button>
                <Link to="/admin">
                  <img src={logo} alt="100 Holes For Hope" width='200px' height='75px' />
                </Link>
              </Button>
            </div>
          </Grid>
          <Grid item className={classes.buttonRight} sm={6}>
          <span className={classes.right}>
            <Button>
              <Link className="nav-link" to="/admin" className={classes.buttonStyling}>
                Home
              </Link>
            </Button>
            <Button>
              <Link className="nav-link" to="/admin/about" className={classes.buttonStyling}>
                About
              </Link>
            </Button>
            <Button>
              <Link className="nav-link" to="/admin/photos" className={classes.buttonStyling}>
                Photos
              </Link>
            </Button>
            <Button>
              <Link className="nav-link" to="/admin/golfers" className={classes.buttonStyling}>
                Golfers
              </Link>
            </Button>
            <Button>
              <Link className="nav-link" to="/admin/pledges" className={classes.buttonStyling}>
                Pledges
              </Link>
            </Button>
            <Button>
              <Link className="nav-link" to="/admin/partners" className={classes.buttonStyling}>
                Partners
              </Link>
            </Button>
            <Button>
              <Link className="nav-link" to="/admin/contact" className={classes.buttonStyling}>
                Contact
              </Link>
            </Button>
            <LogOutButton />
            </span>
          </Grid>
        </Grid>
      </AppBar>
    )
  }
    
};
  
  // Instead of taking everything from state, we just want the user
  // object to determine if they are logged in
  // if they are logged in, we show them a few more links 
  // if you wanted you could write this code like this:
  // const mapStateToProps = ({ user }) => ({ user });
  const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(withStyles(styles)(AdminNav));  