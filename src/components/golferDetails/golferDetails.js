import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    progress: {
      margin: theme.spacing(2)
    },
    linearColorPrimary: {
        backgroundColor: '#d3dee0',
    },
    linearBarColorPrimary: {
        backgroundColor: '#b49759',
    },
    card: {
        marginTop: '10%',
        width: '60%',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        color: '#253055',
    },
    leftCard: {
        textAlign: 'center',
        marginTop: '2rem',
        padding: '1.5rem'
    },
    pledgeButton: {
        backgroundColor: '#b49759',
        margin: '1rem',
        color: '#ffffff',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#b49759'
            }
    },
    backButton: {
        backgroundColor: '#253155',
        margin: '1rem',
        color: '#ffffff',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#253155'
            }
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
                <Card className={classes.card}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <div className={classes.leftCard}>
                                <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} width='280px' />
                                <h3 >Total Donations: ${parseInt(this.props.golferIdReducer.total).toLocaleString()}</h3>
                                <LinearProgress value={normalise(golferDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}} 
                                    onClick={this.handleTooltipOpen} color="primary" variant="determinate" style={{height:"1.8rem", width:"65%", borderRadius:"2rem", marginLeft:"70px"}}/>
                                <h3>Goal: ${parseInt(this.props.golferIdReducer.goal).toLocaleString()}</h3>
                                <Button variant="contained" className={classes.pledgeButton} onClick={()=> this.props.history.push('/pledge')}>
                                    Pledge
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs>
                            <div>
                                <h2>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h2>
                                <h3>Bio</h3>
                                <p>{this.props.golferIdReducer.bio}</p>
                                <h3>Why am I doing this?</h3>
                                <p>{this.props.golferIdReducer.purpose}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
                <div style={{textAlign: 'center'}}>
                    <Button variant="contained" className={classes.backButton} onClick={()=> this.props.history.push('/golfers')}>
                        Back
                    </Button>
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