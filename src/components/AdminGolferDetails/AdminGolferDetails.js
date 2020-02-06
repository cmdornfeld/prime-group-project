import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


class AdminGolferDetails extends Component {

    state = {
        first: '',
        last: '',
        goal: '',
        bio: '',
        purpose: '',
        url: '',
        editName: false,
        editImage: false,
        editGoal: false,
        editBio: false,
        editPurpose: false,
    }

    editName = () => {
        this.setState({
            editName: true,
            first: this.props.golferIdReducer.first_name,
            last: this.props.golferIdReducer.last_name
        })
    }

    cancelEditName = () => {
        this.setState({
            editName: false,
            first: '',
            last: '',
        })
    }

    saveEditName = () => {
        this.props.dispatch({ type: 'EDIT_GOLFER_NAME', payload: {
            first: this.state.first,
            last: this.state.last,
            id: this.props.golferIdReducer.id
        }})
        this.setState({
            first: '',
            last: '',
            editName: false
        })
    }

    editGoal = () => {
        this.setState({
            editGoal: true,
            goal: this.props.golferIdReducer.goal
        })
    }

    cancelEditGoal = () => {
        this.setState({
            editGoal: false,
            goal: ''
        })
    }

    saveEditGoal = () => {
        this.props.dispatch({ type: 'EDIT_GOLFER_GOAL', payload: {
            goal: this.state.goal,
            id: this.props.golferIdReducer.id
        }})
        this.setState({
            goal: '',
            editGoal: false
        })
    }

    editBio = () => {
        this.setState({
            editBio: true,
            bio: this.props.golferIdReducer.bio
        })
    }

    cancelEditBio = () => {
        this.setState({
            editBio: false,
            bio: ''
        })
    }

    saveEditBio = () => {
        this.props.dispatch({ type: 'EDIT_GOLFER_BIO', payload: {
            bio: this.state.bio,
            id: this.props.golferIdReducer.id
        }})
        this.setState({
            bio: '',
            editBio: false
        })
    }

    editPurpose = () => {
        this.setState({
            editPurpose: true,
            purpose: this.props.golferIdReducer.purpose
        })
    }

    cancelEditPurpose = () => {
        this.setState({
            editPurpose: false,
            purpose: ''
        })
    }

    saveEditPurpose = () => {
        this.props.dispatch({ type: 'EDIT_GOLFER_PURPOSE', payload: {
            purpose: this.state.purpose,
            id: this.props.golferIdReducer.id
        }})
        this.setState({
            purpose: '',
            editPurpose: false
        })
    }

    editPhoto = () => {
        this.setState({
            editImage: true
        })
    }

    cancelEditPhoto = () => {
        this.setState({
            editImage: false
        })
    }

    handleFinishedUpload = info => {
        this.setState({
            url: info.fileUrl
        })
    }

    saveEditPhoto = () => {
        this.props.dispatch({ type: 'EDIT_GOLFER_PHOTO', payload: {
            url: this.state.url,
            id: this.props.golferIdReducer.id
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
            <div class="inner-drop">
                <p>Click or Drop File Here!</p>
            </div>
        )


        const editName = this.state.editName === false ? (
            <Fragment>
                <h3>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h3>
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
                    value={this.state.first}
                    onChange={this.handleInputChangeFor('first')}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    value={this.state.last}
                    onChange={this.handleInputChangeFor('last')}
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

        const editGoal = this.state.editGoal === false ? (
            <Fragment>
                ${this.props.golferIdReducer.goal}
                <button
                onClick={this.editGoal}
                >
                    Edit Goal
                </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <input
                    type="number"
                    value={this.state.goal}
                    onChange={this.handleInputChangeFor('goal')}
                    />
                </div>
                <button
                onClick={this.cancelEditGoal}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditGoal}
                >
                    Save
                </button>
            </Fragment>
        )

        const editBio = this.state.editBio === false ? (
            <Fragment>
                <p>{this.props.golferIdReducer.bio}</p>
                <button
                onClick={this.editBio}
                >
                    Edit Goal
                </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <textarea
                    rows='10'
                    cols="100"
                    type="number"
                    value={this.state.bio}
                    onChange={this.handleInputChangeFor('bio')}
                    />
                </div>
                <button
                onClick={this.cancelEditBio}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditBio}
                >
                    Save
                </button>
            </Fragment>
        )

        const editPurpose = this.state.editPurpose === false ? (
            <Fragment>
                <p>{this.props.golferIdReducer.purpose}</p>
                <button
                onClick={this.editPurpose}
                >
                    Edit Goal
                </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <textarea
                    rows='10'
                    cols="100"
                    type="number"
                    value={this.state.purpose}
                    onChange={this.handleInputChangeFor('purpose')}
                    />
                </div>
                <button
                onClick={this.cancelEditPurpose}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditPurpose}
                >
                    Save
                </button>
            </Fragment>
        )

        const editImage = this.state.editImage === false ? (
            <Fragment>
                <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} width='220px' height='200px' />
                <div>
                    <button
                    onClick={this.editPhoto}
                    >
                        Edit Photo
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
                onClick={this.cancelEditPhoto}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditPhoto}
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
                <h3>Goal: {editGoal}</h3>
                <h3>Bio</h3>
                {editBio}
                <h3>Why am I doing this?</h3>
                {editPurpose}
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    golferIdReducer: reduxStore.golferIdReducer
});

export default connect(putReduxStateOnProps)(AdminGolferDetails)
