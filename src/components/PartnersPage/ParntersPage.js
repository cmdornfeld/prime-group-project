import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';



const styles =  {
    card: {
        width: '60%',
        textAlign: 'center',
        margin: '0 auto',
        padding: '2rem',
        marginTop: '4%',
        color: '#253155'
    },
    topMargin: {
        marginTop: '8%'
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
                <div className={classes.topMargin}>
                    <h1>Thank You 2019 Partners</h1>
                    <Card className={classes.card}>
                        <p style={{textAlign:"center"}}>If you are interested in sponsorship opportunties, please reach out to Maggie 
                            Sutton at msutton@pgahq.com, or click <a href="https://2974087d-4c0d-4b25-8875-039fee4fd083.filesusr.com/ugd/823de7_68d1b9577dab4a6b8312c12061639400.pdf" 
                            target="_blank">here</a> to download sponsorship information.
                        </p>
                            {this.props.publicSponsorReducer.map(partner => {
                                if(partner.sponsor_level === currentLevel){
                                    return (
                                            <span item key={partner.id} style={{display: 'inline-block'}}>
                                                <img src={partner.img_url} alt={partner.name}/>
                                            </span>
                                    )
                                } 
                                else {
                                    currentLevel = partner.sponsor_level;
                                    return (
                                        <Fragment>
                                        <div key={partner.id}>
                                            <h2 style={{fontSize: '2rem', margin: '1rem'}}>{partner.title} - ${parseInt(partner.amount).toLocaleString()}</h2>
                                        </div>
                                        <div style={{display: 'inline-block'}}>
                                            <img src={partner.img_url} alt={partner.name} />
                                        </div>
                                        </Fragment>
                                    )
                                }
                            })}
                    </Card>
                </div>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    publicSponsorReducer: reduxStore.publicSponsorReducer,
});

export default connect(putReduxStateOnProps)(withStyles(styles)(ParntersPage));
