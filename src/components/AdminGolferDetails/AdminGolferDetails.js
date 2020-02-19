import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';

const styles =  {
    topMargin: {
        marginTop: '100px'
    },
    textField: {
        width: 600
    }
}
const dropStyles ={
    width: "200px",
    height: "50px",
    border: "1px solid black",
    "background-color": "#dddddd",
    cursor: "pointer",
    margin: '0 auto'
}

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

    componentDidMount() {
        this.props.dispatch({ type: 'ADMIN_GET_GOLFER_DETAILS', payload: this.props.match.params.id })
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

        const { classes } = this.props;

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
                <Button
                onClick={this.editName}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Edit Name
                </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div style={{marginTop:6}}>
                    <TextField
                    label="First Name"
                    variant="outlined"
                    type="text"
                    value={this.state.first}
                    onChange={this.handleInputChangeFor('first')}
                    />
                </div>
                <div style={{marginTop:6}}>
                    <TextField
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    value={this.state.last}
                    onChange={this.handleInputChangeFor('last')}
                    />
                </div>
                <Button
                onClick={this.cancelEditName}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.saveEditName}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                
                >
                    Save
                </Button>
            </Fragment>
        )

        const editGoal = this.state.editGoal === false ? (
            <Fragment>
                <div>
                    <h3>Goal: ${parseInt(this.props.golferIdReducer.goal).toLocaleString()}</h3>
                </div>
                <div>
                <Button
                onClick={this.editGoal}
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Edit Goal
                </Button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <TextField
                    label="Goal"
                    type="number"
                    variant="outlined"
                    value={this.state.goal}
                    onChange={this.handleInputChangeFor('goal')}
                    />
                </div>
                <Button
                onClick={this.cancelEditGoal}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.saveEditGoal}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Save
                </Button>
            </Fragment>
        )

        const editBio = this.state.editBio === false ? (
            <Fragment>
                <p>{this.props.golferIdReducer.bio}</p>
                <Button
                onClick={this.editBio}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Edit Bio
                </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <TextField
                    label='Bio'
                    className={classes.textField}
                    multiline
                    variant="outlined"
                    type="text"
                    rows="6"
                    value={this.state.bio}
                    onChange={this.handleInputChangeFor('bio')}
                    />
                </div>
                <Button
                onClick={this.cancelEditBio}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.saveEditBio}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Save
                </Button>
            </Fragment>
        )

        const editPurpose = this.state.editPurpose === false ? (
            <Fragment>
                <p>{this.props.golferIdReducer.purpose}</p>
                <Button
                onClick={this.editPurpose}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Edit purpose
                </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <TextField
                    label='Purpose'
                    className={classes.textField}
                    multiline
                    variant="outlined"
                    type="text"
                    rows="6"
                    value={this.state.purpose}
                    onChange={this.handleInputChangeFor('purpose')}
                    />
                </div>
                <Button
                onClick={this.cancelEditPurpose}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.saveEditPurpose}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Save
                </Button>
            </Fragment>
        )

        const editImage = this.state.editImage === false ? (
            <Fragment>
                <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} style={{objectFit: 'cover'}} width='220px' height='200px' />
                <div style={{textAlign:'center'}}>
                    <Button
                    onClick={this.editPhoto}
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    >
                        Edit Photo
                    </Button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <DropzoneS3Uploader
                    children={innderDropElement}
                    onFinish={this.handleFinishedUpload}
                    s3Url={s3Url}
                    style={dropStyles}
                    maxSize={1024 * 1024 * 5}
                    upload={uploadOptions}
                />
                <Button
                onClick={this.cancelEditPhoto}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.saveEditPhoto}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Save
                </Button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <div className={classes.topMargin}>
                    <div style={{textAlign:'center', marginTop:1}}>
                        {editName}
                    </div>
                    <div style={{textAlign:'center', marginTop:10}}>
                        {editImage}
                    </div>
                    <div style={{textAlign:'center', marginTop:10}}>
                        {editGoal}
                    </div>
                    <div style={{textAlign:'center', marginTop:10}}>
                    <h3>Bio</h3>
                    {editBio}
                    </div>
                    <div style={{textAlign:'center', marginTop:10}}>
                    <h3>Why am I doing this?</h3>
                    {editPurpose}
                    </div>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    golferIdReducer: reduxStore.golferIdReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminGolferDetails));
