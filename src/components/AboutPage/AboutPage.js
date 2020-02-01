import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav'

class AboutPage extends Component {

  componentDidMount() {
    this.getMission();
    this.getFoundation();
}
  
  getMission = ()=> {
    this.props.dispatch({ type: "GET_MISSION"});
  }

  getFoundation = ()=> {
    this.props.dispatch({ type: "GET_FOUNDATION"});
  }

  render() {
    return (
      <div>
        <Nav />
        <h1>about</h1>
        <p style={{color:'white'}}>{this.props.missionReducer.about}</p>
        {this.props.foundationReducer.map( (item) => {
          return(
            <div>
              <h3>{item.name}</h3>,
              <img src={item.url} alt={item.name} width='220px' height='200px' />,
              <p>{item.bio}</p>
              </div>
          )
        })}
      </div>
    )
  }
}
const putReduxStateOnProps = (reduxStore) => ({
  missionReducer: reduxStore.missionReducer,
  foundationReducer: reduxStore.foundationReducer
});

export default connect(putReduxStateOnProps) (AboutPage);
