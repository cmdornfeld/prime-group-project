import React, { Component } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { connect } from 'react-redux';

class AdminAboutPage extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'GET_ADMIN_MISSION'})
    }

    render() {
        return (
            <div>
                <AdminNav />
                <p>Admin About</p>
                {this.props.missionReducer.about}
            </div>
        )
    }
}


const putReduxStateOnProps = (reduxStore) => ({
    missionReducer: reduxStore.missionReducer,
    foundationReducer: reduxStore.foundationReducer
  });

  export default connect(putReduxStateOnProps)(AdminAboutPage);
