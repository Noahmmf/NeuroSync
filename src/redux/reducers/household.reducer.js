const householdReducer = (state = [], action) => {
    if (action.type === 'SET_HOUSEHOLD'){
        return action.payload;
    }else if (action.type === 'CLEAR_HOUSEHOLD'){
        return[];
    }
    return state;
  };


  export default householdReducer;