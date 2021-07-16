import axios from "axios";

const initState = {
  reportList: [],
  progress: false,
};

const REPORT_GET_ALL_ACTION_TYPE = "REPORT_GET_ALL_ACTION_TYPE";

// ACTIONS
export const getAllEmployeeReportAction = () => {
    return async (dispatch) => {
      // API CALL :: FETCH RECORDS
      const url = `http://localhost:8080/api/v1/report/view`;
      const response = await axios.get(url);
  
      // console.log(response);
  
      // UI UPDATE
      dispatch({ type: REPORT_GET_ALL_ACTION_TYPE, payload: response.data });
    };
  };
  export function EmployeeReportReducer(state = initState, action) {
    switch (action.type) {
      case REPORT_GET_ALL_ACTION_TYPE:
        return { ...state, reportList: action.payload };
      default:
        return state;
    }
  }