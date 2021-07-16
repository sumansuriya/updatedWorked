import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";
import background from "../image27.jpeg";

function AdminHome() {
  const signOut = () => {
    // Logical Operation.
    // cookies / sessino are getting removed from the browser
    dispatch(signOutAction());

    // redirect the user to login page.
    history.push("/");
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const clearEmployeeURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-add");
  };

  const clearEmployeeTaskURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-task-add");
  };
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      </div>
    </div>
  );
}

export { AdminHome };
