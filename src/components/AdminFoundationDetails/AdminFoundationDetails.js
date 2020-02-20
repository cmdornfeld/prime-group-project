import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import AdminNav from '../AdminNav/AdminNav'

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//style for the foundation details 
const styles = {
    center: {
        textAlign: 'center'
    },
    primaryButton: {
        backgroundColor: '#b49759', 
        color: '#ffffff',
        marginTop: 10,
        '&:hover': {
            backgroundColor: '#b49759'
        }
    },
    secondaryButton: {
        backgroundColor: '#253155', 
        color: '#ffffff',
        marginTop: 10,
        '&:hover': {
            backgroundColor: '#253155'
        }
    },
    textField: {
        width: 300
    },
    textArea: {
        width: 600,
        marginTop: 10
    },
    paragraph: {
        width: 600, 
        margin: '0 auto'
    },
    topMargin: {
        marginTop: 130
    }
}

const dropStyles ={
    width: "200px",
    height: "50px",
    border: "1px solid black",
    "background-color": "#dddddd",
    cursor: "pointer",
    margin: '0 auto',
    marginTop: 10
}


export class AdminFoundationDetails extends Component {

    state = {
        title: '',
        url: '',
        bio: '',
        editName: false,
        editImage: false,
        editBio: false
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.dispatch({ type: 'GET_FOUNDATION_DETAILS', payload: this.props.match.params.id })
    }

    //this will change for the foun
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    //this will upload image 
    handleFinishedUpload = info => {
        this.setState({
            url: info.fileUrl
        })
    }

    editName = () => {
        this.setState({
            title: this.props.foundationDetailsReducer.name,
            editName: true
        })
    }

    cancelEditName = () => {
        this.setState({
            editName: false
        })
    }

    saveEditName = () => {
        this.props.dispatch({type: 'EDIT_FOUNDATION_NAME', payload: {
            id: this.props.foundationDetailsReducer.id,
            name: this.state.title
        }})
        this.setState({
            editName: false
        })
    }

    //this will edit image for the th about page
    editImage = () => {
        this.setState({
            editImage: true
        })
    }

    // this will cancle image for the admin about page 
    cancelEditImage = () => {
        this.setState({
            editImage: false
        })
    }

    //saves the image for the admin about page 
    saveEditImage = () => {
        this.props.dispatch({type: 'EDIT_FOUNDATION_IMAGE', payload: {
            id: this.props.foundationDetailsReducer.id,
            url: this.state.url
        }})
        this.setState({
            editImage: false,
            url: ''
        })
    }

    // edit foundation bio for the admin about page 
    editBio = () => {
        this.setState({
            editBio: true,
            bio: this.props.foundationDetailsReducer.bio
        })
    }

    // cancle foundation bio for the admin about page 
    cancelEditBio = () => {
        this.setState({
            editBio: false
        })
    }

    // save foundation bio for the admin about page 
    saveEditBio = () => {
        this.props.dispatch({type: 'EDIT_FOUNDATION_BIO', payload: {
            id: this.props.foundationDetailsReducer.id,
            bio: this.state.bio
        }})
        this.setState({
            editBio: false
        })
    }

    goBack = () => {
        this.props.history.push('/admin/about')
    }

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
                <div className={classes.center}>
                    <h2>{this.props.foundationDetailsReducer.name}</h2>
                    <Button
                    variant="contained"
                    className={classes.primaryButton}
                    onClick={this.editName}
                    >
                        Edit
                    </Button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className={classes.center}>
                    <TextField
                        type="text"
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleInputChangeFor('title')}
                    />
                    <div>
                        <Button
                            variant="contained"
                            className={classes.secondaryButton}
                            style={{marginRight: '10px'}}
                            onClick={this.cancelEditName}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.primaryButton}
                            style={{marginLeft: '10px'}}
                            onClick={this.saveEditName}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Fragment>
        )

        const editImage = this.state.editImage === false ? (
            <Fragment>
                <div className={classes.center}>
                    <div style={{marginTop: '10px'}}>
                        <img src={this.props.foundationDetailsReducer.url} alt={this.props.bio} width='260px' />
                    </div>
                    <div>
                        <Button
                        variant="contained"
                        className={classes.primaryButton}
                        onClick={this.editImage}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className={classes.center}>
                    <div>
                        <DropzoneS3Uploader
                        children={innderDropElement}
                        onFinish={this.handleFinishedUpload}
                        s3Url={s3Url}
                        style={dropStyles}
                        maxSize={1024 * 1024 * 5}
                        upload={uploadOptions}
                    />
                    </div>
                    
                    <div>
                        <Button
                            variant="contained"
                            className={classes.secondaryButton}
                            style={{marginRight: '10px'}}
                            onClick={this.cancelEditImage}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.primaryButton}
                            style={{marginLeft: '10px'}}
                            onClick={this.saveEditImage}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Fragment>
        )

        const editBio = this.state.editBio === false ? (
            <Fragment>
                <div className={classes.center}>
                    <div style={{marginTop: '10px'}}>
                        <p className={classes.paragraph}>{this.props.foundationDetailsReducer.bio}</p>
                    </div>
                    <div>
                        <Button
                        variant="contained"
                        className={classes.primaryButton}
                        onClick={this.editBio}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className={classes.center}>
                    <div>
                    <TextField
                        label="Bio"
                        multiline
                        variant="outlined"
                        type="text"
                        rows="6"
                        className={classes.textArea}
                        value={this.state.bio}
                        onChange={this.handleInputChangeFor('bio')}
                    />
                    </div>
                    
                    <div>
                        <Button
                            variant="contained"
                            className={classes.secondaryButton}
                            style={{marginRight: '10px'}}
                            onClick={this.cancelEditBio}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.primaryButton}
                            style={{marginLeft: '10px'}}
                            onClick={this.saveEditBio}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <div className={classes.topMargin}>
                    {editName}
                </div>
                <div>
                    {editImage}
                </div>
                <div>
                    {editBio}
                </div>
                <div className={classes.center}>
                    <Button
                    variant="contained"
                    className={classes.secondaryButton}
                    onClick={this.goBack}>Back</Button>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    foundationDetailsReducer: reduxStore.foundationDetailsReducer
});


export default connect(putReduxStateOnProps)(withStyles(styles)(AdminFoundationDetails));
