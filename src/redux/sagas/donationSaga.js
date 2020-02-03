import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getDonationInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/donation-info`);
        console.log(getResponse.data)
        yield put({type: 'SET_DONATIONS', payload: getResponse.data });
    }
    catch (error){
        console.log(error); 
    }
}

function* markDonationAsPaid(action) {
    try{
        console.log('logging action.payload in saga', action.payload);
        
        yield axios.put(`/api/admin/donation-info/${action.payload.id}`, action.payload);
        yield put({type: 'GET_DONATION_INFO' });
    }
    catch (error){
        console.log(error); 
    }
}

function* exportDonations() {
    try{
        yield axios.get(`/api/admin/donation-export`);
    }
    catch (error){
        console.log(error); 
    }
}

function* donationSaga() {
    yield takeLatest('GET_DONATION_INFO', getDonationInfo)
    yield takeLatest('MARK_AS_PAID', markDonationAsPaid)
    yield takeLatest('EXPORT_DONATIONS', exportDonations)
}

export default donationSaga;