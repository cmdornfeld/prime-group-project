import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//post item for order
function* postPledgeSaga(action){
try{
    console.log('pledges##############', action.payload);
    
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