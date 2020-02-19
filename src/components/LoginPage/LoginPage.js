import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles =  {
  card: {
    minWidth: 275,
    width: 300,
    textAlign: 'center',
    marginTop: '100px'
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  textField: {
    marginBottom: '10px',
    width: 200,
  },
  button: {
    marginBottom: '10px'
  }
};


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  render() {
    
    const { classes } = this.props;

    return (
      <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        >
        <Grid item>
          <Card className={classes.card}>
            <CardContent>
            {this.props.errors.loginMessage && (
              <h2
                className="alert"
                role="alert"
              >
                {this.props.errors.loginMessage}
              </h2>
            )}
            <form onSubmit={this.login}>
              <Typography variant="h2" className={classes.pageTitle}>
                Login
              </Typography>
              <div>
                  <TextField
                    type="text"
                    name="username"
                    label="Username"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                  />
              </div>
              <div>
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
              </div>
              <div>
                <Button 
                className={classes.button}
                type="submit"
                name="submit"
                value="Log In"
                variant="contained"
                style={{backgroundColor: 'rgb(180,151,89)', color: '#FFFFFF'}}
                >
                Submit
                </Button>
              </div>
            </form>
            {/* <center>
              <button
                type="button"
                className="link-button"
                onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
              >
                Don't have an account? Register here
              </button>
            </center> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
