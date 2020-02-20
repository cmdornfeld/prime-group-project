import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//getting parter info for public
function* getPartnerInfo() {
    try{
        const getResponse = yield axios.get(`/api/admin/partners`);
        yield put({type: 'SET_PARTNERS', payload: getResponse.data})
    }
    catch (error){
        console.log('failed GETTING partners', error); 
    }
}

//getting partner level for the admin
function* getPartnerLevels() {
    try{
        const getResponse = yield axios.get(`/api/admin/partner-levels`);
        yield put({type: 'SET_PARTNER_LEVELS', payload: getResponse.data})
    }
    catch (error){
        console.log('failed GETTING partner levels', error); 
    }
}

//posting new partners for the admin
function* addNewPartner(action) {
    try{
        yield axios.post(`/api/admin/partners`, action.payload);
        yield put({type: 'GET_PARTNERS'});
    }
    catch (error){
        console.log('failed adding new partner', error); 
    }
}

//deleting partners for the admin 
function* removePartner(action) {
    try{
        yield axios.delete(`/api/admin/partners/delete/${action.payload}`);
        yield put({type: 'GET_PARTNERS'});
    }
    catch (error){
        console.log('failed adding new partner', error); 
    }
}

//getting partner details for the admin
function* getPartnerDetails(action) {
    try{
        const getResponse = yield axios.get(`/api/admin/partners/${action.payload}`);
        yield put({type: 'SET_PARTNER', payload: getResponse.data})
    }
    catch (error){
        console.log('failed GETTING requested partner', error); 
    }
}

//edit parnter name for the admin
function* editPartnerName(action) {
    try {
        yield axios.put(`/api/admin/partners/name/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/partners/${action.payload.id}`);
        yield put({type: 'SET_PARTNER', payload: getResponse.data});
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

//edit partner image for admin
function* editPartnerImage(action) {
    try {
        yield axios.put(`/api/admin/partners/image/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/partners/${action.payload.id}`);
        yield put({type: 'SET_PARTNER', payload: getResponse.data});
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

//edit partner level for the admin
function* editPartnerLevel(action) {
    try {
        yield axios.put(`/api/admin/partners/level/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/partners/${action.payload.id}`);
        yield put({type: 'SET_PARTNER', payload: getResponse.data});
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

//add partner level for the admin
function* addPartnerLevel(action) {
    try{
        yield axios.post(`/api/admin/partner-level`, action.payload);
        yield put({type: 'GET_PARTNER_LEVELS'});
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
    yield takeLatest('GET_PARTNER_DETAILS', getPartnerDetails)
    yield takeLatest('EDIT_PARTNER_NAME', editPartnerName)
    yield takeLatest('EDIT_PARTNER_IMAGE', editPartnerImage)
    yield takeLatest('EDIT_PARTNER_LEVEL', editPartnerLevel)
    yield takeLatest('ADD_LEVEL', addPartnerLevel)
}

export default partnerSaga;