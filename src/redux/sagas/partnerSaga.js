import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPartnerInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/partners`);
        yield put({type: 'SET_PARTNERS', payload: getResponse.data})
    }
    catch (error){
        console.log('failed GETTING partners', error); 
    }
}

function* getPartnerLevels() {
    try{
        const getResponse = yield axios.get(`/api/admin/partner-levels`);
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

function* removePartner(action) {
    try{
        yield axios.delete(`/api/admin/partners/delete/${action.payload}`);
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
    yield takeLatest('REMOVE_PARTNER', removePartner)
}

export default partnerSaga;