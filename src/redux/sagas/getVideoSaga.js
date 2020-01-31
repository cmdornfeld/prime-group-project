import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPublicVideos() {
    try{
        const getResponse = yield axios.get(`/api/public/videos`);
        console.log(getResponse.data)
        yield put({type: 'SET_VIDEOS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPublicEvents() {
    try{
        const getResponse = yield axios.get(`/api/public/event-info`);
        console.log(getResponse.data)
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