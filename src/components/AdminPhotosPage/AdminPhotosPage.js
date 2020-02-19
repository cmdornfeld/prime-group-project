import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import Grid from '@material-ui/core/grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';

const styles =  {
    card: {
        width: 'auto',
        height: 'auto',
        padding: 80,
        margin: 40,
        textAlign: 'center'
    },
    topMargin: {
        marginTop: '100px'
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


class AdminPhotosPage extends Component {

    state = {
        description: '',
        url: '',
        addPhoto: false,
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_ADMIN_PHOTOS'})
    }

    addPhoto = () => {
        this.setState({
            addPhoto: true
        })
    }

    cancelAddPhoto = () => {
        this.setState({
            addPhoto: false,
            description: ''
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

    saveAddPhoto = () => {
        this.props.dispatch({ type: 'ADMIN_ADD_PHOTO', payload: {
            description: this.state.description,
            url: this.state.url
        }})
        this.setState({
            description: '',
            url: '',
            addPhoto: false
        })
    }

    deletePhoto = (id) =>{
        this.props.dispatch({ type: 'ADMIN_DELETE_PHOTO', payload: id})
    } 

    render() {

        const { classes } = this.props;

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

        const addPhoto = this.state.addPhoto === false ? (
            <Fragment>
                    <Button
                    onClick={this.addPhoto}
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    >
                        Add Photo
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div style={{ marginBottom: 20}}>
                    <TextField
                    label="Description"
                    type="text"
                    variant="outlined"
                    value={this.state.description}
                    onChange={this.handleInputChangeFor('description')}
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
                onClick={this.cancelAddPhoto}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.saveAddPhoto}
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
                    <h1>Photos</h1>
                    <div className={classes.card}>
                        <Grid container spacing={3} justify='center'>
                        <div style={{ textAlign:'center', marginBottom:20}}>
                            {addPhoto}
                        </div>
                            <Grid container spacing={3} justify='center'>
                            {this.props.photosReducer.map( (item) => {
                            return(
                                <Grid item>
                                    <div key={item.id}>
                                    <img src={item.url} alt={item.description} width='220px' height='200px' style={{objectFit: 'cover'}} textAlign='center' />
                                    <br />
                                    <Button
                                    onClick={() => this.deletePhoto(item.id)}
                                    variant="contained"
                                    style={{backgroundColor: '#253155', color: '#ffffff', marginTop: '5px'}}
                                    >
                                        Delete
                                    </Button>
                                    </div>
                                </Grid>
                                )
                            })}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    photosReducer: reduxStore.photosReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminPhotosPage));
