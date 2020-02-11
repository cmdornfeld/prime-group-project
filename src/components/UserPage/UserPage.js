import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs'
import HolesforHope from './100HolesforHope.png';

import './Userpage.css';
import Nav from '../Nav/Nav'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Grid from '@material-ui/core/grid';

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
    marginTop: '140px'
  },
  card: {
    textAlign: 'center'
  },
  logo: {
    textAlign: 'center'
  }
});

class UserPage extends Component {

  componentDidMount() {
    this.getVideo();
    this.getEvent();
    this.getGolferGoalTotal();
    this.getGolferDonationTotal();
    this.getPartnerPledgeTotal();
    this.getGoalInfo();
}

getVideo = ()=> {
  this.props.dispatch({ type: "GET_VIDEOS"});
}

getEvent = ()=> {
  this.props.dispatch({ type: "GET_EVENTS"});
}

getGolferGoalTotal = () => {
  this.props.dispatch({ type: "GET_GOLFERS_GOAL_TOTAL" });
}

getGolferDonationTotal = () => {
  this.props.dispatch({ type: "GET_GOLFERS_DONATION_TOTAL" });
}

getPartnerPledgeTotal = () => {
  this.props.dispatch({ type: "GET_PARTNER_PLEDGE_TOTAL" });
}

getGoalInfo = () => {
  this.props.dispatch({ type: "GET_ENTIRE_GOAL_INFO" });
}

  render(props) {

    const { classes } = this.props;
        
    let golferGoalTotal = this.props.golferGoalTotal.total;
    const golferDonationTotal = this.props.golferDonationTotal.total_received;
    const normaliseGolferTotals = value => {
        let normalizedNum = (Number(golferDonationTotal)) * 100 / (Number(golferGoalTotal))
        if (normalizedNum > 100){
          normalizedNum = 100;
        }
        return normalizedNum;
    }

    let entireGoal = this.props.entireGoal.goal;
    const entireDonationTotal = Number(this.props.golferDonationTotal.total_received) + Number(this.props.partnerPledgeTotal.total);
    const normaliseEntireTotals = value => {
        let normalizedNum = (Number(entireDonationTotal)) * 100 / (Number(entireGoal))
        if (normalizedNum > 100){
          normalizedNum = 100;
        }
        return normalizedNum;
    }

    return (
      <div>
        <Nav />
        <div className={classes.topMargin}>
          <div className={classes.logo}>
            <img src={HolesforHope} alt="100 Holes For Hope" width='30%'  />
          </div>
          <Grid container spacing={4}>

            <Grid item sm={6}>
              <div style={{marginLeft: '60%'}}>
                <h4>{this.props.entireGoal.year} pledges: ${this.props.golferDonationTotal.total_received}</h4>
                <LinearProgress value={normaliseGolferTotals(golferDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}}
                color="primary" variant="determinate" style={{height:"20px", width:"75%", borderRadius:"10px"}}/>
                <h4>Goal ${this.props.golferGoalTotal.total}</h4>
              </div>
              
            </Grid>

            <Grid item sm={6}>
              <div style={{marginLeft: '5%'}}>
              <h4>Total Raised in {this.props.entireGoal.year} ${entireDonationTotal}</h4>
              <LinearProgress value={normaliseEntireTotals(entireDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}}
              color="primary" variant="determinate" style={{height:"20px", width:"30%", borderRadius:"10px"}}/>
              <h4>Goal ${entireGoal}</h4>
              </div>
              
            </Grid>
          </Grid>
            <h2 align="center">{dayjs(this.props.eventInfoReducer.date).format('MMMM DD YYYY')} {this.props.eventInfoReducer.location}</h2>
            <div className={classes.card}>
              {this.props.videoReducer.map( (item) => {
                return(
                  <div >
                    <h1 align="center" color='white'>{item.title}</h1>
                    <iframe src={item.url} width='880px' height='500px' />
                    </div>
                )
              })}
            </div>
          </div>
      </div>
    );
  }
}
const putReduxStateOnProps = (reduxStore) => ({
  videoReducer: reduxStore.videoReducer,
  eventInfoReducer: reduxStore.eventInfoReducer,
  golferGoalTotal: reduxStore.goalReducer.golferGoalTotal,
  golferDonationTotal: reduxStore.goalReducer.golferDonationTotal,
  entireGoal: reduxStore.goalReducer.entireGoalInfo,
  partnerPledgeTotal: reduxStore.goalReducer.partnerPledgeTotal,
});

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(putReduxStateOnProps)(withStyles(styles)(UserPage));
