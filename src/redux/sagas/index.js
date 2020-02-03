import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getEventInfoSaga from './getEventInfoSaga';
import getPublicVideoSaga from './getVideoSaga';
import editLocationSaga from './editLocationSaga';
import contactInfoSaga from './contactInfoSaga';
import addressSaga from './addressSaga';
import editDateSaga from './editDateSaga';
import getMissionSaga from './getPublicAboutSaga';
import getAdminVideosSaga from './getAdminVideosSaga';
import postVideoSaga from './postVideoSaga';
import deleteVideoSaga from './deleteVideoSaga';
import donationSaga from './donationSaga';

import getPublicPhotoSaga from './getPublicPhoto';
import adminAboutSaga from './adminAboutSaga';

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
    contactInfoSaga(),
    addressSaga(),
    editDateSaga(),
    getMissionSaga(),
    getAdminVideosSaga(),
    postVideoSaga(),
    deleteVideoSaga(),
    donationSaga(),
    getPublicPhotoSaga(),
    adminAboutSaga(),
  ]);
}
