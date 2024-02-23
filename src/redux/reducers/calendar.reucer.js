const event = (state = [], action) => {
    // if (action.type === 'SET_EVENT'){
    //     return action.payload;
    // } else if (action.type === 'ADDING_NEW_EVENT'){
    //   return [...state, action.payload];
    // } else if (action.type === 'EDITING_EVENT'){
    //   return action.payload;
    // }
    if(action.type === 'ADD_EVENT'){
      return [...state, action.payload]
    }
    // console.log("this is the state", state)
    return state;
  };


 
  export default event;