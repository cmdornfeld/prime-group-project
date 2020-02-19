import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get mission for the public
function* getMission() {
    try{
        const getResponse = yield axios.get(`/api/public/mission`);
        yield put({type: 'SET_MISSION', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

//get foundation for the public
function* getFoundation() {
    try{
        const getResponse = yield axios.get(`/api/public/foundation`);
        yield put({type: 'SET_FOUNDATION', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getMissionSaga() {
    yield takeLatest('GET_MISSION', getMission)
    yield takeLatest('GET_FOUNDATION', getFoundation)
}

export default getMissionSaga;