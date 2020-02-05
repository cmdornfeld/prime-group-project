const contactPublicReducer = (state=[], action)=>{
    if(action.type === `SET_PUBLIC_CONTACT`){
        return action.payload;
    }
    return state;
}

export default contactPublicReducer;