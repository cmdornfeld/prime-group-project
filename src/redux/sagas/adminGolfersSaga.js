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

// get individual golfer details
function* getIndividualDetails(action) {
    try{
        const getResponse = yield axios.get(`/api/admin/golfers/${action.payload}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

// edit golfers first and last names
function* editGolferName(action) {
    try {
        yield axios.put(`/api/admin/golfers/name/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/golfers/${action.payload.id}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

// edit golfers goal
function* editGolferGoal(action) {
    try {
        yield axios.put(`/api/admin/golfers/goal/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/golfers/${action.payload.id}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

// edit golfers bio
function* editGolferBio(action) {
    try {
        yield axios.put(`/api/admin/golfers/bio/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/golfers/${action.payload.id}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

// edit golfers purpose
function* editGolferPurpose(action) {
    try {
        yield axios.put(`/api/admin/golfers/purpose/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/golfers/${action.payload.id}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

// edit golfers photo
function* editGoferPhoto(action) {
    try {
        yield axios.put(`/api/admin/golfers/image/${action.payload.id}`, action.payload);
        const getResponse = yield axios.get(`/api/admin/golfers/${action.payload.id}`);
        yield put({type: 'SET_GOLFER', payload: getResponse.data})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

function* adminGolfersSaga() {
    yield takeLatest('GET_ADMIN_GOLFERS', getAdminGolfers);
    yield takeLatest('ADMIN_ADD_GOLFER', postAdminGolfer)
    yield takeLatest('ADMIN_DELETE_GOLFER', deleteAdminGolfer)
    yield takeLatest('ADMIN_GET_GOLFER_DETAILS', getIndividualDetails);
    yield takeLatest('EDIT_GOLFER_NAME', editGolferName);
    yield takeLatest('EDIT_GOLFER_GOAL', editGolferGoal);
    yield takeLatest('EDIT_GOLFER_BIO', editGolferBio);
    yield takeLatest('EDIT_GOLFER_PURPOSE', editGolferPurpose);
    yield takeLatest('EDIT_GOLFER_PHOTO', editGoferPhoto)
}

export default adminGolfersSaga;