import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//getting holfers for the public
function* getPublicGolfer() {
    try{
        const getResponse = yield axios.get(`/api/public/golfers`);
        yield put({type: 'SET_ALL_GOLFERS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

//getting golfer details for the public
function* getPublicGolferId(action) {
    try{
        const getResponse = yield axios.get(`/api/public/golfers/${action.payload}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPublicGolferSaga() {
    yield takeLatest('GET_ALL_GOLFERS', getPublicGolfer);
    yield takeLatest('GET_GOLFER_DETAILS', getPublicGolferId);
}

export default getPublicGolferSaga;