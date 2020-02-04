import React, { Component } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { connect } from 'react-redux';

export class AdminGolfersPage extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'GET_ADMIN_GOLFERS'})
    }
    render() {
        return (
            <div>
                <AdminNav />
                <p>Admin Golfers</p>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
});

export default connect(putReduxStateOnProps)(AdminGolfersPage);
