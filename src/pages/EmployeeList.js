import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  deleteEmployeeAction,
  getAllEmployeeAction,
  updateRenderAction,
} from "../redux/EmployeeReducer";
import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeList = () => {
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
    dispatch(getAllEmployeeAction());
  }, []);

  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.empid);
    // dispatch the call.
    dispatch(deleteEmployeeAction(item));
  };

  // 2
  const updateRecord = (item) => {
    console.log("Update Record", item);

    // 3 :: updating the store
    dispatch(updateRenderAction(item));

    // navigateing to the page
    history.push("/employee-add");
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
              <Nav.Link as={Link} to="/admin-list">
                Admin List
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
              <Nav.Link as={Link} to="/employee-leave-request-list">
                Employee Leave Request List
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
        <h2>Employee List</h2>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">empid</th>
            <th scope="col">firstname</th>
            <th scope="col">lastname</th>
            <th scope="col">username</th>
            <th scope="col">password</th>
            <th scope="col">empmail</th>
            <th scope="col">empDeptName</th>
            <th scope="col">location</th>
            <th scope="col">empDOB</th>
            <th scope="col">empHireDate</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="text-light">
          {state.employee.employeeList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.empid}</th>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.username}</td>
              <td>{"******"}</td>
              <td>{item.empmail}</td>
              <td>{item.empDeptName}</td>
              <td>{item.location}</td>
              <td>{item.empDOB}</td>
              <td>{item.empHireDate}</td>

              <td>
                <input
                  type="button"
                  value="Update"
                  className="btn btn-outline-success btn-sm  mr-1"
                  // onClick={updateRecord} :1
                  onClick={() => updateRecord(item)}
                />
                <input
                  type="button"
                  value="Delete"
                  // onClick={deleteRecord}
                  onClick={() => deleteRecord(item)}
                  className="btn btn-outline-danger btn-sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
