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
                <h1 style={{textAlign:'center', fontSize:'50px'}}>100 HOLES FOR HOPE PHOTOS</h1>
                        <Card className={classes.card}>
                            <Grid container spacing={3} justify='center'>
                            {this.props.photosReducer.map( (item) => {
                            return(
                                <Grid item>
                                <div style={{ textAlign:'center'}}>
                                    <img src={item.url} alt={item.description} width='220px' height='330px'  width='240px' height='200px' textAlign='center'/>
                                </div>
                                </Grid>
                                )
                                })}
                            </Grid>
                        </Card>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    photosReducer: reduxStore.photosReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(PhotosPage));
