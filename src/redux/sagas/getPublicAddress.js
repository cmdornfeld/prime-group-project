import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPublicAddress() {
    try{
        const getResponse = yield axios.get(`/api/public/address`);
        console.log(getResponse.data)
        yield put({type: 'SET_PUBLIC_ADDRESS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPublicContact() {
    try{
        const getResponse = yield axios.get(`/api/public/contact`);
        console.log(getResponse.data)
        yield put({type: 'SET_PUBLIC_CONTACT', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPublicAddressSaga() {
    yield takeLatest('GET_ADDRESS', getPublicAddress);
    yield takeLatest('GET_CONTACT', getPublicContact);
}

export default getPublicAddressSaga;