import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getContactInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/contact-info`);
        yield put({type: 'SET_CONTACT_INFO', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* editContactInfo(action) {
    try{
        yield axios.put(`/api/admin/contact-info/${action.payload.id}`, action.payload);
        yield put({type: 'GET_CONTACT_INFO'});
    }
    catch (error){
        console.log('failed editing contact info', error);
    }
}

function* contactInfoSaga() {
    yield takeLatest('GET_CONTACT_INFO', getContactInfo)
    yield takeLatest('EDIT_CONTACT', editContactInfo)
}

export default contactInfoSaga;