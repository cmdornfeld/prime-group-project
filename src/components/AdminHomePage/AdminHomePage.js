import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AdminNav from '../AdminNav/AdminNav';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';

const styles =  {
    topMargin: {
        marginTop: '100px'
    },
    nameTextField: {
        width: 250
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
        this.props.dispatch({ type: 'GET_GOAL_INFO' })
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
                {this.props.eventInfoReducer.location}
                    <Button
                    onClick={this.editLocation}
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                    >
                        Edit
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div style={{marginBottom: 10}}>
                <TextField
                label="Location"
                variant="outlined"
                className={classes.nameTextField}
                type="text" 
                value={this.state.location}
                onChange={this.handleInputChangeFor('location')}
                />
                <div>
                <Button
                onClick={this.cancelLocationSave}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '10px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.editLocation}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Save
                </Button>
                </div>
                </div>
            </Fragment>
        )

        const editGoal = this.state.editGoal === false ? (
            <Fragment>
                Goal Year: {this.props.entireGoal.year} Goal Amount: {this.props.entireGoal.goal} 
                    <Button
                    onClick={this.editGoal}
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '35px', marginTop: '5px'}}
                    >
                        Edit
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div style={{marginBottom: 5}}>
                <TextField
                    label="Year"
                    variant="outlined"
                    type="text" 
                    value={this.state.goalYear}
                    onChange={this.handleInputChangeFor('goalYear')}
                />
                </div>
                <div style={{marginBottom: 8 }}>
                <TextField
                    label="Amount"
                    variant="outlined"
                    type="text" 
                    type="text" 
                    value={this.state.goalAmount}
                    onChange={this.handleInputChangeFor('goalAmount')}
                />
                </div>
                <Button
                onClick={this.cancelGoalSave}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.editGoal}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Save
                </Button>
            </Fragment>
        )

        const editDate = this.state.editDate === false ? (
            <Fragment>
                {dayjs(this.props.eventInfoReducer.date).format('MMMM DD YYYY')}
                    <Button
                    onClick={this.editDate}
                    variant="contained"
                    style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '115px', marginTop: '5px'}}
                    >
                        Edit
                    </Button>
            </Fragment>
        ) : (
            <Fragment>
                <div style={{marginBottom: 10, marginTop: 10}}>
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
                style={{backgroundColor: '#253155', color: '#ffffff', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.editDate}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                >
                    Save
                </Button>
                </div>
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
                <div style={{marginTop: 10}}>
                <div >
                <TextField
                label="Video Title"
                variant="outlined"
                type="text" 
                value={this.state.videoTitle}
                onChange={this.handleInputChangeFor('videoTitle')}
                />
                </div>
                <br />
                <div style={{marginBottom: 10}}>
                <TextField
                label="Video URL"
                variant="outlined"
                type="text" 
                value={this.state.videoUrl}
                onChange={this.handleInputChangeFor('videoUrl')}
                />
                </div>
                </div>
                <div>
                <Button
                onClick={this.cancelVideoAdd}
                variant="contained"
                style={{backgroundColor: '#253155', color: '#ffffff', marginRight: '5px', marginTop: '5px'}}
                >
                    Cancel
                </Button>
                <Button
                onClick={this.addVideo}
                variant="contained"
                style={{backgroundColor: '#b49759', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
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

                    <h1>Admin Home</h1>
                  
                    <div style={{textAlign:'center'}}> 

                        {editLocation}
                    </div>
                    <div style={{textAlign:'center'}}>
                        {editDate}
                    </div>
                    <div style={{textAlign:'center'}}>
                        {editGoal}
                    </div>
                    <div style={{textAlign:'center'}}>
                        {addVideo}
                    </div>
                    <Grid container spacing={4} justify='center'>
                    {this.props.videoReducer.map( (item) => {
                    return(
                        <Grid item key={item.id}>
                            <h2 style={{textAlign:'center'}}>{item.title}</h2>
                            <iframe src={item.url} width='450px' height='250px'  />
                            <br />
                            <div style={{textAlign:'center'}}>
                            <Button
                            onClick={() => this.deleteVideo(item.id)}
                            variant="contained"
                            style={{backgroundColor: '#253155', color: '#ffffff', marginLeft: '5px', marginTop: '5px'}}
                            >
                                Delete
                            </Button>
                            </div>
                        </Grid>
                    )
                    })}
                    </Grid>
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
