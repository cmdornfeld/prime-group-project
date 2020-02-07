import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getGolfersGoalTotal() {
    try{
        const getResponse = yield axios.get(`/api/public/golfer-goal-total`);
        console.log(getResponse.data)
        yield put({type: 'SET_GOLFER_GOAL_TOTAL', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getGolfersDonationTotal() {
    try{
        const getResponse = yield axios.get(`/api/public/golfer-donation-total`);
        console.log(getResponse.data)
        yield put({type: 'SET_GOLFER_DONATION_TOTAL', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* goalSaga() {
    yield takeLatest('GET_GOLFERS_GOAL_TOTAL', getGolfersGoalTotal)
    yield takeLatest('GET_GOLFERS_DONATION_TOTAL', getGolfersDonationTotal)
}

export default goalSaga;