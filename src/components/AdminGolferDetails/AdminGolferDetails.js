import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


class AdminGolferDetails extends Component {

    state = {
        first: '',
        last: '',
        goal: '',
        editName: false,
        editImage: false,
        editGoal: false,
        editBio: false,
        editPurpose: false,
    }

    editName = () => {
        this.setState({
            editName: true,
            first: this.props.golferIdReducer.first_name,
            last: this.props.golferIdReducer.last_name
        })
    }

    cancelEditName = () => {
        this.setState({
            editName: false,
            first: '',
            last: '',
        })
    }

    saveEditName = () => {
        this.props.dispatch({ type: 'EDIT_GOLFER_NAME', payload: {
            first: this.state.first,
            last: this.state.last,
            id: this.props.golferIdReducer.id
        }})
        this.setState({
            first: '',
            last: '',
            editName: false
        })
    }

    editGoal = () => {
        this.setState({
            editGoal: true,
            goal: this.props.golferIdReducer.goal
        })
    }

    cancelEditGoal = () => {
        this.setState({
            editGoal: false,
            goal: ''
        })
    }

    saveEditGoal = () => {
        this.props.dispatch({ type: 'EDIT_GOLFER_GOAL', payload: {
            goal: this.state.goal,
            id: this.props.golferIdReducer.id
        }})
        this.setState({
            goal: '',
            editGoal: false
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
        console.log(event.target.value)
    };

    render() {

        const editName = this.state.editName === false ? (
            <Fragment>
                <h3>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h3>
                <button
                onClick={this.editName}
                >
                    Edit Name
                </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <input
                    type="text"
                    value={this.state.first}
                    onChange={this.handleInputChangeFor('first')}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    value={this.state.last}
                    onChange={this.handleInputChangeFor('last')}
                    />
                </div>
                <button
                onClick={this.cancelEditName}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditName}
                >
                    Save
                </button>
            </Fragment>
        )

        const editGoal = this.state.editGoal === false ? (
            <Fragment>
                <h3>${this.props.golferIdReducer.goal}</h3>
                <button
                onClick={this.editGoal}
                >
                    Edit Goal
                </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <input
                    type="number"
                    value={this.state.goal}
                    onChange={this.handleInputChangeFor('goal')}
                    />
                </div>
                <button
                onClick={this.cancelEditGoal}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveEditGoal}
                >
                    Save
                </button>
            </Fragment>
        )

        return (
            <div>
                {/* <h3>{this.props.golferIdReducer.first_name} {this.props.golferIdReducer.last_name}</h3> */}
                <div>
                    {editName}
                </div>
                <img src={this.props.golferIdReducer.img_url} alt={this.props.golferIdReducer.id} width='220px' height='200px' />
                <h3>Goal: {editGoal}</h3>
                <h3>Bio</h3>
                <p>{this.props.golferIdReducer.bio}</p>
                <h3>Why am I doing this?</h3>
                <p>{this.props.golferIdReducer.purpose}</p>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    golferIdReducer: reduxStore.golferIdReducer
});

export default connect(putReduxStateOnProps)(AdminGolferDetails)
