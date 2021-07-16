import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticateAdminAction } from "../redux/UserReducer";
import background from "../image11.jpeg";
export const AdminSignin = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const signInUser = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      // dispatch the call to redux ::for API CALL
      dispatch(authenticateAdminAction({ username, password }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  // REACT ROUTE DOM
  if (state.user.authSuccess === true) {
    // redirecting the user /employee-list page;
    // history.push("/employee-list");
    history.push("/home");
  }

  return (
    <div
      className="bg-transparent d-flex justify-content-center align-items-center" 
      style={{ height: "100vh",
      backgroundImage: `url(${background})`, 
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat" }} >

      <div className="w-50">
        <h2 className="text-center alert alert-transparent text-light ">ADMIN SIGN IN</h2>

        {state.user.authFailure && (
          <div className="row mb-1 justify-content-center">
          <h6 className="text-center alert alert-danger w-50">
            Invalid Credentials
          </h6>
          </div>
        )}

        <form ref={formEl} className="needs-validation" noValidate>
          <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={updateUsername}
              className="form-control form-control-lg w-50"
              required
            />
          </div>
          </div>

          <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="password"
              value={password}
              onChange={updatePassword}
              placeholder="Enter Password"
              className="form-control form-control-lg mb-1 w-50"
              required
            />
          </div>
          </div>

          <div>
          <div className="row mb-1 justify-content-center">
            <input
              type="button"
              value="SIGN IN"
              onClick={signInUser}
              className="btn btn-success btn-lg w-50"
            />
          </div>
          </div>

          <div>
            <Link to="/employee-signin">
            <div className="row mb-1 justify-content-center">
              <input
                type="button"
                value="Employee Signin"
                className="btn btn-lg btn-link w-50"
              />
              </div>
            </Link>
            </div>

          <div>
            <Link to="/admin-signup">
            <div className="row mb-1 justify-content-center">
              <input
                type="button"
                value="Signup Here"
                className="btn btn-lg btn-link w-50"
              />
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};