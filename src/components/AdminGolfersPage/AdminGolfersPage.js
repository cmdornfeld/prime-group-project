import React, { Component, Fragment } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//Material UI Stuff
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '70%',
        margin: '0 auto'
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        width: '40%',
        color: '#253055',
        margin: '0 auto',
    },
    topMargin: {
        marginTop: '8%'
    },
    addGolfer: {
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#b49759',
        margin: '.5rem',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#b49759'
        }
    },
    textField: {
        margin: '1rem'
    },
    cancelButton: {
        backgroundColor: '#253155',
        margin: '.5rem',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#253155'
        }
    },
    saveButton: {
        backgroundColor: '#b49759',
        margin: '.5rem',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#b49759'
        }
    },
    golfer: {
        textAlign: 'center'
    }
})

const dropStyles = {
    width: "29%",
    border: "1px solid black",
    backgroundColor: "#dddddd",
    cursor: "pointer",
    margin: '0 auto',
    marginTop: '1rem',
    marginBottom: '1rem'
}

export class AdminGolfersPage extends Component {

    state = {
        first: '',
        last: '',
        bio: '',
        purpose: '',
        goal: '',
        url: '',
        addGolfer: false
    }

    addGolfer = () => {
        this.setState({
            addGolfer: true
        })
    }

    cancelAddGolfer = () => {
        this.setState({
            addGolfer: false,
            first: '',
            last: '',
            bio: '',
            purpose: '',
            goal: '',
            url: ''
        })
    }

    saveAddGolfer = () => {
        this.props.dispatch({ type: 'ADMIN_ADD_GOLFER', payload: {
            first: this.state.first,
            last: this.state.last,
            bio: this.state.bio,
            purpose: this.state.purpose,
            goal: this.state.goal,
            url: this.state.url
        }})
        this.setState({
            first: '',
            last: '',
            bio: '',
            purpose: '',
            goal: '',
            url: '',
            addGolfer: false
        })
    }

    removeGolfer = (id) =>{
        this.props.dispatch({ type: 'ADMIN_DELETE_GOLFER', payload: id})
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

    componentDidMount(){
        this.props.dispatch({type: 'GET_ADMIN_GOLFERS'})
    }

    viewGolfer = (id) => {
        this.props.history.push(`/admin/golfers/${id}`);
    }

    render(props) {

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

        const addGolfer = this.state.addGolfer === false ? (
            <div className={classes.addGolfer}>
                    <Button
                        className={classes.addButton}
                        onClick={this.addGolfer}
                        variant="contained"
                    >
                        Add Golfer
                    </Button>
            </div>
        ) : (
            <div className={classes.addGolfer}>
                <div className={classes.paper}>
                <div>
                    <TextField
                    type="text"
                    label="First name"
                    className={classes.textField}
                    variant="outlined"
                    value={this.state.first}
                    onChange={this.handleInputChangeFor('first')}
                    />
                </div>
                <div>
                    <TextField
                    type="text"
                    label="Last name"
                    className={classes.textField}
                    variant="outlined"
                    value={this.state.last}
                    onChange={this.handleInputChangeFor('last')}
                    />
                </div>
                <div>
                    <TextField
                    type="text"
                    multiline
                    rows="4"
                    label="Bio"
                    className={classes.textField}
                    style={{width: '60%'}}
                    variant="outlined"
                    value={this.state.bio}
                    onChange={this.handleInputChangeFor('bio')}
                    />
                </div>
                <div>
                    <TextField
                    type="text"
                    multiline
                    rows="4"
                    label="Purpose"
                    className={classes.textField}
                    style={{width: '60%'}}
                    variant="outlined"
                    value={this.state.purpose}
                    onChange={this.handleInputChangeFor('purpose')}
                    />
                </div>
                <div>
                    <TextField
                    type="number"
                    label="Goal"
                    className={classes.textField}
                    variant="outlined"
                    value={this.state.goal}
                    onChange={this.handleInputChangeFor('goal')}
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
                    className={classes.cancelButton}
                    onClick={this.cancelAddGolfer}
                    variant="contained"
                >
                    Cancel
                </Button>
                <Button
                    className={classes.saveButton}
                    onClick={this.saveAddGolfer}
                    variant="contained"
                >
                    Save
                </Button>
                </div>
            </div>
        )

        return (
            <div>
                <AdminNav />
                <div className={classes.topMargin}>
                    <h1>Golfers</h1>
                    {addGolfer}
                    <div className={classes.root}>
                        <Grid container spacing={2}>
                            {this.props.golferReducer.map( (item) => {
                            if(item.first_name === 'General'){
                                return null;
                            } else {
                            return(
                                <Grid item xs key={item.id} className={classes.golfer}>
                                    <h4 >{item.first_name} {item.last_name}</h4>
                                    <img src={item.img_url} alt={item.id} style={{objectFit: 'cover'}} onClick={() => this.viewGolfer(item.id)} width='240px' height="200px"/>
                                    <div>
                                        <Button
                                            className={classes.cancelButton}
                                            onClick={() => this.removeGolfer(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </Grid>
                                )
                                }
                            })}
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
});

AdminGolfersPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminGolfersPage));
