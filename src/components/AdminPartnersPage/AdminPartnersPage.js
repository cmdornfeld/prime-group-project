import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';

const styles =  {
    topMargin: {
        marginTop: '100px'
    }
}

export class AdminPartnersPage extends Component {

    state = {
        companyName: '',
        url: '',
        partnerLevel: ''
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_PARTNERS' });
        this.props.dispatch({ type: 'GET_PARTNER_LEVELS'});
    }

    assignPartnerLevel = (event) => {
        this.setState({
            partnerLevel: event.target.value
        })
    }

    handleCompanyNameChange = (event) => {
        this.setState({
            companyName: event.target.value
        })
    }

    handleFinishedUpload = info => {
        this.setState({
            url: info.fileUrl
        })
    }

    addPartner = () => {
        let objectToSend = {
            companyName: this.state.companyName,
            url: this.state.url,
            partnerLevel: this.state.partnerLevel
        }
        this.props.dispatch({ type: 'ADD_PARTNER', payload: objectToSend });
        this.setState({
            companyName: '',
            url: '',
            partnerLevel: ''
        })
    }

    addPartnerLevel = () => {
        console.log('in addPartnerLevel');
        
    }

    viewPartner = (id) => {
        this.props.history.push(`/admin/partners/${id}`);
    }

    removePartner = (id)  => {
        console.log('in removePartner with ID:', id);
        this.props.dispatch({ type: 'REMOVE_PARTNER', payload: id });
    }

    render() {

        const { classes } = this.props;

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = 'https://hundred-holes-bucket.s3.amazonaws.com'

        const innderDropElement = (
            <div className="inner-drop">
                <p>Click or Drop File Here!</p>
            </div>
        )

        let currentLevel = null;

        return (
            <Fragment>
            <div>
                <AdminNav />
            </div>
            <div className={classes.topMargin}>
                <h2>PARTNERS</h2>
                <div>
                    <input type="text" placeholder="Company name" onChange={this.handleCompanyNameChange} />
                    <DropzoneS3Uploader
                        children={innderDropElement}
                        onFinish={this.handleFinishedUpload}
                        s3Url={s3Url}
                        maxSize={1024 * 1024 * 5}
                        upload={uploadOptions}
                    />
                    <select onChange={(event) => {this.assignPartnerLevel(event)}}>
                        {this.props.level.map(level => (
                            <option key={level.id} value={level.id}>
                                {level.title} ({level.amount})
                            </option>
                        )
                        )}
                    </select>
                    <button onClick={this.addPartnerLevel}>+</button>
                </div>
                <button onClick={this.addPartner}>Add Partner</button><br/>
                <div className="partner-box">
                    {this.props.companies.map(partner => {
                        if(partner.sponsor_level === currentLevel){
                            return (
                                <div key={partner.id}>
                                    <img src={partner.img_url} alt={partner.name} />
                                    <button onClick={()=> this.removePartner(partner.id)}>Remove</button>
                                    <button onClick={() => this.viewPartner(partner.id)}>Edit</button>
                                </div>
                            )
                        } 
                        else {
                            currentLevel = partner.sponsor_level;
                            return (
                                <div key={partner.id}>
                                    <h3>{partner.title} {partner.amount}</h3>
                                    <img src={partner.img_url} alt={partner.name} />
                                    <button onClick={()=> this.removePartner(partner.id)}>Remove</button>
                                    <button onClick={() => this.viewPartner(partner.id)}>Edit</button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    companies: reduxStore.partnerReducer.company,
    level: reduxStore.partnerReducer.level
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminPartnersPage));
