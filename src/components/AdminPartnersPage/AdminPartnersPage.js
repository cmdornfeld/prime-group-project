import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const styles =  {
    topMargin: {
        marginTop: '100px'
    },
    center: {
        textAlign: 'center',
        margin: '0 auto'
    },
    buttonStyle: {
        backgroundColor: 'rgb(180,151,89)',
        color: '#ffffff',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: 'rgb(180,151,40)'
            }
        
    },
    card: {
        width: 400,
        height: 'auto',
        textAlign: 'center',
        margin: ' 0 auto',
        padding: 30,
  
    },
    partnerCard: {
        width: 900,
        height: 'auto',
        textAlign: 'center',
        margin: '0 auto',
        padding: 30,
        marginTop: 20
  
    },
    
}

const dropStyles ={
    width: "200px",
    height: "50px",
    border: "1px solid black",
    "background-color": "#dddddd",
    cursor: "pointer",
    margin: '0 auto'
}

export class AdminPartnersPage extends Component {

    state = {
        companyName: '',
        url: '',
        partnerLevel: '1',
        level: '',
        levelName: '',
        addLevel: false,
        addPartner: false
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

    handleLevelChange = (event) => {
        this.setState({
            level: event.target.value
        })
    }

    handleLevelNameChange = (event) => {
        this.setState({
            levelName: event.target.value
        })
    }

    handleFinishedUpload = info => {
        this.setState({
            url: info.fileUrl
        })
    }

    addNewPartner = () => {
        this.setState({
            addPartner: true
        })
    }

    cancelAddNewPartner = () => {
        this.setState({
            addPartner: false
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
            partnerLevel: '',
            addPartner: false
        })
    }

    addPartnerLevel = () => {
        this.setState({
            addLevel: true
        })
        
    }

    cancelAddLevel = () => {
        this.setState({
            addLevel: false,
            level: '',
            levelName: ''
        })
    }

    saveLevel = () => {
        this.props.dispatch({ type: 'ADD_LEVEL', payload: {
            name: this.state.levelName,
            number: this.state.level
        }})
        this.setState({
            levelName: '',
            level: '',
            addLevel: false
        })
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

        const addLevel = this.state.addLevel === false ? (
            <Fragment>
                <Select variant="outlined" style={{marginTop: "5px"}} onChange={(event) => {this.assignPartnerLevel(event)}}>
                            {this.props.level.map(level => (
                                <MenuItem key={level.id} value={level.id}>
                                    {level.title} ({level.amount})
                                </MenuItem>
                            )
                            )}
                </Select>
                <Button
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    onClick={this.addPartnerLevel}
                >
                    +
                </Button>
            </Fragment>
        ) : (
            <Fragment>
                <input type="text" placeholder="Level Name" onChange={this.handleLevelNameChange}/>
                <input type="number" placeholder="Level Number" onChange={this.handleLevelChange} />
                <Button onClick={this.cancelAddLevel}>Cancel</Button>
                <Button onClick={this.saveLevel}>Save</Button>
            </Fragment>
        )

        const addPartnerButton = this.state.addPartner === false ? (
            <Fragment>
                <Button onClick={this.addNewPartner} className={classes.buttonStyle}>Add Partner</Button>
            </Fragment>
        ) : (
            <Fragment>
                <Card className={classes.card}>
                <TextField
                    label="Company Name"
                    style={{marginBottom: '5px'}}
                    variant="outlined"
                    type="text"
                    onChange={this.handleCompanyNameChange} 
                />
                <DropzoneS3Uploader
                    children={innderDropElement}
                    onFinish={this.handleFinishedUpload}
                    s3Url={s3Url}
                    style={dropStyles}
                    maxSize={1024 * 1024 * 5}
                    upload={uploadOptions}
                />
                {addLevel}
                <div>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                        onClick={this.cancelAddNewPartner}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                        onClick={this.addPartner}
                    >
                        Save
                    </Button>
                </div>
                </Card>
            </Fragment>
        )

        return (
            <Fragment>
            <div>
                <AdminNav />
            </div>
            <div className={classes.topMargin}>
                <Typography style={{textAlign: 'center', fontSize: '6rem', padding: 0, margin: '2rem', color: '#253155'}}>Manage Parnters</Typography>
                <div className={classes.center}>
                    {addPartnerButton}
                </div>
                <Card className={classes.partnerCard}>
                    <div className="partner-box">
                        {this.props.companies.map(partner => {
                            if(partner.sponsor_level === currentLevel){
                                return (
                                    <span key={partner.id} style={{display: 'inline-block'}}>
                                        <img src={partner.img_url} alt={partner.name} />
                                        <div> 
                                            <Button 
                                                variant="contained"
                                                style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                                                onClick={()=> this.removePartner(partner.id)}
                                            >
                                                Remove
                                            </Button>
                                            <Button 
                                                variant="contained"
                                                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                                                onClick={() => this.viewPartner(partner.id)}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </span>
                                )
                            } 
                            else {
                                currentLevel = partner.sponsor_level;
                                return (
                                    <Fragment>
                                    <div key={partner.id} >
                                        <h3>{partner.title} - ${partner.amount}</h3>
                                    </div>
                                    <img src={partner.img_url} alt={partner.name} style={{display: 'inline-block'}}/>
                                    <div>
                                        <Button
                                            variant="contained"
                                            style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                                            onClick={()=> this.removePartner(partner.id)}
                                        >
                                            Remove
                                        </Button>
                                        <Button 
                                            variant="contained"
                                            style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                                            onClick={() => this.viewPartner(partner.id)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                    </Fragment>
                                )
                            }
                        })}
                    </div>
                </Card>
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
