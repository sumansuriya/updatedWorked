import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllLeaveRequestAction } from "../redux/AdminLeaveApprovalReducer";
import { updateRenderAction } from "../redux/EmployeeRequestReducer";
import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const AdminLeaveApprovalList = () => {
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/");
  };
  const clearEmployeeURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-add");
  };

  const clearEmployeeTaskURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-task-add");
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllLeaveRequestAction());
  }, []);

  // 2
  const updateRequest = (item) => {
    console.log("Update Record", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/employee-leave-request-list");
  };

  console.log(state.adminLeaveApproval.AdminLeaveApprovalList);
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
              <Nav.Link as={Link} to="/admin-list">
                Admin List
              </Nav.Link>

              <Nav.Link as={Link} to="/employee-list">
                Employee List
              </Nav.Link>
              <Nav.Link onClick={clearEmployeeURef}>Employee Add</Nav.Link>

              <Nav.Link as={Link} to="/employee-task-list">
                Employee Task List
              </Nav.Link>
              <Nav.Link onClick={clearEmployeeTaskURef}>
                Employee Task Add
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-request-list">
                Employee Time Extension Request List
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-bench-list">
                Employee Bench List
              </Nav.Link>
              <Nav.Link as={Link} to="/employee-report-list">
                Employee Report List
              </Nav.Link>

              <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="alert alert-secondary mb-0">
        <h3>Employee Leave Requests List</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">leaveid</th>
            <th scope="col">assignedleaves</th>
            <th scope="col">approvedleaves</th>
            <th scope="col">balancedLeaves</th>
            <th scope="col">reason</th>
            <th scope="col">leaveduration</th>
            <th scope="col">leavetype</th>
            <th scope="col">leaveStatus</th>
            <th scope="col">taskid</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="text-light">
          {state.adminLeaveApproval.AdminLeaveApprovalList.map(
            (item, index) => (
              <tr key={index}>
                <th scope="row">{item.leaveid}</th>
                <td>{item.assignedleaves}</td>
                <td>{item.approvedleaves}</td>
                <td>{item.balanceLeaves}</td>
                <td>{item.reason}</td>
                <td>{item.leaveduration}</td>
                <td>{item.leavetype}</td>
                <td>{item.leaveStatus}</td>
                <td>{item.tasks.taskId}</td>

                <td>
                  <input
                    type="button"
                    value="Update"
                    className="btn btn-outline-success btn-sm  mr-1"
                    // onClick={updateRecord} :1
                    onClick={() => updateRequest(item)}
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
