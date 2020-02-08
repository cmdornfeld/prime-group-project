import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';



const styles =  {
    card: {
        width: 900,
        height: 'auto',
        textAlign: 'center',
        margin: ' 0 auto',
        padding: 30,
  
    },
    title: {
        width: 600,
    }
}

class ParntersPage extends Component {

    componentDidMount() {
        this.getSponsor();
    }
    getSponsor = () => {
        this.props.dispatch({ type: 'GET_PUBLIC_SPONSOR' })
    }

    render() {
        const { classes } = this.props;
        let currentLevel = null;
        return (
            <div>
                <Nav />
                <h1 style={{textAlign:"center"}}>Thank You to our Parnters</h1>
                <Card className={classes.card}>
                <p style={{textAlign:"center"}}>If you are interested in sponsorship opportunties, please reach out to Maggie Sutton at msutton@pgahq.com, or click <a href="https://2974087d-4c0d-4b25-8875-039fee4fd083.filesusr.com/ugd/823de7_68d1b9577dab4a6b8312c12061639400.pdf" target="_blank">here</a> to download sponsorship information.</p>
                        {this.props.publicSponsorReducer.map(partner => {
                            if(partner.sponsor_level === currentLevel){
                                return (
                                        <div item key={partner.id}>
                                            <img src={partner.img_url} alt={partner.name} />
                                        </div>
                                )
                            } 
                            else {
                                currentLevel = partner.sponsor_level;
                                return (
                                    <div key={partner.id}>
                                        <h2>{partner.title} - ${partner.amount}</h2>
                                        <img src={partner.img_url} alt={partner.name} />
                                    </div>
                                )
                            }
                        })}
                </Card>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    publicSponsorReducer: reduxStore.publicSponsorReducer,
});

export default connect(putReduxStateOnProps)(withStyles(styles)(ParntersPage));
