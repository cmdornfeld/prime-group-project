const addressPublicReducer = (state=[], action)=>{
    if(action.type === `SET_PUBLIC_ADDRESS`){
        return action.payload;
    }
    return state;
}

export default addressPublicReducer;