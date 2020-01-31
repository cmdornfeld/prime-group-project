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

function* getAddressInfoSaga() {
    yield takeLatest('GET_ADDRESS_INFO', getAddressInfo)
}

export default getAddressInfoSaga;