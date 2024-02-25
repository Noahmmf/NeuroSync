export default function DailyGoal(){
    
    
    const dispatch = useDispatch();
    const history = useHistory();

    //targets the click to delete button using datafrom button.
  const deleteGoal = (e) => {
    dispatch({ type: "DELETE_GOAL", payload: e.target.dataset.goalid });
  };



    
    return (
        <>
        <h1>Daily Goals:</h1>
            <li>{props.goal.description}
            <button data-goalid={props.goal.id} onClick={()=>history.push( `/edit/${props.goal.id}`)}>edit</button>
            <button data-goalid={props.goal.id} onClick={deleteGoal}> 🔴
      </button></li>
        </>
      );
}