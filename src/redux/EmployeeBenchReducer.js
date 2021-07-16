import axios from "axios";

const initState = {
  benchList: [],
  progress: false,
};

const BENCH_GET_ALL_ACTION_TYPE = "BENCH_GET_ALL_ACTION_TYPE";

// ACTIONS
export const getAllEmployeeBenchAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/bench`;
    const response = await axios.get(url);

    // console.log(response);

    // UI UPDATE
    dispatch({ type: "BENCH_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export function EmployeeBenchReducer(state = initState, action) {
  switch (action.type) {
    case BENCH_GET_ALL_ACTION_TYPE:
      return { ...state, benchList: action.payload };
    default:
      return state;
  }
}