import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
    linearColorPrimary: {
        backgroundColor: '#d3dee0',
    },
    linearBarColorPrimary: {
        backgroundColor: '#b49759',
    },
    topMargin: {
        marginTop: '100px'
    }
});

class golferDetails extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_GOLFER_DETAILS', payload: this.props.match.params.id })
    }

    render(props) {

        const { classes } = this.props;
        
        let MAX = this.props.golferIdReducer.goal;
        const golferDonationTotal = this.props.golferIdReducer.total;
        const normalise = value => {
            let normalizedNum = (Number(golferDonationTotal)) * 100 / (Number(MAX))
            if (normalizedNum > 100){
              normalizedNum = 100;
            }
            return normalizedNum;
        };

        return (
            <div>
                <Nav />
                <div className={classes.topMargin}>
                    <h3>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h3>
                    <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} width='220px' height='200px' />
                    <h3>Total Donations: {this.props.golferIdReducer.total}</h3>
                    <LinearProgress value={normalise(golferDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}} 
                            onClick={this.handleTooltipOpen} color="primary" variant="determinate" style={{height:"20px", width:"20%", borderRadius:"10px"}}/>
                    <h3>Goal: {this.props.golferIdReducer.goal}</h3>
                    <h3>Bio</h3>
                    <p>{this.props.golferIdReducer.bio}</p>
                    <h3>Why am I doing this?</h3>
                    <p>{this.props.golferIdReducer.purpose}</p>
                </div>
            </div>
        );
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    golferIdReducer: reduxStore.golferIdReducer
});

golferDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(putReduxStateOnProps)(withStyles(styles)(golferDetails));