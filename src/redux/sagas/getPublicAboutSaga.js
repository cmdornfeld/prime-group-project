import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getMission() {
    try{
        const getResponse = yield axios.get(`/api/public/mission`);
        console.log(getResponse.data)
        yield put({type: 'SET_MISSION', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getMissionSaga() {
    yield takeLatest('GET_MISSION', getMission)
}

export default getMissionSaga;