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

// post a new photo
function* postAdminGolfer(action){
    try{
        console.log(action.payload)
        // yield axios.post(`/api/admin/photos`, action.payload);
        // yield put({type: 'GET_ADMIN_PHOTOS'})
    } catch (error){
        console.log(error)
    }
}

// function* getPublicGolferId(action) {
//     try{
//         const getResponse = yield axios.get(`/api/public/golfers/${action.payload}`);
//         yield put({type: 'SET_GOLFER', payload: getResponse.data})
//     }
//     catch (error){
//         console.log(error); 
//     }
// }

function* adminGolfersSaga() {
    yield takeLatest('GET_ADMIN_GOLFERS', getAdminGolfers);
    yield takeLatest('ADMIN_ADD_GOLFER', postAdminGolfer)
    // yield takeLatest('GET_GOLFER_DETAILS', getPublicGolferId);
}

export default adminGolfersSaga;