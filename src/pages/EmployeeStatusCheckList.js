import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllTaskTimeExtensionRequestsAction } from "../redux/AdminTaskTimeExtensionRequestsReducer";
import {
  getAllEmployeeRequestsCheckAction,
  deleteRequestAction,
} from "../redux/EmployeeRequestStatusCheckReducer";

import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeStatusCheckList = () => {
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/employee-signin");
  };
  const clearEmployeeRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-request-add");
  };
  const clearEmployeeLeaveRequestURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-leave-request-add");
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllEmployeeRequestsCheckAction());
  }, []);

  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.requestid);
    // dispatch the call.
    dispatch(deleteRequestAction(item));
  };

  console.log(
    state.employeeRequestStatusCheck.taskListByid
  );
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
              <Nav.Link as={Link} to="/employee-status-checkform">
                Employee Status Check Form
              </Nav.Link>

              <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="alert alert-secondary mb-0">
        <h2>Employee Request Status Check List</h2>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">requestid</th>
            <th scope="col">status</th>
            <th scope="col">reason</th>
            <th scope="col">taskExtensionDate</th>
            <th scope="col">taskid</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="text-light">

          {state.employeeRequestStatusCheck.taskListByid.map(
            (item, index) => (
              <tr key={index}>
                <th scope="row">{item.requestid}</th>
                <td>{item.status}</td>
                <td>{item.reason}</td>
                <td>{item.taskExtensionDate}</td>
                {item!==undefined&&(<td>{item.task.taskId}</td> )}
                <td>
                  <input
                    type="button"
                    value="Delete"
                    // onClick={deleteRecord}
                    onClick={() => deleteRecord(item)}
                    className="btn btn-outline-danger btn-sm"
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
