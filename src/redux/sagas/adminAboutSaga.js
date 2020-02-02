import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get mission
function* getMission() {
    try{
        const getResponse = yield axios.get(`/api/admin/mission`);
        console.log(getResponse.data)
        yield put({type: 'SET_MISSION', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
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
    // yield takeLatest('GET_FOUNDATION', getFoundation)
}

export default adminAboutSaga;