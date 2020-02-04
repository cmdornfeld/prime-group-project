import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAdminGolfers() {
    try{
        const getResponse = yield axios.get(`/api/admin/golfers`);
        console.log(getResponse.data)
        yield put({type: 'SET_ALL_GOLFERS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

// post a new golfer
function* postAdminGolfer(action){
    try{
        yield axios.post(`/api/admin/golfers`, action.payload);
        yield put({type: 'GET_ADMIN_GOLFERS'})
    } catch (error){
        console.log(error)
    }
}

// delete a golfer
function* deleteAdminGolfer(action){
    try{
        yield axios.delete(`api/admin/golfers/${action.payload}`);
        yield put({type: 'GET_ADMIN_GOLFERS'})
    } catch (error){
        console.log(error)
    }
}

function* getIndividualDetails(action) {
    try{
        const getResponse = yield axios.get(`/api/admin/golfers/${action.payload}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* editGolferName(action) {
    try {
        console.log(action.payload.id)
        yield axios.put(`/api/admin/golfers/name/${action.payload.id}`, action.payload);
        // yield put({type: 'SET_GOLFER'})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

function* adminGolfersSaga() {
    yield takeLatest('GET_ADMIN_GOLFERS', getAdminGolfers);
    yield takeLatest('ADMIN_ADD_GOLFER', postAdminGolfer)
    yield takeLatest('ADMIN_DELETE_GOLFER', deleteAdminGolfer)
    yield takeLatest('ADMIN_GET_GOLFER_DETAILS', getIndividualDetails);
    yield takeLatest('EDIT_GOLFER_NAME', editGolferName)
}

export default adminGolfersSaga;