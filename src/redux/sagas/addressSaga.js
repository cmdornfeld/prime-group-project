import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
//getting all address
function* getAddressInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/address-info`);
        yield put({type: 'SET_ADDRESS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}
//sagas for getting all the address
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