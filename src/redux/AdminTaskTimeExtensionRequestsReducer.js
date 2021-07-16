import axios from "axios";

const initState = {
  AdminTaskExtensionRequestList: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1

const ADMIN_GET_ALL_TASK_TIME_EXTENSION_REQUESTS_ACTION_TYPE = "ADMIN_GET_ALL_TASK_TIME_EXTENSION_REQUESTS_ACTION_TYPE";

// ACTIONS
export const getAllTaskTimeExtensionRequestsAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/request/view`;
    const response = await axios.get(url);

     console.log(response.data);

    // UI UPDATE
    dispatch({ type: ADMIN_GET_ALL_TASK_TIME_EXTENSION_REQUESTS_ACTION_TYPE, payload: response.data });
  };
};







// 4


// REDURE FOR STATE UPDTE
export function AdminTaskTimeExtensionRequestsReducer(state = initState, action) {
  switch (action.type) {
    case ADMIN_GET_ALL_TASK_TIME_EXTENSION_REQUESTS_ACTION_TYPE:
      return { ...state, AdminTaskExtensionRequestList: action.payload };
      
    default:
      return state;
  }
}