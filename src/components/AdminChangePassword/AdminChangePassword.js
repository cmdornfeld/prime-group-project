import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

//style for the change password on the admin
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
  },
  topMargin: {
    marginTop: 130
}
};

class AdminChangePassword extends Component {

    state = { 
        old: '',
        new: ''
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    }

    //update the password
    updatePassword = (event) => {
        event.preventDefault();
    
        if (this.state.old && this.state.new) {
          this.props.dispatch({
            type: 'NEW_PASSWORD',
            payload: {
              old: this.state.old,
              new: this.state.new,
              id: this.props.user.id
            }
          })
        //   alert('Password Updated')
        } else {
          alert('Textfields must not be empty')
        }
      } // end login

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
            <AdminNav />
            <div className={classes.topMargin}>
                <h2>Change Password</h2>
            </div>
            <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            >
             <Grid item>
                <Card className={classes.card}>
                {this.props.errors.loginMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.loginMessage}
                    </h2>
                    )}
                    <CardContent>
                    <form onSubmit={this.updatePassword}>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Change Password
                    </Typography>
                    <div>
                        <TextField
                            type="password"
                            name="old"
                            label="Old Password"
                            variant="outlined"
                            className={classes.textField}
                            value={this.state.old}
                            onChange={this.handleInputChangeFor('old')}
                        />
                    </div>
                    <div>
                        <TextField
                            type="password"
                            name="new"
                            label="New Password"
                            variant="outlined"
                            className={classes.textField}
                            value={this.state.new}
                            onChange={this.handleInputChangeFor('new')}
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
                        Save
                        </Button>
                    </div>
                    </form>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    user: reduxStore.user,
    errors: reduxStore.errors,
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminChangePassword));
