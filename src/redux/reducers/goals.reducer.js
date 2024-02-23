const goalsReducer = (state = [], action) => {
    if (action.type === 'SET_GOALS'){
        return action.payload;
    } else if (action.type === 'ADDING_NEW_GOAL'){
      return [...state, action.payload];
    } else if (action.type === 'EDITING_GOAL'){
      return action.payload;
    }
    return state;
  };

  // user will be on the redux state at:
// state.goals
  export default goalsReducer;