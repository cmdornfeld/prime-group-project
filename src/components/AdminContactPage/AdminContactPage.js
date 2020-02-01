import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';

class AdminContactPage extends Component {

    componentDidMount(){
        this.props.dispatch({ type: 'GET_CONTACT_INFO'});
        this.props.dispatch({ type: 'GET_ADDRESS_INFO'});
    }

    render() {
        return (
            <Fragment>
                <AdminNav />
                <h2>Contact</h2>
                <div className="address-info-box">
                    <h4>Address</h4>
                    {JSON.stringify(this.props.addressInfoReducer)}
                    <p>{this.props.addressInfoReducer.street}  <button>Edit</button><br/>
                        {this.props.addressInfoReducer.city}, {this.props.addressInfoReducer.state}  {this.props.addressInfoReducer.zip}
                    </p>
                </div>
                <div className="contact-info-box">
                    <h4>Contact</h4>
                    {JSON.stringify(this.props.contactInfoReducer)}
                    <p>For any additional  <button>Edit</button><br/>
                        information, please contact:<br/>
                        <b>{this.props.contactInfoReducer.name}</b><br/>
                        {this.props.contactInfoReducer.email}
                    </p>
                </div>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    contactInfoReducer: reduxStore.contactInfoReducer,
    addressInfoReducer: reduxStore.addressInfoReducer
});

export default connect(putReduxStateOnProps)(AdminContactPage);