import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import {withStyles} from '@material-ui/core/styles';

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

class GolfersPage extends Component {

    componentDidMount() {
        this.getGolfers();
    }

    getGolfers = () => {
        this.props.dispatch({ type: 'GET_ALL_GOLFERS' })
    }
    
    viewGolfer = (id) => {
        this.props.history.push(`/view/${id}`);
    }
    
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Nav />
                <h1 style={{textAlign:'center', fontSize:'50px', fontFamily:'serif'}}>2020 GOLFERS</h1>
                <Card className={classes.card}>
                <Grid container spacing={3} justify='center'>
                    {this.props.golferReducer.map( (item) => {
                    return(
                        <Grid item>
                        <div key={item.id}>
                            <h3 style={{textAlign:'center'}}>{item.first_name} {item.last_name}</h3>
                            <img src={item.img_url} alt={item.id} onClick={() => this.viewGolfer(item.id)} width='240px' height='200px' textAlign='center' />
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
    golferReducer: reduxStore.golferReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles) (GolfersPage));
