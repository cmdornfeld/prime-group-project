import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET all photos that are in the admin
function* getAdminPhotos() {
    try{
        const getResponse = yield axios.get(`/api/admin/photos`);
        yield put({type: 'SET_PHOTOS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

// post a new photo
function* postAdminPhotos(action){
    try{
        yield axios.post(`/api/admin/photos`, action.payload);
        yield put({type: 'GET_ADMIN_PHOTOS'})
    } catch (error){
        console.log(error)
    }
}

// delete a photo from the admin
function* deleteAdminPhotos(action){
    try{
        yield axios.delete(`api/admin/photos/${action.payload}`);
        yield put({type: 'GET_ADMIN_PHOTOS'})
    } catch (error){
        console.log(error)
    }
}

function* adminPhotosSaga() {
    yield takeLatest('GET_ADMIN_PHOTOS', getAdminPhotos);
    yield takeLatest('ADMIN_ADD_PHOTO', postAdminPhotos);
    yield takeLatest('ADMIN_DELETE_PHOTO', deleteAdminPhotos);
}

export default adminPhotosSaga;