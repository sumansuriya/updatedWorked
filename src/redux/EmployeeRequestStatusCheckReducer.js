import axios from "axios";
import {
  getAllTaskTimeExtensionRequestsAction,

} from "../redux/AdminTaskTimeExtensionRequestsReducer";

const initState = {
  EmployeeStatusCheckListTE:  [],
  taskListByid:[],
  progress: false,

  // on click of update button; the key will be updated.
  uref: {},
};


//const EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYPE = "EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYP";
const REQUEST_BY_ID_ACTION_TYPE = "REQUEST_BY_ID_ACTION_TYPE";

export const getAllEmployeeRequestsCheckAction = (payload) => {
    return async (dispatch) => {
      // API CALL :: FETCH RECORDS
    // const taskId=localStorage.setItem("taskId",payload)
     //console.log(payload);
      const url = `http://localhost:8080/api/v1/request/task/${payload}`;
     const response = await axios.get(url);
  
      console.log(response.data);

      // dispatch({ type:REQUEST_BY_ID_ACTION_TYPE , payload: ""});
      // UI UPDATE
      dispatch({ type:REQUEST_BY_ID_ACTION_TYPE , payload: response.data });
   

    };
  };
  export const deleteRequestAction = (payload) => {
    return async (dispatch) => {
      // MAKE AN API/SERVER CALL
      const url = `http://localhost:8080/api/v1/request/delete/${payload.requestid}`;
      await axios.delete(url,payload);
  
      // Update the UI TODO :: Fetch The Updated List
   // dispatch(getAllEmployeeRequestsCheckAction());
 dispatch(getAllTaskTimeExtensionRequestsAction());
    };
  };
  export function EmployeeRequestStatusCheckReducer(state = initState, action) {
    switch (action.type) {
      // case EMPLOYEE_GET_ALL_REQUESTS_BY_TASK_ID_ACTION_TYPE:
      //   return { ...state, EmployeeStatusCheckListTE: action.payload };
        case REQUEST_BY_ID_ACTION_TYPE:
          return { ...state,  taskListByid:action.payload };
    
      default:
        return state;
    }}