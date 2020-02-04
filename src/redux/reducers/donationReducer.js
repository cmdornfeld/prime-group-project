const donationReducer = (state=[], action)=>{
    if(action.type === `SET_DONATIONS`){
        return action.payload;
    }
    return state;
}

export default donationReducer;