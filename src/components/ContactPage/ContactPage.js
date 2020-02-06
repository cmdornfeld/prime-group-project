import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import './contactPage.css'

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
        this.props.dispatch({ type: 'SEND_EMAIL', payload: this.state });
        this.setState({
            email: '',
            name: '',
            subject: '',
            body: ''
        })
    }

    render() {
        return (
            <Fragment>
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
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <label>
                        Your Email:
                        <input
                        value={this.state.email}
                        onChange={this.handleInputChangeFor('email')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Your Name:
                        <input
                        value={this.state.name}
                        onChange={this.handleInputChangeFor('name')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Subject:
                        <input
                        value={this.state.subject}
                        onChange={this.handleInputChangeFor('subject')}
                        />
                    </label>
                </div>
                <div>
                    <div>
                        <label>Body:</label>
                    </div>
                    <div>
                        <textarea
                        rows="10"
                        cols="50"
                        value={this.state.body}
                        onChange={this.handleInputChangeFor('body')}
                        />
                    </div>
                </div>
                <div>
                    <button>Send Email</button>
                </div>
            </form>
            </Fragment>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    addressPublicReducer: reduxStore.addressPublicReducer,
    contactPublicReducer: reduxStore.contactPublicReducer

  });

export default connect(putReduxStateOnProps) (ContactPage);
