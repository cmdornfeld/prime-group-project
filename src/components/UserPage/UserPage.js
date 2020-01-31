import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav'

class UserPage extends Component {

  componentDidMount() {
    this.getVideo();
}

getVideo = ()=> {
  this.props.dispatch({ type: "GET_VIDEOS"});
}

  render() {
    return (
      <div>
        <Nav />
        <p>home</p>
        {JSON.stringify(this.props.reduxState.videoReducer)}
        {this.props.reduxState.videoReducer.map( (item) => {
          return(
              <iframe src={item.url} width='auto' height='auto' />
          )
        })}
      </div>
    );
  }
}
const putReduxStateonProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateonProps)(UserPage);
