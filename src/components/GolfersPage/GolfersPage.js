import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

// Material UI
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
    topMargin: {
        marginTop: '8%'
      },
    container: {
        width: '90%',
        margin: '0 auto',
        justifyContent: 'center',
        marginTop: '1rem'
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
                <div className={classes.topMargin}>
                <h1>GOLFERS</h1>
                <Grid container spacing={4} className={classes.container}>
                    {this.props.golferReducer.map( item => {
                    if(item.first_name === 'General'){
                        return null;
                    } else {
                    return(
                        <Grid item key={item.id}>
                            <div>
                                <h3>{item.first_name} {item.last_name}</h3>
                                <img src={item.img_url} alt={item.id} onClick={() => this.viewGolfer(item.id)} width='240px'/>
                            </div>
                        </Grid>
                        )
                    }
                        })}
                </Grid>
                </div>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(GolfersPage));
