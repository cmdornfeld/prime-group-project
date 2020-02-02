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

// //get foundation
// function* getFoundation() {
//     try{
//         const getResponse = yield axios.get(`/api/public/foundation`);
//         console.log(getResponse.data)
//         yield put({type: 'SET_FOUNDATION', payload: getResponse.data})
//     }
//     catch (error){
//         console.log(error); 
//     }
// }

function* adminAboutSaga() {
    yield takeLatest('GET_ADMIN_MISSION', getMission)
    yield takeLatest('EDIT_ADMIN_MISSION', editMission);

    // yield takeLatest('GET_FOUNDATION', getFoundation)
}

export default adminAboutSaga;