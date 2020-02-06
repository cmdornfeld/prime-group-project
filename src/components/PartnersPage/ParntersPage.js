import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';

class ParntersPage extends Component {

    componentDidMount() {
        this.getSponsor();
    }
    getSponsor = () => {
        this.props.dispatch({ type: 'GET_PUBLIC_SPONSOR' })
    }

    render() {
        let currentLevel = null;
        return (
            <div>
                <Nav />
                <p>partners</p>
                {this.props.publicSponsorReducer.map(partner => {
                    if(partner.sponsor_level === currentLevel){
                        return (
                            <div key={partner.id}>
                                <img src={partner.img_url} alt={partner.name} />
                            </div>
                        )
                    } 
                    else {
                        currentLevel = partner.sponsor_level;
                        return (
                            <div key={partner.id}>
                                <h3>{partner.title} {partner.amount}</h3>
                                <img src={partner.img_url} alt={partner.name} />
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxStore) => ({
    publicSponsorReducer: reduxStore.publicSponsorReducer,
});

export default connect(putReduxStateOnProps) (ParntersPage);
