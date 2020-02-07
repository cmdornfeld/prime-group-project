import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import eventInfoReducer from './eventInfoReducer';
import videoReducer from './publicVideos';
import contactInfoReducer from './contactInfoReducer';
import missionReducer from './getMissionReducer';
import foundationReducer from './getFoundation';
import addressReducer from './addressReducer';
import donationReducer from './donationReducer';
import photosReducer from './publicPhotos';
import golferReducer from './getPublicGolfer';
import golferIdReducer from './getPublicGolferId';
import partnerReducer from './partnerReducer';
import addressPublicReducer from './getPublicAddress';
import contactPublicReducer from './getPublicContact';
import publicSponsorReducer from './getPublicSponsor';
import goalReducer from './goalReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  eventInfoReducer,
  videoReducer,
  contactInfoReducer,
  missionReducer,
  foundationReducer,
  addressReducer,
  donationReducer,
  photosReducer,
  golferReducer,
  golferIdReducer,
  partnerReducer,
  addressPublicReducer,
  contactPublicReducer,
  publicSponsorReducer,
  goalReducer,
});

export default rootReducer;
