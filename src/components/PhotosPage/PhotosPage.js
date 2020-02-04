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
                <p>photos</p>
                {this.props.photosReducer.map( (item) => {
                return(
                    <div>
                        <img src={item.url} alt={item.description} width='220px' height='200px' />
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
