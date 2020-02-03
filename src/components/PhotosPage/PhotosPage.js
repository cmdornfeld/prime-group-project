import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

class PhotosPage extends Component {

    componentDidMount() {
        this.getPhotos()
    }

    getPhotos = () => {
        this.props.dispatch({ type: 'GET_PHOTOS' })
    }

    render() {
        return (
            <div>
                <Nav />
                {JSON.stringify(this.props.photosReducer)}
                <p>photos</p>
                {this.props.photosReducer.map( (item) => {
                return(
                    <div>
                        <h3>{item.name}</h3>,
                        <img src={item.url} alt={item.description} width='220px' height='200px' />,
                        <p>{item.bio}</p>
                        </div>
                        )
                    })}
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    photosReducer: reduxStore.photosReducer
});

export default connect(putReduxStateOnProps)(PhotosPage);
