import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAddressInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/address-info`);
        console.log(getResponse.data)
        yield put({type: 'SET_ADDRESS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* editAddressInfo(action) {
    try{
        yield axios.put(`/api/admin/address-info/${action.payload.id}`, action.payload);
        yield put({type: 'GET_ADDRESS_INFO'});
    }
    catch (error){
        console.log('failed editing address info', error); 
    }
}

function* addressSaga() {
    yield takeLatest('GET_ADDRESS_INFO', getAddressInfo)
    yield takeLatest('EDIT_ADDRESS', editAddressInfo)
}

export default addressSaga;