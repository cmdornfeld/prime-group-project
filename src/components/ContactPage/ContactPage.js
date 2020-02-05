import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import './contactPage.css'

class ContactPage extends Component {

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

    render() {
        return (
            <div>
                <Nav />
                <h1>Contact</h1>
                <div class='address'>
                    {this.props.addressPublicReducer.map( (item) => {
                        return(
                            <div key= {item.id}>
                                <h3>Address</h3>
                                <p>{item.street}</p>
                                <p>{item.city}, {item.state} {item.zip}</p>

                                <p>Tel:{item.phone}</p>
                                <p>Fax:{item.fax}</p>
                            </div>
                        )
                    })}
                </div>
                <div class='contact'>
                    {this.props.contactPublicReducer.map( (item) => {
                        return(
                            <div key= {item.id}>
                                <h3>Contact</h3>
                                <h4>For any additional information, please contact:</h4>
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    addressPublicReducer: reduxStore.addressPublicReducer,
    contactPublicReducer: reduxStore.contactPublicReducer

  });

export default connect(putReduxStateOnProps) (ContactPage);
