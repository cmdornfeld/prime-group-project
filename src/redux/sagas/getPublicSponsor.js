import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get sponsor for the public
function* getPublicSponsor() {
    try{
        const getResponse = yield axios.get(`/api/public/sponsor`);
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