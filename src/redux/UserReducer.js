import axios from "axios";

const initState = {
  progress: false,

  // AUTH FAILS => TRUE
  authFailure: false,
  authSuccess: false, // store this informatino in session/localstorage
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const AUTH_FAILURE_ACTION_TYPE = "AUTH_FAILURE_ACTION_TYPE";
const AUTH_SUCCESS_ACTION_TYPE = "AUTH_SUCCESS_ACTION_TYPE";


export const AdminCreateAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: SERVER CALL
    const url = `http://localhost:8080/api/v1/`;
    await axios.post(url, payload);

    // TODO for UI
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const authenticateAdminAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: VERIFICATION
    const url = `http://localhost:8080/api/v1/login`;
    const response = await axios.post(url, payload);
   
    console.log(response);

    if (response.data !== "") {
      // VALID USER
      dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: true });

      // Will store the success information in storage.
      // TODO will save into the storage
      localStorage.setItem("authSuccess", "1");

      // NOT DOING THE ACTIVITY OF 5 SECONDS :: page will be redirected to anohter page.
    } else {
      // INVALID USER :: AUTH FAILS
      // updating the UI
      dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: true });

      setTimeout(() => {
        dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: false });
      }, 5000);
    }
  };
};

export const signOutAction = () => {
  return async (dispatch) => {
    console.log("signout");

    // remove the storage/cookies
    localStorage.removeItem("authSuccess");

    dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: false });
  };
};

// REDURE FOR STATE UPDTE
export function UserReducer(state = initState, action) {
  switch (action.type) {
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case AUTH_FAILURE_ACTION_TYPE:
      return { ...state, authFailure: action.payload };
    case AUTH_SUCCESS_ACTION_TYPE:
      return { ...state, authSuccess: action.payload };
    default:
      return state;
  }
}
  export const authenticateEmployeeAction = (payload) => {
    return async (dispatch) => {
      // API CALL :: VERIFICATION
      const url = `http://localhost:8080/api/v1/emp/login`;
      const response = await axios.post(url, payload);
     
      console.log(response);
  
      if (response.data !== "") {
        // VALID USER
        dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: true });
  
        // Will store the success information in storage.
        // TODO will save into the storage
        localStorage.setItem("authSuccess", "1");
  
        // NOT DOING THE ACTIVITY OF 5 SECONDS :: page will be redirected to anohter page.
      } else {
        // INVALID USER :: AUTH FAILS
        // updating the UI
        dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: true });
  
        setTimeout(() => {
          dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: false });
        }, 5000);
      }
    };
  };
