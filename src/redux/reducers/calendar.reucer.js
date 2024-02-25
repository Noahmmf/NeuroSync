const event = (state = [], action) => {
 
    if(action.type === 'ADD_EVENT'){
      return [...state, action.payload]
    }
    // console.log("this is the state", state)
    return state;
  };


 
  export default event;