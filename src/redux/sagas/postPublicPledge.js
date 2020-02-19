import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//post pledge for the public
function* postPledgeSaga(action){
try{    
    yield axios.post(`/api/public/pledges`,  action.payload);
}
  catch(error){
      console.log('error in POST item', error);
  }
}

function* postPublicSaga() {
    yield takeEvery('POST_PLEDGE', postPledgeSaga);

}

export default postPublicSaga;