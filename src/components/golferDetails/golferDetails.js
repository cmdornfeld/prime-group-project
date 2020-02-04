import React, { Component } from 'react';
import { connect } from 'react-redux';

class golferDetails extends Component {

    // componentDidMount(){
    //     this.getGolferId();
    // }
    // getGolferId = () => {
    //     this.props.dispatch({ type: 'GET_GOLFER' })
    // }

    render() {
        return (
            <div>
                <h1>Golfers</h1>
                {this.props.golferIdReducer.map( (item) => {
                return(
                    <div>
                        <h3>{item.first_name} {item.last_name}</h3>
                        <img src={item.img_url} alt={item.id} width='220px' height='200px' />
                        <h3>Goal: ${item.goal}</h3>
                        <h3>{item.bio}</h3>
                        <h3>{item.purpose}</h3>
                        </div>
                        )
                    })}
            </div>
        );
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferIdReducer: reduxStore.golferIdReducer
  });

export default connect(putReduxStateOnProps) (golferDetails);