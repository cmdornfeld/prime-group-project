const contactInfoReducer = (state={}, action)=>{
    if(action.type === `SET_CONTACT_INFO`){
        return action.payload;
    }
    return state;
}

export default contactInfoReducer;