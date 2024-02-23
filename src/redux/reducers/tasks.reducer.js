const tasksReducer = (state = [], action) => {
    if (action.type === 'SET_TASKS'){
        return action.payload;
    } else if (action.type === 'ADDING_NEW_TASK'){
      return [...state, action.payload];
    } else if (action.type === 'EDITING_TASK'){
      return action.payload;
    }
    return state;
  };

 
  export default tasksReducer;