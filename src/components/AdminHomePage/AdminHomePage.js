import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import AdminNav from '../AdminNav/AdminNav';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles =  {
    topMargin: {
        marginTop: '8%'
    },
    textField: {
        marginBottom: '1rem'
    },
    center: {
        textAlign: 'center'
    },
    container: {
        textAlign: 'center',
        width: '60%',
        margin: '0 auto'
    },
    primaryButton: {
        backgroundColor: '#b49759',
        color: '#ffffff',
        margin: '.5rem',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#b49759'
            }
    },
    secondaryButton: {
        backgroundColor: '#253155',
        color: '#ffffff',
        margin: '.5rem',
        hover: 'pointer',
            '&:hover': {
                backgroundColor: '#253155'
            }
    }
}

class AdminHomePage extends Component {

    state = {
        editLocation: false,
        editDate: false,
        editGoal: false,
        addVideo: false,
        location: '',
        date: '',
        videoUrl: '',
        videoTitle: '',
        goalAmount: '',
        goalYear: ''
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_EVENT_INFO' })
        this.props.dispatch({ type: 'GET_VIDEOS_ADMIN' })
        this.props.dispatch({ type: 'GET_ENTIRE_GOAL_INFO' })
    }

    editLocation = () => {
        if(this.state.editLocation === false){
            this.setState({
                editLocation: true,
                location: this.props.eventInfoReducer.location
            })
        } else {
            this.props.dispatch({type: 'EDIT_LOCATION', payload: {location: this.state.location, id: this.props.eventInfoReducer.id}})
            this.setState({
                editLocation: false
            })
        }
    }

    editDate = () => {
        if(this.state.editDate === false){
            this.setState({
                editDate: true
            })
        } else {
            this.props.dispatch({type: 'EDIT_DATE', payload: {date: this.state.date, id: this.props.eventInfoReducer.id}})
            this.setState({
                editDate: false
            })
        }
    }

    editGoal = () => {
        if(this.state.editGoal === false){
            this.setState({
                editGoal: true,
                goalAmount: this.props.entireGoal.goal,
                goalYear: this.props.entireGoal.year
            })
        } else {
            this.props.dispatch({ type: 'EDIT_GOAL_INFO', 
                payload: {goalYear: this.state.goalYear, goalAmount: this.state.goalAmount, id: this.props.entireGoal.id } 
            })
            this.setState({
                editGoal: false
            })
        }
    }

    addVideo = () => {
        if(this.state.addVideo === false){
            this.setState({
                addVideo: true
            })
        } else {
            this.props.dispatch({type: 'ADD_VIDEO', payload: {url: this.state.videoUrl, title: this.state.videoTitle}})
            this.setState({
                addVideo: false
            })
        }
    }

