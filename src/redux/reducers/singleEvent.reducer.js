const singleEvent = (state = [], action) => {
 
    if(action.type === 'GRAB_ONE_EVENT'){
      return action.payload
    }
    // console.log("this is the state", state)
    return state;
  };


 
  export default singleEvent;