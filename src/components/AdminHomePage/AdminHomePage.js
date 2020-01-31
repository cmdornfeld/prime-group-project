import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import AdminNav from '../AdminNav/AdminNav';

class AdminHomePage extends Component {

    componentDidMount(){
        this.props.dispatch({ type: 'GET_EVENT_INFO', action: 'test'})
    }

    render() {
       
        return (
            <div>
                <AdminNav />
                <p>Admin Home</p>
                {JSON.stringify(this.props.eventInfoReducer)}
                
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    eventInfoReducer: reduxStore.eventInfoReducer
});

export default connect(putReduxStateOnProps)(AdminHomePage);
