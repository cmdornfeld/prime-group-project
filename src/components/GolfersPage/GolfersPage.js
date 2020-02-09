import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

// Material UI Stuff
import {withStyles} from '@material-ui/core/styles';


const styles = {
    topMargin: {
      marginTop: '100px'
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

        const { classes } = this.props;

        return (
            <div>
                <Nav />
                <div className={classes.topMargin}>
                    <p>Golfers Page</p>
                    {this.props.golferReducer.map( (item) => {
                    return(
                        <div key={item.id}>
                            <h3>{item.first_name} {item.last_name}</h3>
                            <img src={item.img_url} alt={item.id} onClick={() => this.viewGolfer(item.id)} width='220px' height='200px' />
                            </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(GolfersPage));
