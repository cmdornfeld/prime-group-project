import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPublicPhoto() {
    try{
        const getResponse = yield axios.get(`/api/public/photos`);
        console.log(getResponse.data)
        yield put({type: 'SET_PHOTOS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPublicPhotoSaga() {
    yield takeLatest('GET_PHOTOS', getPublicPhoto);
}

export default getPublicPhotoSaga;