import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPublicAddress() {
    try{
        const getResponse = yield axios.get(`/api/public/address`);
        console.log(getResponse.data)
        yield put({type: 'SET_PUBLIC_ADDRESS', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

function* getPublicContact() {
    try{
        const getResponse = yield axios.get(`/api/public/contact`);
        console.log(getResponse.data)
        yield put({type: 'SET_PUBLIC_CONTACT', payload: getResponse.data})
    }
    catch (error){
        console.log(error); 
    }
}

//post to send email
function* sendEmail(action){
    try{
        const getResponse = yield axios.get(`/api/public/email`);

        const data = {
            to: getResponse.data,
            email: action.payload.email,
            name: action.payload.name,
            subject: action.payload.subject,
            body: action.payload.body
        }

        yield axios.post(`/api/public/email`, data);
    }
      catch(error){
          console.log('error in POST item', error);
      }
    }

function* getPublicAddressSaga() {
    yield takeLatest('GET_ADDRESS', getPublicAddress);
    yield takeLatest('GET_CONTACT', getPublicContact);
    yield takeLatest('SEND_EMAIL', sendEmail)
}

export default getPublicAddressSaga;