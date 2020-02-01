import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getContactInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/contact-info`);
        console.log(getResponse.data)
        yield put({type: 'SET_CONTACT_INFO', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getContactInfoSaga() {
    yield takeLatest('GET_CONTACT_INFO', getContactInfo)
}

export default getContactInfoSaga;