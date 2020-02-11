import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import AdminNav from '../AdminNav/AdminNav';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';

const styles =  {
    topMargin: {
        marginTop: '100px'
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
                    <button
                    onClick={this.editLocation}
                    >
                        Edit
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <input
                type="text" 
                value={this.state.location}
                onChange={this.handleInputChangeFor('location')}
                />
                <button
                onClick={this.cancelLocationSave}
                >
                    Cancel
                </button>
                <button
                onClick={this.editLocation}
                >
                    Save
                </button>
            </Fragment>
        )

        const editGoal = this.state.editGoal === false ? (
            <Fragment>
                Goal Year: {this.props.entireGoal.year} Goal Amount: {this.props.entireGoal.goal} 
                    <button
                    onClick={this.editGoal}
                    >
                        Edit
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <h5>Year</h5>
                <input
                type="text" 
                value={this.state.goalYear}
                onChange={this.handleInputChangeFor('goalYear')}
                />
                <h5>Amount</h5>
                <input
                type="text" 
                value={this.state.goalAmount}
                onChange={this.handleInputChangeFor('goalAmount')}
                />
                <button
                onClick={this.cancelGoalSave}
                >
                    Cancel
                </button>
                <button
                onClick={this.editGoal}
                >
                    Save
                </button>
            </Fragment>
        )

        const editDate = this.state.editDate === false ? (
            <Fragment>
                {dayjs(this.props.eventInfoReducer.date).format('MMMM DD YYYY')}
                    <button
                    onClick={this.editDate}
                    >
                        Edit
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <input 
                type="date"
                value={this.state.date}
                onChange={this.handleInputChangeFor('date')}
                />
                <button
                onClick={this.cancelDateSave}
                >
                    Cancel
                </button>
                <button
                onClick={this.editDate}
                >
                    Save
                </button>
            </Fragment>
        )

        const addVideo = this.state.addVideo === false ? (
            <Fragment>
                    <button
                    onClick={this.addVideo}
                    >
                        Add Video
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <label>Video Title:</label>
                <input
                type="text" 
                value={this.state.videoTitle}
                onChange={this.handleInputChangeFor('videoTitle')}
                />
                <br />
                <label>Video URL:</label>
                <input
                type="text" 
                value={this.state.videoUrl}
                onChange={this.handleInputChangeFor('videoUrl')}
                />
                <button
                onClick={this.cancelVideoAdd}
                >
                    Cancel
                </button>
                <button
                onClick={this.addVideo}
                >
                    Save
                </button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <div className={classes.topMargin}>
                    <h1 style={{textAlign:'center', fontSize:'6rem'}}>Home</h1>
                    {JSON.stringify(this.state)}
                    <div>
                        {editLocation}
                    </div>
                    <div>
                        {editDate}
                    </div>
                    <div>
                        {editGoal}
                    </div>
                    <div>
                        {addVideo}
                    </div>
                    {this.props.videoReducer.map( (item) => {
                    return(
                        <div key={item.id}>
                            <h2>{item.title}</h2>
                            <iframe src={item.url} width='auto' height='auto' />
                            <br />
                            <button
                            onClick={() => this.deleteVideo(item.id)}
                            >
                                Delete
                            </button>
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
