const householdReducer = (state = [], action) => {
    if (action.type === 'SET_HOUSEHOLD'){
        return action.payload;
    } 
    return state;
  };

  // user will be on the redux state at:
// state.goals
  export default householdReducer;