const setHouseholdNamesReducer = (state = [], action) => {
    if (action.type === 'SET_HOUSEHOLD_NAMES'){
        return action.payload;
    } 
    return state;
  };


  export default setHouseholdNamesReducer;