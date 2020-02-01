import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postVideo(action){
    try{
        let data = {
            videoUrl: action.payload
        }
        console.log(action.payload)
        yield axios.post(`/api/admin/videos`, data);
        yield put({type: 'GET_VIDEOS_ADMIN'})
    } catch (error){
        console.log(error)
    }
}

function* postVideoSaga() {
    yield takeLatest('ADD_VIDEO', postVideo);
}

export default postVideoSaga;