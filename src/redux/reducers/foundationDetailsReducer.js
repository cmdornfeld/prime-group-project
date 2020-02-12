const foundationDetailsReducer = (state={}, action)=>{
    if(action.type === `SET_FOUNDATION_DETAILS`){
        return action.payload;
    }
    return state;
}

export default foundationDetailsReducer;