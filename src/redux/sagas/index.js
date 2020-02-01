import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getEventInfoSaga from './getEventInfoSaga';
import getPublicVideoSaga from './getVideoSaga';
import editLocationSaga from './editLocationSaga';
import getContactInfoSaga from './getContactInfoSaga';
import getAddressInfoSaga from './getAddressSaga';
import editDateSaga from './editDateSaga';
import getAdminVideosSaga from './getAdminVideosSaga';
import postVideoSaga from './postVideoSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    getEventInfoSaga(),
    getPublicVideoSaga(),
    editLocationSaga(),
    getContactInfoSaga(),
    getAddressInfoSaga(),
    editDateSaga(),
    getAdminVideosSaga(),
    postVideoSaga(),
  ]);
}