    deleteVideo = (id) => {
        this.props.dispatch({type: 'DELETE_VIDEO', payload: id})
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    cancelLocationSave = () => {
        this.setState({
            editLocation: false
        })
    }

    cancelDateSave = () => {
        this.setState({
            editDate: false
        })
    }

    cancelGoalSave = () => {
        this.setState({
            editGoal: false
        })
    }

    cancelVideoAdd = () => {
        this.setState({
            addVideo: false
        })
    }
    
    render(props) {

        const { classes } = this.props;

        const editLocation = this.state.editLocation === false ? (
            <Fragment>
                <h4>Event location: {this.props.eventInfoReducer.location}</h4>
                    <Button
                        onClick={this.editLocation}
                        variant="contained"
                        className={classes.primaryButton}
                    >
                        Edit
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                    <TextField
                        label="Location"
                        variant="outlined"
                        type="text" 
                        value={this.state.location}
                        onChange={this.handleInputChangeFor('location')}
                        style={{width: '30%'}}
                    />
                    <div>
                        <Button
                            onClick={this.cancelLocationSave}
                            variant="contained"
                            className={classes.secondaryButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.editLocation}
                            variant="contained"
                            className={classes.primaryButton}
                        >
                            Save
                        </Button>
                    </div>
            </Fragment>
        )

        const editGoal = this.state.editGoal === false ? (
            <Fragment>
                <h4>Goal Year: {this.props.entireGoal.year} | Goal Amount: ${parseInt(this.props.entireGoal.goal).toLocaleString()}</h4>
                    <Button
                        onClick={this.editGoal}
                        variant="contained"
                        className={classes.primaryButton}
                    >
                        Edit
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <TextField
                    label="Year of event"
                    variant="outlined"
                    type="text" 
                    value={this.state.goalYear}
                    onChange={this.handleInputChangeFor('goalYear')}
                    className={classes.textField}
                />
                <br/>
                <TextField
                    label="Goal amount"
                    variant="outlined"
                    type="text"
                    value={this.state.goalAmount}
                    onChange={this.handleInputChangeFor('goalAmount')}
                    className={classes.textField}
                />
                <div>
                    <Button
                        onClick={this.cancelGoalSave}
                        variant="contained"
                        className={classes.secondaryButton}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.editGoal}
                        variant="contained"
                        className={classes.primaryButton}
                    >
                        Save
                    </Button>
                </div>
            </Fragment>
        )

        const editDate = this.state.editDate === false ? (
            <Fragment>
                <h4>Date of event: {dayjs(this.props.eventInfoReducer.date).format('MMMM DD YYYY')}</h4>
                    <Button
                        onClick={this.editDate}
                        variant="contained"
                        className={classes.primaryButton}
                    >
                        Edit
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                    <TextField 
                        label="Event Date"
                        variant="outlined"
                        type="date"
                        value={this.state.date}
                        onChange={this.handleInputChangeFor('date')}
                        InputLabelProps={{
                            shrink: true,
                            }}
                    />
                    <div>
                        <Button
                            onClick={this.cancelDateSave}
                            variant="contained"
                            className={classes.secondaryButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.editDate}
                            variant="contained"
                            className={classes.primaryButton}
                        >
                            Save
                        </Button>
                    </div>
            </Fragment>
        )

        const addVideo = this.state.addVideo === false ? (
            <Fragment>
                    <Button
                    onClick={this.addVideo}
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginTop: 30}}
                    >
                        Add Video
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <TextField
                    label="Video Title"
                    variant="outlined"
                    type="text" 
                    value={this.state.videoTitle}
                    onChange={this.handleInputChangeFor('videoTitle')}
                    className={classes.textField}
                />
                <br/>
                <TextField
                    label="Video URL"
                    variant="outlined"
                    type="text" 
                    value={this.state.videoUrl}
                    onChange={this.handleInputChangeFor('videoUrl')}
                    className={classes.textField}
                />
                <div>
                    <Button
                        onClick={this.cancelVideoAdd}
                        variant="contained"
                        className={classes.secondaryButton}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.addVideo}
                        variant="contained"
                        className={classes.primaryButton}
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
                    <h1>HOME</h1>
                    <div className={classes.container}>
                        <div>
                            {editLocation}
                        </div>
                        <div>
                            {editDate}
                        </div>
                        <div>
                            {editGoal}
                        </div>
                    </div>
                    <div style={{textAlign:'center'}}>
                        {addVideo}
                    </div>
                    {this.props.videoReducer.map( (item) => {
                    return(
                        <div className={classes.center}key={item.id} sm={6}>
                            <h2>{item.title}</h2>
                            <iframe src={item.url} width='450px' height='250px'  />
                            <br />
                            <div style={{textAlign:'center'}}>
                                <Button
                                    onClick={() => this.deleteVideo(item.id)}
                                    variant="contained"
                                    className={classes.secondaryButton}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )
                    })}
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    eventInfoReducer: reduxStore.eventInfoReducer,
    videoReducer: reduxStore.videoReducer,
    entireGoal: reduxStore.goalReducer.entireGoalInfo
});

export default connect(putReduxStateOnProps)(withStyles(styles)(AdminHomePage));
