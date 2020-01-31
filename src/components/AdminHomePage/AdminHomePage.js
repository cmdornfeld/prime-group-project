import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import AdminNav from '../AdminNav/AdminNav';

class AdminHomePage extends Component {

    state = {
        editLocation: false,
        editDate: false,
        location: '',
        date: ''
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_EVENT_INFO'})
    }

    editLocation = () => {
        if(this.state.editLocation === false){
            this.setState({
                editLocation: true
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
            // this.props.dispatch({type: 'EDIT_LOCATION', payload: this.state})
            this.setState({
                editDate: false
            })
        }
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };
    
    render() {

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
                value={this.state.location}
                onChange={this.handleInputChangeFor('location')}
                />
                <button
                onClick={this.editLocation}
                >
                    Save
                </button>
            </Fragment>
        )

        const editDate = this.state.editDate === false ? (
            <Fragment>
                {this.props.eventInfoReducer.date}
                    <button
                    onClick={this.editDate}
                    >
                        Edit
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <input 
                value={this.state.date}
                onChange={this.handleInputChangeFor('date')}
                />
                <button
                onClick={this.editDate}
                >
                    Save
                </button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <p>Admin Home</p>
                <div>
                    {editLocation}
                </div>
                <div>
                    {editDate}
                </div>
                
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    eventInfoReducer: reduxStore.eventInfoReducer
});

export default connect(putReduxStateOnProps)(AdminHomePage);
