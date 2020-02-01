const foundationReducer = (state=[], action)=>{
    if(action.type === `SET_FOUNDATION`){
        return action.payload;
    }
    return state;
}

export default foundationReducer;