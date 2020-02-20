import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//getting videos for the public
function* getPublicVideos() {
    try{
        const getResponse = yield axios.get(`/api/public/videos`);
        yield put({type: 'SET_VIDEOS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

//getting events for the public
function* getPublicEvents() {
    try{
        const getResponse = yield axios.get(`/api/public/event-info`);
        yield put({type: 'SET_EVENT', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPublicVideoSaga() {
    yield takeLatest('GET_VIDEOS', getPublicVideos);
    yield takeLatest('GET_EVENTS', getPublicEvents);
}

export default getPublicVideoSaga;