import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Nav from '../Nav/Nav';

const styles = {
    card: {
        width: 'auto',
        height: 'auto',
        padding: 90,
        margin: 100,
        textAlign: 'center'
    },
    topMargin: {
        marginTop: '100px'
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
                <h1 style={{textAlign:'center', fontSize:'6rem'}}>EVENT PHOTOS</h1>
                        <Card className={classes.card}>
                            <Grid container spacing={3} justify='center'>
                            {this.props.photosReducer.map( (item) => {
                            return(
                                <Grid item>
                                <div style={{ textAlign:'center'}}>
                                    <img src={item.url} alt={item.description} width='240px' height='200px' textAlign='center'/>
                                </div>
                                </Grid>
                                )
                                })}
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
