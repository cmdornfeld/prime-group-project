import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs'

import './Userpage.css';
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
      <div>
        <Nav />
        <h1>home</h1>
          <h3>{dayjs(this.props.eventInfoReducer.date).format('MMMM DD YYYY')} {this.props.eventInfoReducer.location}</h3>
        
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
