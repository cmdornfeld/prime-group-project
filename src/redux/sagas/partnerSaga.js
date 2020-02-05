import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPartnerInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/partners`);
        console.log(getResponse.data)
        yield put({type: 'SET_PARTNERS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPartnerLevels() {
    try{
        const getResponse = yield axios.get(`/api/admin/partner-levels`);
        console.log(getResponse.data)
        yield put({type: 'SET_PARTNER_LEVELS', payload: getResponse.data})
    }
    catch (error){
        console.log('failed GETTING partner levels', error); 
    }
}

function* addNewPartner(action) {
    try{
        yield axios.post(`/api/admin/partners`, action.payload);
        yield put({type: 'GET_PARTNERS'});
    }
    catch (error){
        console.log('failed adding new partner', error); 
    }
}

function* partnerSaga() {
    yield takeLatest('GET_PARTNERS', getPartnerInfo)
    yield takeLatest('GET_PARTNER_LEVELS', getPartnerLevels)
    yield takeLatest('ADD_PARTNER', addNewPartner)
}

export default partnerSaga;