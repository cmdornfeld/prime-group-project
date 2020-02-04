import React, { Component, Fragment } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


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
    render() {

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

        const addGolfer = this.state.addGolfer === false ? (
            <Fragment>
                    <button
                    onClick={this.addGolfer}
                    >
                        Add Golfer
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
                    <textarea
                    type="text"
                    rows="6"
                    cols="100"
                    value={this.state.purpose}
                    onChange={this.handleInputChangeFor('purpose')}
                    >
                    </textarea>
                </div>
                <div>
                    <input
                    type="number"
                    value={this.state.goal}
                    onChange={this.handleInputChangeFor('goal')}
                    />
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
                onClick={this.cancelAddGolfer}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveAddGolfer}
                >
                    Save
                </button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <p>Admin Golfers</p>
                {addGolfer}
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    golferReducer: reduxStore.golferReducer
});

export default connect(putReduxStateOnProps)(AdminGolfersPage);
