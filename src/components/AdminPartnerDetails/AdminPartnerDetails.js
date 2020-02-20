import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//style for the partner details 
const styles =  {
    topMargin: {
        marginTop: '120px',
        textAlign: 'center'
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

    //edit the name on the partner details 
    editName = () => {
        this.setState({
            editName: true,
            name: this.props.partner.company,
        })
    }

    //cancle name on the partner details 
    cancelEditName = () => {
        this.setState({
            editName: false,
            name: '',
        })
    }

    //save edit name on the partner detail
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

    //edit level on the partner details 
    editLevel = () => {
        this.setState({
            editLevel: true,
        })
    }

    //assign partner level on the parter details
    assignPartnerLevel = (event) => {
        this.setState({
            level: event.target.value
        })
    }

    //delete edit level on the partner details 
    cancelEditLevel = () => {
        this.setState({
            editLevel: false,
            level: ''
        })
    }

    ////save level on the partner details 
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


    //edit image on the partner details 
    editImage = () => {
        this.setState({
            editImage: true
        })
    }

    //cancle image on the partner details 
    cancelEditImage = () => {
        this.setState({
            editImage: false
        })
    }

    //upload image on the partner details
    handleFinishedUpload = info => {
        this.setState({
            url: info.fileUrl
        })
    }

    //save image on the partner details 
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

    goBack = () => {
        this.props.history.push('/admin/partners')
    }

    render() {

        const { classes } = this.props;

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        //this will upload images
        const s3Url = 'https://hundred-holes-bucket.s3.amazonaws.com'

        const innderDropElement = (
            <div className="inner-drop">
                <p>Click or Drop File Here!</p>
            </div>
        )


        const editName = this.state.editName === false ? (
            <Fragment>
                <h2>{this.props.partner.company}</h2>
                <Button
                style={{backgroundColor: '#b49759', color: '#ffffff', marginBottom: '10px'}}
                onClick={this.editName}
                >
                    Edit Name
                </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <TextField
                    label="Organization Name"
                    variant="outlined"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInputChangeFor('name')}
                    />
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                        onClick={this.cancelEditName}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                        onClick={this.saveEditName}
                    >
                        Save
                    </Button>
                </div>
            </Fragment>
        )

        const editLevel = this.state.editLevel === false ? (
            <Fragment>
                <h2>{this.props.partner.title}</h2>
                <Button
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    onClick={this.editLevel}
                >
                    Edit Level
                </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div style={{marginTop: '10px'}}>
                <Select variant="outlined" onChange={(event) => {this.assignPartnerLevel(event)}}>
                    {this.props.level.map(level => (
                        <MenuItem key={level.id} value={level.id}>
                            {level.title} ({level.amount})
                        </MenuItem>
                    )
                    )}
                </Select>
                </div>
                <Button
                    variant="contained"
                    style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                    onClick={this.cancelEditLevel}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    onClick={this.saveEditLevel}
                >
                    Save
                </Button>
            </Fragment>
        )

        const editImage = this.state.editImage === false ? (
            <Fragment>
                <img src={this.props.partner.img_url} alt={this.props.partner.company} width='220px' height='200px' />
                <div>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                        onClick={this.editImage}
                    >
                        Edit Image
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
                    variant="contained"
                    style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                    onClick={this.cancelEditImage}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    onClick={this.saveEditImage}
                >
                    Save
                </Button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <div className={classes.topMargin}>
                    <div>
                        {editName}
                    </div>
                    <div>
                        {editImage}
                    </div>
                    <div>
                        {editLevel}
                    </div>
                    <div>
                        <Button
                        variant="contained"
                        style={{backgroundColor: '#253155', color: '#ffffff', marginTop: '10px'}}
                        onClick={this.goBack}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    partner: reduxStore.partnerReducer.partner,
    level: reduxStore.partnerReducer.level
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminPartnerDetails));
