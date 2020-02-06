import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get public sponsor saga
function* getPublicSponsor() {
    try{
        const getResponse = yield axios.get(`/api/public/sponsor`);
        console.log(getResponse.data)
        yield put({type: 'SET_PUBLIC_SPONSOR', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}


function* getPublicSponsorSaga() {
    yield takeLatest('GET_PUBLIC_SPONSOR', getPublicSponsor);
}

export default getPublicSponsorSaga;