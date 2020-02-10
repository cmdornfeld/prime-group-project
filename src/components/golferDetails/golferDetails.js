import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Nav from '../Nav/Nav';

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
    card: {
        marginTop: 50,
        width: 1000,
        height: 'auto',
        margin: '0 auto',
        padding: 40,
        textAlign: 'center',
        backgroundColor: '#FFFAFA',
        color: '#253055',
        display:'inline-block',
    },
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
                <Grid container spacing={3} justify='center'>
                    <Grid item >
                        <Card className={classes.card}>
                        <Grid container spacing={3} justify='center'>
                            <Grid item sm={5}>
                                <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} width='250px' />
                                <h3 >Total Donations: {this.props.golferIdReducer.total}</h3>
                                <LinearProgress value={normalise(golferDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}} 
                                    onClick={this.handleTooltipOpen} color="primary" variant="determinate" style={{height:"20px", width:"20%", borderRadius:"10px", marginLeft:'150px'}}/>
                                <h3>Goal: ${this.props.golferIdReducer.goal}</h3>
                    
                            </Grid>
                                {/* <div>
                                    <h3 style={{textAlign:'center', marginTop:'20px', marginBottom:'auto' }}>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h3>
                                </div>

                                <div style={{textAlign:'center', width:'700px', bottom:'100px', right:'400px', marginRight:'900px', display:'inline-block'}}>
                                    <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} width='220px' height='200px' />
                                    <h3 >Total Donations: {this.props.golferIdReducer.total}</h3>
                                    
                                    <h3>Goal: {this.props.golferIdReducer.goal}</h3>
                                </div>
                                <LinearProgress value={normalise(golferDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}} 
                                            onClick={this.handleTooltipOpen} color="primary" variant="determinate" style={{height:"20px", width:"20%", borderRadius:"10px", marginLeft:'200px'}}/>

                                <div style={{textAlign:'center', width:'700px', bottom:'100px', right:'400px', marginLeft:'450px', marginBottom:'100px', display:'inline-block'}}>
                                    <h3>Bio</h3>
                                    <p>{this.props.golferIdReducer.bio}</p>
                                    <h3>Why am I doing this?</h3>
                                    <p >{this.props.golferIdReducer.purpose}</p>
                                </div> */}
                            <Grid item sm={7}>
                                <Grid container spacing={3} justify='left'>
                                    <Grid item sm={12}>
                                        <div style={{float: 'left'}}>
                                            <h2>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h2>
                                        </div>
                                    </Grid>
                                    <Grid item sm={12}> 
                                        <div style={{float: 'left'}}>
                                            <h3>Bio</h3>
                                        </div>
                                        <div style={{float: 'left', width:'600px'}}> 
                                            <p>{this.props.golferIdReducer.bio}</p>
                                        </div>
                                        <div style={{float: 'left'}}>
                                            <h3>Why am I doing this?</h3>
                                        </div>
                                        <div>
                                            <p style={{float: 'left', width:'550px'}}>{this.props.golferIdReducer.purpose}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        </Card>
                        </Grid>
                </Grid>
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