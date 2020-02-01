import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteVideo(action){
    try{
        yield axios.delete(`api/admin/videos/${action.payload}`);
        yield put({type: 'GET_VIDEOS_ADMIN'})
    } catch (error){
        console.log(error)
    }
}

function* deleteVideoSaga() {
    yield takeLatest('DELETE_VIDEO', deleteVideo);
  }

export default deleteVideoSaga;