import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import PhotosPageItem from '../PhotosPageItem/PhotosPageItem'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Nav from '../Nav/Nav';


const styles = theme => ({
    card: {
        width: 'auto',
        height: 'auto',
        padding: 90,
        margin: 100,
        textAlign: 'center'
    },
    topMargin: {
        marginTop: '8%'
    },
    dialog: {
        width: '80%'
    }
});

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
                        <Card className={classes.card}>
                            <Grid container spacing={4} justify='center'>
                            {this.props.photosReducer.map( item => ( 
                            <Grid item xs={6} md={4} key={item.id}>
                                <PhotosPageItem item={item} /> 
                            </Grid>
                            ))}
                            </Grid>
                        </Card>
                </div>
            </div>
        )
    }
}


const putReduxStateOnProps = (reduxStore) => ({
    photosReducer: reduxStore.photosReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(PhotosPage));
