import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav'

class UserPage extends Component {

  componentDidMount() {
    this.getVideo();
    this.getEvent();
}

getVideo = ()=> {
  this.props.dispatch({ type: "GET_VIDEOS"});
}

getEvent = ()=> {
  this.props.dispatch({ type: "GET_EVENTS"});
}

  render() {
    return (
      // <div>
      //   {this.props.eventInfoReducer.map( (item) => {
      //     return(
      //   <p>{item.date}</p>
      //     )
      //   })}
      // </div>
      <div>
        <Nav />
        <p>home</p>
        {JSON.stringify(this.props.eventInfoReducer)}
        <h3>{this.props.eventInfoReducer.date}</h3>
        {JSON.stringify(this.props.videoReducer)}
        {this.props.videoReducer.map( (item) => {
          return(
              <iframe src={item.url} width='auto' height='auto' />
          )
        })}
      </div>
    );
  }
}
const putReduxStateOnProps = (reduxStore) => ({
  videoReducer: reduxStore.videoReducer,
  eventInfoReducer: reduxStore.eventInfoReducer
});

export default connect(putReduxStateOnProps)(UserPage);
