import { combineReducers } from 'redux';

const company = (state=[], action)=>{
    if(action.type === `SET_PARTNERS`){
        return action.payload;
    }
    return state;
}

const level = (state=[], action)=>{
    if(action.type === `SET_PARTNER_LEVELS`){
        return action.payload;
    }
    return state;
}

const partner =  (state={}, action)=>{
    if(action.type === `SET_PARTNER`){
        return action.payload;
    }
    return state;
}

export default combineReducers({
    company,
    level,
    partner
  });