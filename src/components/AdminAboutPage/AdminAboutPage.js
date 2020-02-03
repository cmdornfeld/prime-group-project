import React, { Component, Fragment } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

class AdminAboutPage extends Component {

    state ={ 
        mission: '',
        title: '',
        url: '',
        editMission: false,
        addFoundation: false,
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_ADMIN_MISSION'});
        this.props.dispatch({ type: 'GET_ADMIN_FOUNDATION'});
    }

    cancelMissionSave = () => {
        this.setState({
            editMission: false,
            mission: ''
        })
    }

    cancelAddFoundation = () => {
        this.setState({
            addFoundation: false,
            title: '',
            bio: ''
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

    addFoundation = () => {
        this.setState({
            addFoundation: true
        })
    }

    deleteFoundation = (id) => {
        this.props.dispatch({type: 'DELETE_FOUNDATION', payload: id})
    }

    saveAddFoundation = () => {
        this.props.dispatch({ type: 'ADD_FOUNDATION', payload: {
            title: this.state.title,
            bio: this.state.bio,
            image: this.state.url
        }})
        this.setState({
            addFoundation: false
        })
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

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = 'https://hundred-holes-bucket.s3.amazonaws.com'

        const innderDropElement = (
            <div class="inner-drop">
                <p>Click or Drop File Here!</p>
            </div>
        )

        const addFoundation = this.state.addFoundation === false ? (
            <Fragment>
                    <button
                    onClick={this.addFoundation}
                    >
                        Add Foundation
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <input
                    type="text"
                    value={this.state.title}
                    onChange={this.handleInputChangeFor('title')}
                    />
                </div>
                <div>
                    <textarea
                    type="text"
                    rows="6"
                    cols="100"
                    value={this.state.bio}
                    onChange={this.handleInputChangeFor('bio')}
                    >
                    </textarea>
                </div>
                <div>
                <DropzoneS3Uploader
                children={innderDropElement}
                onFinish={this.handleFinishedUpload}
                s3Url={s3Url}
                // style={dropStyles}
                maxSize={1024 * 1024 * 5}
                upload={uploadOptions}
            />
                </div>

                <button
                onClick={this.cancelAddFoundation}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveAddFoundation}
                >
                    Save
                </button>
            </Fragment>
        )


        return (
            <div>
                <AdminNav />
                <p>Admin About</p>
                <div>
                    {editMission}
                </div>
                <br />
                <div>
                    {addFoundation}
                </div>
                <div>
                {this.props.foundationReducer.map( (item) => {
                return(
                    <div key={item.id}>
                    <h3>{item.name}</h3>,
                    <img src={item.url} alt={item.name} width='220px' height='200px' />,
                    <p>{item.bio}</p>
                    <button>Edit</button>
                    <button
                    onClick={() => this.deleteFoundation(item.id)}
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
    missionReducer: reduxStore.missionReducer,
    foundationReducer: reduxStore.foundationReducer
  });

  export default connect(putReduxStateOnProps)(AdminAboutPage);
