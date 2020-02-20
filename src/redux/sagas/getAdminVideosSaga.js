import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//getting videos for the admin
function* getAdminVideos() {
    try{
        const getResponse = yield axios.get(`/api/admin/videos`);
        yield put({type: 'SET_VIDEOS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}


function* getAdminVideosSaga() {
    yield takeLatest('GET_VIDEOS_ADMIN', getAdminVideos);
}

export default getAdminVideosSaga;