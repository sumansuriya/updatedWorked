import axios from "axios";

const initState = {
  AdminLeaveApprovalList: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const EMPLOYEE_LEAVE_REQUEST_CREATE_ACTION_TYPE = "EMPLOYEE_LEAVE_REQUEST_CREATE_ACTION_TYPE";

const ADMIN_LEAVE_REQUEST_UPDATE_RENDER_ACTION_TYPE = "ADMIN_LEAVE_REQUEST_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const createEmployeeLeaveRequestAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/leave/add`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: EMPLOYEE_LEAVE_REQUEST_CREATE_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: EMPLOYEE_LEAVE_REQUEST_CREATE_ACTION_TYPE, payload: false });
    }, 5000);
  };
};
export const updateEmployeeLeaveRequestAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/emp/leave/update`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: EMPLOYEE_LEAVE_REQUEST_CREATE_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: EMPLOYEE_LEAVE_REQUEST_CREATE_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateRenderAction = (payload) => {
  // ONLY UPDATEING THE UI
  // 5
  return { type: ADMIN_LEAVE_REQUEST_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};




// REDURE FOR STATE UPDTE
export function EmployeeLeaveRequestReducer(state = initState, action) {
  switch (action.type) {
    
    case EMPLOYEE_LEAVE_REQUEST_CREATE_ACTION_TYPE:
      return { ...state, progress: action.payload };
    
    case ADMIN_LEAVE_REQUEST_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };
   
    default:
      return state;
  }
}