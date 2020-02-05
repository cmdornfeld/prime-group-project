import React, { Component } from 'react';
import { connect } from 'react-redux';

class golferDetails extends Component {

    render() {
        return (
            <div>
                <h3>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h3>
                <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} width='220px' height='200px' />
                <h3>Goal: {this.props.golferIdReducer.goal}</h3>
                <h3>Bio</h3>
                <p>{this.props.golferIdReducer.bio}</p>
                <h3>Why am I doing this?</h3>
                <p>{this.props.golferIdReducer.purpose}</p>
            </div>
        );
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferIdReducer: reduxStore.golferIdReducer
  });

export default connect(putReduxStateOnProps) (golferDetails);