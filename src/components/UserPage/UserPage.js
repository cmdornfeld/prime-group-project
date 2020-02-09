import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs'
import HolesforHope from './100HolesforHope.png';

import './Userpage.css';
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
},
});

class UserPage extends Component {

  componentDidMount() {
    this.getVideo();
    this.getEvent();
    this.getGolferGoalTotal();
    this.getGolferDonationTotal();
    this.getPartnerPledgeTotal();
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

    let entireGoal = 75000;
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
          <h4>This year's pledges: {this.props.golferDonationTotal.total_received}</h4>
          <LinearProgress value={normaliseGolferTotals(golferDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}}
            color="primary" variant="determinate" style={{height:"20px", width:"20%", borderRadius:"10px"}}/>
          <h4>Goal ${this.props.golferGoalTotal.total}</h4>
          <h4>Total Raised ${entireDonationTotal}</h4>
          <LinearProgress value={normaliseEntireTotals(entireDonationTotal)} classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}}
            color="primary" variant="determinate" style={{height:"20px", width:"20%", borderRadius:"10px"}}/>
          <h4>Goal ${entireGoal}</h4>
          <div class='title'>
            <img src={HolesforHope} alt="100 Holes For Hope" width='420px' height='200px' />
          </div>
            <h2 align="center">{dayjs(this.props.eventInfoReducer.date).format('MMMM DD YYYY')} {this.props.eventInfoReducer.location}</h2>
            <div class='card'>
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
  // entireGoal: reduxStore.goalReducer.entireGoal,
  partnerPledgeTotal: reduxStore.goalReducer.partnerPledgeTotal,
});

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(putReduxStateOnProps)(withStyles(styles)(UserPage));
