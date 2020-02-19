import React, { Component, Fragment } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles =  {
    topMargin: {
        marginTop: '8%'
    },
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
    paragraph: {
        width: 600, 
        margin: '0 auto'
    },
    textArea: {
        width: 600
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

class AdminAboutPage extends Component {

    state ={ 
        mission: '',
        title: '',
        url: '',
        bio:'',
        id: '',
        editMission: false,
        addFoundation: false,
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_ADMIN_MISSION'});
        this.props.dispatch({ type: 'GET_ADMIN_FOUNDATION'});
    }

    cancelMissionSave = () => {
        this.setState({
            editMission: false,
            mission: ''
        })
    }

    cancelAddFoundation = () => {
        this.setState({
            addFoundation: false,
            title: '',
            bio: ''
        })
    }

    editMission = () => {
        if(this.state.editMission === false){
            this.setState({
                editMission: true,
                mission: this.props.missionReducer.about
            })
        } else {
            this.props.dispatch({type: 'EDIT_ADMIN_MISSION', payload: {mission: this.state.mission, id: this.props.missionReducer.id}})
            this.setState({
                editMission: false
            })
        }
    }

    addFoundation = () => {
        this.setState({
            addFoundation: true
        })
    }

    deleteFoundation = (id) => {
        this.props.dispatch({type: 'DELETE_FOUNDATION', payload: id})
    }

    saveAddFoundation = () => {
        this.props.dispatch({ type: 'ADD_FOUNDATION', payload: {
            title: this.state.title,
            bio: this.state.bio,
            image: this.state.url
        }})
        this.setState({
            addFoundation: false,
            title: '',
            bio: '',
            image: ''
        })
    }

    handleFinishedUpload = info => {
        this.setState({
            url: info.fileUrl
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    viewPartner = (id) => {
        this.props.history.push(`/admin/foundation/${id}`);
    }

    render() {

        const { classes } = this.props;

        const editMission = this.state.editMission === false ? (
            <Fragment>
                <div className={classes.paragraph}>
                    <p>{this.props.missionReducer.about}</p>
                </div>
                <div className={classes.center}>
                    <Button
                    variant="contained"
                    onClick={this.editMission}
                    className={classes.primaryButton}
                    >
                        Edit
                    </Button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className={classes.center}>
                    <TextField
                    label="Mission"
                    multiline
                    variant="outlined"
                    type="text"
                    rows="6"
                    className={classes.textArea}
                    value={this.state.mission}
                    onChange={this.handleInputChangeFor('mission')}
                    />
                    <div>
                        <Button
                        variant="contained"
                        className={classes.secondaryButton}
                        style={{marginLeft: '10px'}}
                        onClick={this.cancelMissionSave}
                        >
                            Cancel
                        </Button>
                        <Button
                        variant="contained"
                        className={classes.primaryButton}
                        style={{marginLeft: '10px'}}
                        onClick={this.editMission}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Fragment>
        )

        const uploadOptions = {
            server: 'https://lit-eyrie-42982.herokuapp.com/',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = 'https://hundred-holes-bucket.s3.amazonaws.com'

        const innderDropElement = (
            <div class="inner-drop">
                <p>Click or Drop File Here!</p>
            </div>
        )

        const addFoundation = this.state.addFoundation === false ? (
            <Fragment>
                <div className={classes.center}>
                    <Button
                    variant="contained"
                    className={classes.primaryButton}
                    onClick={this.addFoundation}
                    >
                        Add Foundation
                    </Button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className={classes.center}>
                    <div>
                        <TextField
                        label="Title"
                        variant="outlined"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChangeFor('title')}
                        />
                    </div>
                    <div>
                        <TextField
                        label="Bio"
                        variant="outlined"
                        multiline
                        type="text"
                        rows="6"
                        style={{marginTop: '10px'}}
                        className={classes.textArea}
                        value={this.state.bio}
                        onChange={this.handleInputChangeFor('bio')}
                        />
                    </div>
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
                    <Button
                    variant="contained"
                    style={{marginRight: '10px'}}
                    className={classes.secondaryButton}
                    onClick={this.cancelAddFoundation}
                    >
                        Cancel
                    </Button>
                    <Button
                    variant="contained"
                    style={{marginLeft: '10px'}}
                    className={classes.primaryButton}
                    onClick={this.saveAddFoundation}
                    >
                        Save
                    </Button>
                </div>
            </Fragment>
        )


        return (
            <div>
                <AdminNav />
                <div className={classes.topMargin}>
                    <h1 style={{textAlign:'center', fontSize:'6rem'}}>About</h1>
                    <div>
                        {editMission}
                    </div>
                    <br />
                    <div>
                        {addFoundation}
                    </div>
                    <div className={classes.center}>
                        {this.props.foundationReducer.map( (item) => {
                        return(
                            <div key={item.id}>
                            <h2>{item.name}</h2>
                            <img src={item.url} alt={item.name} width='260px'  />
                            <p className={classes.paragraph}>{item.bio}</p>
                            <Button
                                variant="contained"
                                style={{marginRight: '10px'}}
                                className={classes.secondaryButton}
                                onClick={() => this.deleteFoundation(item.id)}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                style={{marginLeft: '10px'}}
                                className={classes.primaryButton}
                                onClick={() => this.viewPartner(item.id)}
                            >
                                Edit
                            </Button>
                            </div>
                        )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


const putReduxStateOnProps = (reduxStore) => ({
    missionReducer: reduxStore.missionReducer,
    foundationReducer: reduxStore.foundationReducer
  });

  export default connect(putReduxStateOnProps)(withStyles(styles)(AdminAboutPage));
