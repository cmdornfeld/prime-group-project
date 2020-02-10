import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './aboutPage.css';
import Nav from '../Nav/Nav'

const styles = {
  topMargin: {
    marginTop: '100px'
  }

};

class AboutPage extends Component {

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
          <h1 style={{textAlign:'center', fontSize:'90px'}}>ABOUT</h1>

          <Grid conatainer spacing={4} justify="center">
              <div className='mission'>
                <p style={{color:'rgb(37,49,85);', textAlign: 'center', width:'800px', bottom:'100px', right:'400px', display: 'inline-block'}}>
                  {this.props.missionReducer.about}
                </p>
              </div>
            
          </Grid>
            <Grid container spacing={9} justify='center'>
            {this.props.foundationReducer.map( (item) => {
              return(
                <div style={{background:'#ffffff', width:'auto', height: 'auto', color:'#253055', marginTop: 100, padding:40}}>
                <Grid item key={item.id}>
                  <h3 style={{textAlign:'center', bottom:'100px', right:'400px', marginTop: 40}}>{item.name}</h3>

                  <Grid container spacing={1} justify='center' >
                    <img src={item.url} alt={item.name} width='240px' height='200px' textAlign='center' style={{float:'left', paddingRight : '5px', 
                    display:'inline-block'}}/>
                  </Grid>

                  <br></br>
                    <Grid container spacing={1} justify='center'>
                    <p  style={{textAlign:'center', width:'450px', bottom:'100px', right:'400px' }}>{item.bio}</p>
                  </Grid>

                </Grid>
                </div>
              )
            })}
            </Grid>
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
