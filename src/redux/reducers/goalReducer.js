import { combineReducers } from 'redux';

const golferGoalTotal = (state={}, action)=>{
    if(action.type === `SET_GOLFER_GOAL_TOTAL`){
        return action.payload;
    }
    return state;
}

const golferDonationTotal = (state={}, action)=>{
    if(action.type === `SET_GOLFER_DONATION_TOTAL`){
        return action.payload;
    }
    return state;
}

// const partner =  (state={}, action)=>{
//     if(action.type === `SET_PARTNER`){
//         return action.payload;
//     }
//     return state;
// }

export default combineReducers({
    golferGoalTotal,
    golferDonationTotal,
    // partner
  });