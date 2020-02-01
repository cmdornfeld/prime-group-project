import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';

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
        this.props.dispatch({ type: 'GET_CONTACT_INFO'});
        this.props.dispatch({ type: 'GET_ADDRESS_INFO'});
    }

    editAddress = () => {
        if(this.state.editAddress === false){
            this.setState({
                editAddress: true
            })
        } else {
            let objectToSend = {
                    street: this.state.street,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    phone: this.state.phone,
                    fax: this.state.fax,
                    id: this.props.addressInfoReducer.id
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
                editContact: true
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
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    render() {

        const editAddress = this.state.editAddress === false ? (
            <div className="address-info-box">
                <h4>Address</h4>
                {JSON.stringify(this.props.addressInfoReducer)}
                <p>{this.props.addressInfoReducer.street}  <button onClick={this.editAddress}>Edit</button><br/>
                    {this.props.addressInfoReducer.city}, {this.props.addressInfoReducer.state}  {this.props.addressInfoReducer.zip}<br/>
                    Phone: {this.props.addressInfoReducer.phone}<br/>
                    Fax: {this.props.addressInfoReducer.fax}
                </p>
            </div>

        ) : (
            <div className="address-info-box">
                <h4>Address</h4>
                <input 
                    value={this.props.addressInfoReducer.street}
                    onChange={this.handleInputChangeFor('street')}
                />
                <input 
                    value={this.props.addressInfoReducer.city}
                    onChange={this.handleInputChangeFor('city')}
                />
                <input 
                    value={this.props.addressInfoReducer.state}
                    onChange={this.handleInputChangeFor('state')}
                />
                <input 
                    value={this.props.addressInfoReducer.zip}
                    onChange={this.handleInputChangeFor('zip')}
                />
                <input 
                    value={this.props.addressInfoReducer.phone}
                    onChange={this.handleInputChangeFor('phone')}
                />
                <input 
                    value={this.props.addressInfoReducer.fax}
                    onChange={this.handleInputChangeFor('fax')}
                />
                <button onClick={this.cancelEditAddress}>
                    Cancel
                </button>
                <button onClick={this.editAddress}>
                    Save
                </button>
            </div>
        )

        const editContact = this.state.editContact === false ? (
            <div className="contact-info-box">
                <h4>Contact</h4>
                {JSON.stringify(this.props.contactInfoReducer)}
                <p>For any additional  <button onClick={this.editContact}>Edit</button><br/>
                    information, please contact:<br/>
                    <b>{this.props.contactInfoReducer.name}</b><br/>
                    {this.props.contactInfoReducer.email}
                </p>
            </div>
        ) : (
            <div className="contact-info-box">
                <h4>Contact</h4>
                <input 
                    value={this.props.contactInfoReducer.name}
                    onChange={this.handleInputChangeFor('contactName')}
                />
                <input 
                    value={this.props.contactInfoReducer.email}
                    onChange={this.handleInputChangeFor('contactEmail')}
                />
                <button onClick={this.cancelEditContact}>
                    Cancel
                </button>
                <button onClick={this.editContact}>
                    Save
                </button>
            </div>
        )
        return (
            <Fragment>
                <AdminNav />
                <h2>Contact</h2>
                {editAddress}
                {editContact}
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    addressInfoReducer: reduxStore.addressInfoReducer,
    contactInfoReducer: reduxStore.contactInfoReducer
});

export default connect(putReduxStateOnProps)(AdminContactPage);