import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getDonationInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/donation-info`);
        yield put({type: 'SET_DONATIONS', payload: getResponse.data });
    }
    catch (error){
        console.log(error); 
    }
}

function* updateDonationPaymentStatus(action) {
    try{        
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

function* filterDates(action){
    try{
        console.log(action.payload)
        const getResponse = yield axios.get(`/api/admin/donation?startingDate=${action.payload.startingDate}&endingDate=${action.payload.endingDate}`);
        yield put({type: 'SET_DONATIONS', payload: getResponse.data})
    } catch (error){
        console.log(error)
    }
}

function* donationSaga() {
    yield takeLatest('GET_DONATION_INFO', getDonationInfo);
    yield takeLatest('UPDATE_PAYMENT_STATUS', updateDonationPaymentStatus);
    yield takeLatest('EXPORT_DONATIONS', exportDonations);
    yield takeLatest('SEND_FILTER_DATES', filterDates);
}

export default donationSaga;