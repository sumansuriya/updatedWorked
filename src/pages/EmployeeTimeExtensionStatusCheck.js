import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployeeRequestsCheckAction } from "../redux/EmployeeRequestStatusCheckReducer";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeTimeExtensionStatusCheck = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/");
  };
  const clearEmployeeRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-request-add");
  };
  const clearEmployeeLeaveRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-leave-request-add");
  };
  const state = useSelector((state) => state);

  const [taskId, setTaskId] = useState("");

  const updateTaskId = (e) => setTaskId(e.target.value);

  const CheckList = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      console.log("hello");
      // dispatch the call to redux ::for API CALL
      dispatch(getAllEmployeeRequestsCheckAction({ taskId }));

      // clear the form
      setTaskId("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div>
      <div>
        <Navbar bg="dark" variant="dark" expand="">
          <img align="left" src={logo} height="5%" width="5%" />
          <div>
            <Nav.Link as={Link} to="/about-us">
              About Us
            </Nav.Link>
          </div>
          <div>
            <Nav.Link as={Link} to="/help">
              FAQ
            </Nav.Link>
          </div>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={clearEmployeeRequestURef}>
                Employee Request Add
              </Nav.Link>
              <Nav.Link onClick={clearEmployeeLeaveRequestURef}>
                Employee Leave Request Add
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-status-checklist">
                Employee Status Check List
              </Nav.Link>

              <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div
        className="bg-transparent d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="w-50">
          <h4 className="text-center text-light alert alert-transaparent">
            Employee Request Status Check
          </h4>

          <form ref={formEl} className="needs-validation" noValidate>
            <div className="row mb-1 justify-content-center">
              <input
                type="text"
                value={taskId}
                onChange={updateTaskId}
                placeholder="Enter TaskId"
                className="form-control form-control-lg mb-1 w-50"
                required
              />
            </div>

            <div>
              <Link to="/employee-status-checklist">
                <div className="row mb-1 justify-content-center">
                  <input
                    type="button"
                    value="check "
                    onChange={CheckList}
                    className="btn btn-success btn-lg w-50"
                  />
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
