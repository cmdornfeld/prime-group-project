const publicSponsorReducer = (state=[], action)=>{
    if(action.type === `SET_PUBLIC_SPONSOR`){
        return action.payload;
    }
    return state;
}

export default publicSponsorReducer;