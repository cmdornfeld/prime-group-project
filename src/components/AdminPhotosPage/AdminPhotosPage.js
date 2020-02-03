import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


class AdminPhotosPage extends Component {

    state = {
        description: '',
        url: '',
        addPhoto: false,
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_ADMIN_PHOTOS'})
    }

    addPhoto = () => {
        this.setState({
            addPhoto: true
        })
    }

    cancelAddPhoto = () => {
        this.setState({
            addPhoto: false,
            description: ''
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
        console.log(event.target.value)
    };

    saveAddPhoto = () => {
        this.props.dispatch({ type: 'ADMIN_ADD_PHOTO', payload: {
            description: this.state.description,
            url: this.state.url
        }})
        this.setState({
            description: '',
            url: '',
            addPhoto: false
        })
    }

    deletePhoto = (id) =>{
        this.props.dispatch({ type: 'ADMIN_DELETE_PHOTO', payload: id})
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

        const addPhoto = this.state.addPhoto === false ? (
            <Fragment>
                    <button
                    onClick={this.addPhoto}
                    >
                        Add Photo
                    </button>
            </Fragment>
        ) : (
            <Fragment>
                <div>
                    <input
                    type="text"
                    value={this.state.description}
                    onChange={this.handleInputChangeFor('description')}
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
                onClick={this.cancelAddPhoto}
                >
                    Cancel
                </button>
                <button
                onClick={this.saveAddPhoto}
                >
                    Save
                </button>
            </Fragment>
        )

        return (
            <div>
                <AdminNav />
                <p>Admin Photos</p>
                <div>
                    {addPhoto}
                </div>
                <div>
                {this.props.photosReducer.map( (item) => {
                return(
                    <div key={item.id}>
                        <img src={item.url} alt={item.description} width='220px' height='200px' />
                        <br />
                        <button
                        onClick={() => this.deletePhoto(item.id)}
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
    photosReducer: reduxStore.photosReducer
});

export default connect(putReduxStateOnProps)(AdminPhotosPage);
