import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

// Material UI
import {withStyles} from '@material-ui/core/styles';
import PhotosPageItem from '../PhotosPageItem/PhotosPageItem'
import Grid from '@material-ui/core/Grid';

const styles = {
    topMargin: {
        marginTop: '8%'
    },
    container: {
        width: '90%',
        margin: '0 auto',
        justifyContent: 'center',
        marginTop: '2rem'
    }
};

class PhotosPage extends Component {

    componentDidMount() {
        this.getPhotos()
    }

    getPhotos = () => {
        this.props.dispatch({ type: 'GET_PHOTOS' })
    }

    render() {

        const {classes} = this.props;

        return (
            <div>
                <Nav />
                <div className={classes.topMargin}>
                    <h1>EVENT PHOTOS</h1>
                            <Grid container spacing={4} className={classes.container}>
                            {this.props.photosReducer.map( (item) => {
                            return(
                                <Grid item key={item.id}>
                                    <PhotosPageItem item={item} />
                                </Grid>
                                )
                                })}
                            </Grid>
                </div>
            </div>
        )
    }
}


const putReduxStateOnProps = (reduxStore) => ({
    photosReducer: reduxStore.photosReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(PhotosPage));
