const missionReducer = (state={}, action)=>{
    if(action.type === `SET_MISSION`){
        return action.payload;
    }
    return state;
}

export default missionReducer;