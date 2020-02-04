const golferReducer = (state=[], action)=>{
    if(action.type === `SET_ALL_GOLFERS`){
        return action.payload;
    }
    return state;
}

export default golferReducer;