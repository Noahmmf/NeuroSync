const goalsReducer = (state = [], action) => {
    if (action.type === 'SET_GOALS'){
        return action.payload;
    }
    return state;
  };

  // user will be on the redux state at:
// state.goals
  export default goalsReducer;