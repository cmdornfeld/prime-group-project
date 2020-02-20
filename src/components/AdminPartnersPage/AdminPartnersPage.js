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

//style for the admin partners page
const styles =  {
    header: {
        textAlign: 'center',
        fontSize: '6rem',
        padding: '1rem',
        margin: '2rem',
        color: '#253155'
    },
    topMargin: {
        marginTop: '8%'
    },
    center: {
        textAlign: 'center',
        margin: '0 auto'
    },
    card: {
        width: '30%',
        height: 'auto',
        textAlign: 'center',
        margin: ' 0 auto',
        padding: '1.5rem',
    },
    partnerCard: {
        width: '60%',
        height: 'auto',
        textAlign: 'center',
        margin: '0 auto',
        padding: '1.5rem',
        marginTop: '1rem',
        color: '#253155'
    },
    primaryButton: {
        backgroundColor: '#b49759',
        margin: '.25rem',
        color: '#ffffff',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#b49759'
            }
    },
    secondaryButton: {
        backgroundColor: '#253155',
        margin: '.25rem',
        color: '#ffffff',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#253155'
            }
    }
}

const dropStyles ={
    width: "40%",
    height: "3.5rem",
    border: "1px solid black",
    backgroundColor: "#dddddd",
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

    //display partner and there level for the admin
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

    // this remove sponsors from the admin partner
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
                    onClick={this.addPartnerLevel}
                    className={classes.primaryButton}
                >
                    +
                </Button>
            </Fragment>
        ) : (
            <Fragment>
                <TextField type="text" placeholder="New Level Name" variant="outlined" onChange={this.handleLevelNameChange}/>
                <TextField type="number" placeholder="New Level Amount" variant="outlined" onChange={this.handleLevelChange} />
                <div>
                    <Button
                        variant="contained"
                        onClick={this.cancelAddLevel}
                        className={classes.secondaryButton}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={this.saveLevel}
                        className={classes.primaryButton}
                    >
                        Save
                    </Button>
                </div>
            </Fragment>
        )

        const addPartnerButton = this.state.addPartner === false ? (
            <Fragment>
                <Button onClick={this.addNewPartner} className={classes.primaryButton}>Add Partner</Button>
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
                        onClick={this.cancelAddNewPartner}
                        className={classes.secondaryButton}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={this.addPartner}
                        className={classes.primaryButton}
                    >
                        Save
                    </Button>
                </div>
                </Card>
            </Fragment>
        )

        return (
            <Fragment>
                <AdminNav />
                <div className={classes.topMargin}>
                    <h1>MANAGE PARTNERS</h1>
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
                                                    onClick={()=> this.removePartner(partner.id)}
                                                    className={classes.secondaryButton}
                                                >
                                                    Remove
                                                </Button>
                                                <Button 
                                                    variant="contained"
                                                    onClick={() => this.viewPartner(partner.id)}
                                                    className={classes.primaryButton}
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
                                            <h3>{partner.title} - ${parseInt(partner.amount).toLocaleString()}</h3>
                                        </div>
                                        <img src={partner.img_url} alt={partner.name} style={{display: 'inline-block'}}/>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={()=> this.removePartner(partner.id)}
                                                className={classes.secondaryButton}
                                            >
                                                Remove
                                            </Button>
                                            <Button 
                                                variant="contained"
                                                onClick={() => this.viewPartner(partner.id)}
                                                className={classes.primaryButton}
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