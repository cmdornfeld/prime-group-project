import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: '#253055',
      margin: theme.spacing(2),
      backgroundColor: '#ffffff'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    topMargin: {
        marginTop: '100px'
    }

});

class ContactPage extends Component {

    state = {
        email: '',
        name: '',
        subject: '',
        body: ''
    }

    componentDidMount() {
        this.getAddress();
        this.getContact();
    }

    getAddress = () => {
        this.props.dispatch({ type: 'GET_ADDRESS' })
    }
    getContact = () => {
        this.props.dispatch({ type: 'GET_CONTACT' })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
            alert('Please fill in a valid email')
        } else if (this.state.name === '' || this.state.subject === '' || this.state.body === '' || this.state.email === ''){
            alert('Please fill in text field')
        } else {
            this.props.dispatch({ type: 'SEND_EMAIL', payload: this.state });
            this.setState({
                email: '',
                name: '',
                subject: '',
                body: ''
            })
        }
    }

    render(props) {

        const { classes } = this.props;

        return (
            <Fragment>
                <Nav />
                <div className={classes.topMargin}>
                    <h1>CONTACT</h1>
                    <div className={classes.root} style={{width: '65%', margin: '0 auto'}}>
                        <Grid container spacing={2}>
                            <Grid item xs>
                            <form>
                                <Paper className={classes.paper}>
                                    <TextField
                                        required
                                        id="email-input"
                                        label="Email"
                                        placeholder="your email"
                                        value={this.state.email}
                                        onChange={this.handleInputChangeFor('email')}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        style={{width: '30%'}}
                                    />
                                    <TextField
                                        required
                                        id="name-input"
                                        label="Name"
                                        placeholder="your name"
                                        value={this.state.name}
                                        onChange={this.handleInputChangeFor('name')}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        style={{width: '30%'}}
                                    />
                                    <TextField
                                        id="subject-input"
                                        label="Subject"
                                        placeholder="subject of email"
                                        value={this.state.subject}
                                        onChange={this.handleInputChangeFor('subject')}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        style={{width: '64%'}}
                                    />
                                    <TextField
                                        id="email-body-input"
                                        label="Message"
                                        multiline
                                        rows="8"
                                        rowsMax="10"
                                        value={this.state.body}
                                        onChange={this.handleInputChangeFor('body')}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        style={{width: '64%'}}
                                    />
                                <div>
                                    <Button variant="contained" className={classes.button} 
                                        style={{backgroundColor: '#b49759', marginTop: '.5rem', marginBottom: '.5rem', width: '64%', 
                                        color: '#FFFFFF'}} onClick={(event) => this.handleSubmit(event)}>
                                        Send Email
                                    </Button>
                                </div>
                                </Paper>
                            </form>
                            </Grid>
                            <Grid item xs>
                                {this.props.addressPublicReducer.map( (item) => {
                                    return(
                                        <Paper key= {item.id} className={classes.paper}>
                                            <h2>Address</h2>
                                            <p>{item.street}</p>
                                            <p>{item.city}, {item.state} {item.zip}</p>
                                            <p>info@minnesotapga.com</p><br/>

                                            <p>Tel:{item.phone}</p>
                                            <p>Fax:{item.fax}</p>
                                        </Paper>
                                    )
                                })}
                                {this.props.contactPublicReducer.map( (item) => {
                                    return(
                                        <Paper key= {item.id} className={classes.paper}>
                                            <h2>Contact</h2>
                                            <p>For any additional information, please contact:</p>
                                            <h3>{item.name}</h3>
                                            <p>{item.email}</p>
                                        </Paper>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    addressPublicReducer: reduxStore.addressPublicReducer,
    contactPublicReducer: reduxStore.contactPublicReducer

});

ContactPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(putReduxStateOnProps)(withStyles(styles)(ContactPage));
