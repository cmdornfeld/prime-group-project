import React, { Component, Fragment } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { connect } from 'react-redux';

class AdminAboutPage extends Component {

    state ={ 
        mission: '',
        editMission: false,
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_ADMIN_MISSION'})
    }

    cancelMissionSave = () => {
        this.setState({
            editMission: false,
            mission: ''
        })
    }

    editMission = () => {
        if(this.state.editMission === false){
            this.setState({
                editMission: true,
                mission: this.props.missionReducer.about
            })
        } else {
            this.props.dispatch({type: 'EDIT_ADMIN_MISSION', payload: {mission: this.state.mission, id: this.props.missionReducer.id}})
            this.setState({
                editMission: false
            })
        }
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    render() {

        const editMission = this.state.editMission === false ? (
            <Fragment>
                {this.props.missionReducer.about}
                    <button
                    onClick={this.editMission}
                    >
                        Edit
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <textarea
                type="text"
                rows="6"
                cols="100"
                value={this.state.mission}
                onChange={this.handleInputChangeFor('mission')}
                >
                </textarea>
                <button
                onClick={this.cancelMissionSave}
                >
                    Cancel
                </button>
                <button
                onClick={this.editMission}
                >
                    Save
                </button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <p>Admin About</p>
                {editMission}
            </div>
        )
    }
}


const putReduxStateOnProps = (reduxStore) => ({
    missionReducer: reduxStore.missionReducer,
    foundationReducer: reduxStore.foundationReducer
  });

  export default connect(putReduxStateOnProps)(AdminAboutPage);
