import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getEventInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/event-info`);
        yield put({type: 'SET_EVENT', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getEventInfoSaga() {
    yield takeLatest('GET_EVENT_INFO', getEventInfo);
}

export default getEventInfoSaga;