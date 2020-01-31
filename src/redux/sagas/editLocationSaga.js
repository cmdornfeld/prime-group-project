import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editLocation(action) {
    try {
        console.log(action.payload.id)
        yield axios.put(`/api/admin/location/${action.payload.id}`, action.payload);
        yield put({type: 'GET_EVENT_INFO'})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

function* editLocationSaga() {
    yield takeLatest('EDIT_LOCATION', editLocation);
}

export default editLocationSaga;