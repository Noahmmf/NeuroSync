import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function UpdateHousehold() {
  const dispatch = useDispatch();
  const history = useHistory();
  const householdId = useParams();

  const household = useSelector((store) => store.householdReducer[0]);
  const newHousehold = useSelector((store) => store.householdReducer);

  const [joinHousehold, setJoinHousehold] = useState({
    id: householdId.id,
    name: "",
    household_key: "",
  });
  console.log("creating new household ID", householdId.id);

  const handleNameChange = (e) => {
    setJoinHousehold({ ...joinHousehold, name: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setJoinHousehold({ ...joinHousehold, household_key: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: "UPDATE_HOUSEHOLD", payload: joinHousehold });

    setJoinHousehold({
      name: "",
      household_key: "",
    });
    history.push("/info");
  };

  return (
    <>
      <h2>Please update an existing Household</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="householdName">Household Name:</label>
        <input
          required
          value={joinHousehold.name}
          onChange={handleNameChange}
          placeholder="Create Name"
          type="text"
        />
        <br />
        <label htmlFor="householdPassword">Create passcode:</label>
        <input
          required
          value={joinHousehold.household_key}
          onChange={handlePasswordChange}
          placeholder="Create Passcode"
          type="text"
        />
        <button type="submit">Udate Houshold</button>
      </form>
    </>
  );
}
