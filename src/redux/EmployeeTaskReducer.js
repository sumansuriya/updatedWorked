import axios from "axios";

const initState = {
  employeeTaskList: [],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const EMPLOYEE_CREATE_TASK_ACTION_TYPE = "EMPLOYEE_TASK_CREATE__ACTION_TYPE";
const EMPLOYEE_GET_ALL_TASK_ACTION_TYPE = "EMPLOYEE_GET_ALL_TASK_ACTION_TYPE";
const EMPLOYEE_TASK_UPDATE_RENDER_ACTION_TYPE = "EMPLOYEE_TASK_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllEmployeeTaskAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/task`;
    const response = await axios.get(url);

     console.log(response.data);

    // UI UPDATE
    dispatch({ type: EMPLOYEE_GET_ALL_TASK_ACTION_TYPE, payload: response.data });
  };
};

export const createEmployeeTaskAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/task/add`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: EMPLOYEE_CREATE_TASK_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: EMPLOYEE_CREATE_TASK_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateEmployeeTaskAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/task/update`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction({});

    // update the ui. TODO
    dispatch({ type: EMPLOYEE_CREATE_TASK_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: EMPLOYEE_CREATE_TASK_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const deleteEmployeeTaskAction = (payload) => {
  return async (dispatch) => {
    // MAKE AN API/SERVER CALL
    const url = `http://localhost:8080/api/v1/task/delete/${payload.taskId}`;
    await axios.delete(url, payload);

    // Upate the UI TODO :: Fetch The Updated List
    dispatch(getAllEmployeeTaskAction());
  };
};

// 4
export const updateRenderAction = (payload) => {
  // ONLY UPDATEING THE UI
  // 5
  return { type: EMPLOYEE_TASK_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function EmployeeTaskReducer(state = initState, action) {
  switch (action.type) {
    case EMPLOYEE_GET_ALL_TASK_ACTION_TYPE:
      return { ...state, employeeTaskList: action.payload };
    case EMPLOYEE_CREATE_TASK_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case EMPLOYEE_TASK_UPDATE_RENDER_ACTION_TYPE:
      // 6
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}