import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


class AdminPartnerDetails extends Component {

    state = {
        name: '',
        level: '',
        url: '',
        editName: false,
        editImage: false,
        editLevel: false,
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PARTNER_DETAILS', payload: this.props.match.params.id });
    }

    editName = () => {
        this.setState({
            editName: true,
            name: this.props.partner.company,
        })
    }

    cancelEditName = () => {
        this.setState({
            editName: false,
            name: '',
        })
    }

    saveEditName = () => {
        this.props.dispatch({ type: 'EDIT_PARTNER_NAME', payload: {
            name: this.state.name,
            id: this.props.partner.id
        }})
        this.setState({
            name: '',
            editName: false
        })
    }

    editLevel = () => {
        this.setState({
            editLevel: true,
        })
    }

    assignPartnerLevel = (event) => {
        this.setState({
            level: event.target.value
        })
    }

    cancelEditLevel = () => {
        this.setState({
            editLevel: false,
            level: ''
        })
    }

    saveEditLevel = () => {
        this.props.dispatch({ type: 'EDIT_PARTNER_LEVEL', payload: {
            level: this.state.level,
            id: this.props.partner.id
        }})
        this.setState({
            level: '',
            editLevel: false
        })
    }


    editImage = () => {
        this.setState({
            editImage: true
        })
    }

    cancelEditImage = () => {
        this.setState({
            editImage: false
        })
    }

    handleFinishedUpload = info => {
        this.setState({
            url: info.fileUrl
        })
    }

    saveEditImage = () => {
        this.props.dispatch({ type: 'EDIT_PARTNER_IMAGE', payload: {
            url: this.state.url,
            id: this.props.partner.id
        }})
        this.setState({
            editImage: false
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    render() {

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


        const editName = this.state.editName === false ? (
            <Fragment>
                <h3>{this.props.partner.company}</h3>
                <button
                onClick={this.editName}
                >
                    Edit Name
                </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInputChangeFor('name')}
                    />
                </div>
                <button
                onClick={this.cancelEditName}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditName}
                >
                    Save
                </button>
            </Fragment>
        )

        const editLevel = this.state.editLevel === false ? (
            <Fragment>
                <p>{this.props.partner.title}</p>
                <button
                onClick={this.editLevel}
                >
                    Edit Level
                </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                <select onChange={(event) => {this.assignPartnerLevel(event)}}>
                    {this.props.level.map(level => (
                        <option key={level.id} value={level.id}>
                            {level.title} ({level.amount})
                        </option>
                    )
                    )}
                </select>
                </div>
                <button
                onClick={this.cancelEditLevel}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditLevel}
                >
                    Save
                </button>
            </Fragment>
        )

        const editImage = this.state.editImage === false ? (
            <Fragment>
                <img src={this.props.partner.img_url} alt={this.props.partner.company} width='220px' height='200px' />
                <div>
                    <button
                    onClick={this.editImage}
                    >
                        Edit Image
                    </button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <DropzoneS3Uploader
                    children={innderDropElement}
                    onFinish={this.handleFinishedUpload}
                    s3Url={s3Url}
                    // style={dropStyles}
                    maxSize={1024 * 1024 * 5}
                    upload={uploadOptions}
                />
                <button
                onClick={this.cancelEditImage}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditImage}
                >
                    Save
                </button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <div>
                    {editName}
                </div>
                <div>
                    {editImage}
                </div>
                <div>
                    {JSON.stringify(this.state)}
                    {editLevel}
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    partner: reduxStore.partnerReducer.partner,
    level: reduxStore.partnerReducer.level
});

export default connect(putReduxStateOnProps)(AdminPartnerDetails)
