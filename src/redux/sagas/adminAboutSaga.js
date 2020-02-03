import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get mission
function* getMission() {
    try{
        const getResponse = yield axios.get(`/api/admin/mission`);
        yield put({type: 'SET_MISSION', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

// edit mission
function* editMission(action) {
    try {
        yield axios.put(`/api/admin/mission/${action.payload.id}`, action.payload);
        yield put({type: 'GET_ADMIN_MISSION'})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

// post new foundation
function* postNewFoundation(action){
    try{
        yield axios.post(`/api/admin/foundation`, action.payload);
        yield put({type: 'GET_ADMIN_FOUNDATION'})
    } catch (error){
        console.log(error)
    }
}

//get foundation
function* getAdminFoundation() {
    try{
        const getResponse = yield axios.get(`/api/admin/foundation`);
        yield put({type: 'SET_FOUNDATION', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* deleteFoundation(action){
    try{
        yield axios.delete(`api/admin/foundation/${action.payload}`);
        yield put({type: 'GET_ADMIN_FOUNDATION'})
    } catch (error){
        console.log(error)
    }
}

function* adminAboutSaga() {
    yield takeLatest('GET_ADMIN_MISSION', getMission);
    yield takeLatest('EDIT_ADMIN_MISSION', editMission);
    yield takeLatest('ADD_FOUNDATION', postNewFoundation);
    yield takeLatest('GET_ADMIN_FOUNDATION', getAdminFoundation);
    yield takeLatest('DELETE_FOUNDATION', deleteFoundation);
}

export default adminAboutSaga;