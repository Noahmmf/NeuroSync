const householdReducer = (state = [], action) => {
    if (action.type === 'SET_HOUSEHOLD'){
        return action.payload;
    } 
    return state;
  };


  export default householdReducer;