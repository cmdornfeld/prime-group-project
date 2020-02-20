import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav'

// Material UI
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

//style for the public home page
const styles = {
  card: {
      width: '60%',
      height: 'auto',
      margin: '0 auto',
      marginTop: '4%',
      padding: '3%'
  },
  topMargin: {
      marginTop: '8%'
  },
  mission: {
      width: '50%',
      margin: '0 auto',
      textAlign: 'center'
  },
  bio: {
      display: 'inline-block',
      textAlign: 'center',
      fontSize: '1rem',
      bottom: '400px',
      right: '100px',
}
};

class AboutPage extends Component {

// this will display the mission and foundation for the public about page
  componentDidMount() {
    this.getMission();
    this.getFoundation();
}
  
  getMission = ()=> {
    this.props.dispatch({ type: "GET_MISSION"});
  }

  getFoundation = ()=> {
    this.props.dispatch({ type: "GET_FOUNDATION"});
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Nav />
        <div className={classes.topMargin}>
          <h1>ABOUT</h1>
            <div className={classes.mission}>
              <p>
                {this.props.missionReducer.about}
              </p>
            </div>
          <Card className={classes.card}>
            <Grid container spacing={9} justify='center'>
            {this.props.foundationReducer.map( (item) => {
              return(
                <div style={{background:'#ffffff', width:'auto', height: 'auto', color:'#253055', padding:'2rem'}}>
                <Grid item key={item.id}>
                  <h3 style={{textAlign:'center', bottom:'100px', right:'400px', marginTop: '2.5rem'}}>{item.name}</h3>

                  <Grid container spacing={1} justify='center' >
                    <img src={item.url} alt={item.name} width='260px' height='auto' textAlign='center' style={{float:'left', paddingRight : '5px', 
                    display:'inline-block'}}/>
                  </Grid>

                  <br></br>
                    <Grid container spacing={1} justify='center'>
                    <p  style={{textAlign:'left', width:'450px', bottom:'100px', right:'400px' }}>{item.bio}</p>
                  </Grid>

                </Grid>
                </div>
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
  missionReducer: reduxStore.missionReducer,
  foundationReducer: reduxStore.foundationReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AboutPage));
