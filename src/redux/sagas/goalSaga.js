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

function* getPartnerPledgeTotal() {
    try{
        const getResponse = yield axios.get(`/api/public/partner-pledge-total`);
        console.log(getResponse.data)
        yield put({type: 'SET_PARTNER_PLEDGE_TOTAL', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getEntireGoalInfo() {
    try{
        const getResponse = yield axios.get(`/api/public/entire-goal-info`);
        console.log(getResponse.data)
        yield put({type: 'SET_ENTIRE_GOAL_INFO', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* goalSaga() {
    yield takeLatest('GET_GOLFERS_GOAL_TOTAL', getGolfersGoalTotal)
    yield takeLatest('GET_GOLFERS_DONATION_TOTAL', getGolfersDonationTotal)
    yield takeLatest('GET_PARTNER_PLEDGE_TOTAL', getPartnerPledgeTotal)
    yield takeLatest('GET_ENTIRE_GOAL_INFO', getEntireGoalInfo)
}

export default goalSaga;