import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

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
        this.props.dispatch({ type: 'ADD_PARTNER', payload: objectToSend});
        this.setState({
            companyName: '',
            url: '',
            partnerLevel: ''
        })
    }

    render() {

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = 'https://hundred-holes-bucket.s3.amazonaws.com'

        const innderDropElement = (
            <div class="inner-drop">
                <p>Click or Drop File Here!</p>
            </div>
        )

        return (
            <Fragment>
            <div>
                <AdminNav />
                <p>Admin Parnters</p>
                {JSON.stringify(this.state)}
            </div>
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
                            {level.title} (${level.amount})
                        </option>
                    )
                    )}
                </select>
            </div>
            <button onClick={this.addPartner}>Add Partner</button>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    companies: reduxStore.partnerReducer.company,
    level: reduxStore.partnerReducer.level
});

export default connect(putReduxStateOnProps)(AdminPartnersPage);
