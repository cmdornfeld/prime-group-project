const videoReducer = (state=[], action)=>{
    if(action.type === `SET_VIDEOS`){
        return action.payload;
    }
    return state;
}

export default videoReducer;