import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs'
import HolesforHope from './100HolesforHope.png';

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
        <div class='title'>
          <img src={HolesforHope} alt="100 Holes For Hope" width='420px' height='200px' />
        </div>
          <h2 align="center">{dayjs(this.props.eventInfoReducer.date).format('MMMM DD YYYY')} {this.props.eventInfoReducer.location}</h2>
          <div class='card'>
            {this.props.videoReducer.map( (item) => {
              return(
                <div >
                  <h1 align="center" color='white'>{item.title}</h1>
                  <iframe src={item.url} width='880px' height='500px' />
                  </div>
              )
            })}
          </div>
      </div>
    );
  }
}
const putReduxStateOnProps = (reduxStore) => ({
  videoReducer: reduxStore.videoReducer,
  eventInfoReducer: reduxStore.eventInfoReducer
});

export default connect(putReduxStateOnProps)(UserPage);
