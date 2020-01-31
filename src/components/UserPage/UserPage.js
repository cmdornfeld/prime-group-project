import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav'

class UserPage extends Component {

  render() {
    return (
      <div>
        <Nav />
        <p>home</p>
      </div>
    );
  }
}
const putReduxStateonProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateonProps)(UserPage);
