const golferIdReducer = (state=[], action)=>{
    if(action.type === `SET_GOLFER`){
        return action.payload;
    }
    return state;
}

export default golferIdReducer;