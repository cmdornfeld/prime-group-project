const photosReducer = (state=[], action)=>{
    if(action.type === `SET_PHOTOS`){
        return action.payload;
    }
    return state;
}

export default photosReducer;