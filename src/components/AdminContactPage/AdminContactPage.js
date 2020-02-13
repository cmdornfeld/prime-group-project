import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '65%',
      margin: '0 auto'
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
        marginTop: '8%'
    },
    primaryButton: {
        backgroundColor: '#b49759',
        margin: '.5rem',
        color: '#ffffff',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#b49759'
            }
    },
    secondaryButton: {
        backgroundColor: '#253155',
        margin: '.5rem',
        color: '#ffffff',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#253155'
            }
    }
});

class AdminContactPage extends Component {

    state = {
        editAddress: false,
        editContact: false,
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        fax: '',
        contactName: '',
        contactEmail: ''
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_CONTACT_INFO' });
        this.props.dispatch({ type: 'GET_ADDRESS_INFO' });
    }

    editAddress = () => {
        if(this.state.editAddress === false){
            this.setState({
                editAddress: true,
                street: this.props.addressReducer.street,
                city: this.props.addressReducer.city,
                state: this.props.addressReducer.state,
                zip: this.props.addressReducer.zip,
                phone: this.props.addressReducer.phone,
                fax: this.props.addressReducer.fax

            })
        } else {
            let objectToSend = {
                    street: this.state.street,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    phone: this.state.phone,
                    fax: this.state.fax,
                    id: this.props.addressReducer.id
                }
            this.props.dispatch({type: 'EDIT_ADDRESS', payload: objectToSend})
            this.setState({
                editAddress: false
            })
        }
    }

    editContact = () => {
        if(this.state.editContact === false){
            this.setState({
                editContact: true,
                contactName: this.props.contactInfoReducer.name,
                contactEmail: this.props.contactInfoReducer.email
            })
        } else {
            let objectToSend = {
                    contactName: this.state.contactName,
                    contactEmail: this.state.contactEmail,
                    id: this.props.contactInfoReducer.id
                }
            this.props.dispatch({type: 'EDIT_CONTACT', payload: objectToSend})
            this.setState({
                editContact: false
            })
        }
    }

    cancelEditAddress = () => {
        this.setState({
            editAddress: false
        })
    }

    cancelEditContact = () => {
        this.setState({
            editContact: false
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        console.log('handling change for:', propertyName, 'value:', event.target.value);
        
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    render(props) {

        const { classes } = this.props;

        const editAddress = this.state.editAddress === false ? (
            <Paper className={classes.paper}>
                <h2>Address</h2>
                <Button onClick={this.editAddress} variant="contained" className={classes.primaryButton}>
                    Edit
                </Button>
                <p>{this.props.addressReducer.street}<br/>
                    {this.props.addressReducer.city}, {this.props.addressReducer.state}  {this.props.addressReducer.zip}<br/>
                    info@minnesotapga.com<br/>
                    Phone: {this.props.addressReducer.phone}<br/>
                    Fax: {this.props.addressReducer.fax}
                </p>
            </Paper>

        ) : (
            <Paper className={classes.paper}>
                <h2>Address</h2>
                <TextField
                    label="Street"
                    value={this.state.street}
                    onChange={this.handleInputChangeFor('street')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="City"
                    value={this.state.city}
                    onChange={this.handleInputChangeFor('city')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="State"
                    value={this.state.state}
                    onChange={this.handleInputChangeFor('state')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Zip Code"
                    value={this.state.zip}
                    onChange={this.handleInputChangeFor('zip')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Phone"
                    value={this.state.phone}
                    onChange={this.handleInputChangeFor('phone')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Fax"
                    value={this.state.fax}
                    onChange={this.handleInputChangeFor('fax')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <div>
                    <Button onClick={this.cancelEditAddress} variant="contained" className={classes.secondaryButton}>
                        Cancel
                    </Button>
                    <Button onClick={this.editAddress} variant="contained" className={classes.primaryButton}>
                        Save
                    </Button>
                </div>
            </Paper>
        )

        const editContact = this.state.editContact === false ? (
            <Paper className={classes.paper}>
                <h2>Contact</h2>
                <Button onClick={this.editContact} variant="contained" className={classes.primaryButton}>
                    Edit
                </Button>
                <p>For any additional information, please contact:<br/>
                    <b>{this.props.contactInfoReducer.name}</b><br/>
                    {this.props.contactInfoReducer.email}
                </p>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <h2>Contact</h2>
                <TextField
                    label="Name"
                    value={this.state.contactName}
                    onChange={this.handleInputChangeFor('contactName')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Email"
                    value={this.state.contactEmail}
                    onChange={this.handleInputChangeFor('contactEmail')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Button onClick={this.cancelEditContact} variant="contained" className={classes.secondaryButton}>
                    Cancel
                </Button>
                <Button onClick={this.editContact} variant="contained" className={classes.primaryButton}>
                    Save
                </Button>
            </Paper>
        )
        return (
            <div>
                <AdminNav />
                <div className={classes.topMargin}>
                    <h1>CONTACT</h1>
                    <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            {editAddress}
                        </Grid>
                        <Grid item xs>
                            {editContact}
                        </Grid>
                    </Grid>
                    </div>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    addressReducer: reduxStore.addressReducer,
    contactInfoReducer: reduxStore.contactInfoReducer
});

AdminContactPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminContactPage));
