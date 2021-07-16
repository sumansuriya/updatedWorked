import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployeeAction,
  updateEmployeeAction,
} from "../redux/EmployeeReducer";
import { AppNav } from "./AppNav";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";

export const EmployeeAdd = () => {
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
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [firstname, setFirstname] = useState(state.employee.uref.firstname);
  const [lastname, setLastname] = useState(state.employee.uref.lastname);
  const [username, setUsername] = useState(state.employee.uref.username);
  const [empmail, setEmpmail] = useState(state.employee.uref.empmail);
  const [empDeptName, setEmpDeptName] = useState(
    state.employee.uref.empDeptName
  );
  const [location, setLocation] = useState(state.employee.uref.location);
  const [empDOB, setEmpDOB] = useState(state.employee.uref.empDOB);
  const [empHireDate, setEmpHireDate] = useState(
    state.employee.uref.empHireDate
  );

  const updateFirstname = (e) => setFirstname(e.target.value);
  const updateLastname = (e) => setLastname(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateempmail = (e) => setEmpmail(e.target.value);
  const updatempDeptName = (e) => setEmpDeptName(e.target.value);
  const updatelocation = (e) => setLocation(e.target.value);
  const updatempDOB = (e) => setEmpDOB(e.target.value);
  const updatempHireDate = (e) => setEmpHireDate(e.target.value);

  const addNewEmployee = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createEmployeeAction({
          firstname,
          lastname,
          username,
          empmail,
          empDeptName,
          location,
          empDOB,
          empHireDate,
        })
      );

      // clear the form
      setFirstname("");
      setLastname("");
      setUsername("");
      setEmpmail("");
      setEmpDeptName("");
      setLocation("");
      setEmpDOB("");
      setEmpHireDate("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateEmployee = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateEmployeeAction({
          empid: state.employee.uref.empid,
          firstname,
          lastname,
          username,
          empmail,
          empDeptName,
          location,
          empDOB,
          empHireDate,
        })
      );

      // clear the form
      setFirstname("");
      setLastname("");
      setUsername("");
      setEmpmail("");
      setEmpDeptName("");
      setLocation("");
      setEmpDOB("");
      setEmpHireDate("");
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
              <Nav.Link as={Link} to="/admin-list">
                Admin List
              </Nav.Link>

              <Nav.Link as={Link} to="/employee-list">
                Employee List
              </Nav.Link>

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
      <div className="alert alert-secondary">
        {state.employee.uref.empid ? (
          <center>
            {" "}
            <h2>Employee Update</h2>
          </center>
        ) : (
          <center>
            <h2>Employee Create</h2>
          </center>
        )}
      </div>

      {state.employee.progress && (
        <div className="row mb-1 justify-content-center">
          <div className="mx-4 alert alert-success w-50 ">
            Employee added Successfully
          </div>
        </div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={firstname}
            placeholder="Enter firstname"
            onChange={updateFirstname}
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={lastname}
            placeholder="Enter lastname"
            onChange={updateLastname}
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={username}
            placeholder="Enter username"
            onChange={updateUsername}
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={empmail}
            placeholder="Enter mail"
            onChange={updateempmail}
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={empDeptName}
            placeholder="Enter deptname"
            onChange={updatempDeptName}
            required
          />
        </div>

        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            className="form-control form-control-lg w-50"
            value={location}
            placeholder="Enter location"
            onChange={updatelocation}
            required
          />
        </div>

        <h5 className="text-light text-center col-7"> Enter Birthdate </h5>
        <div className="row mb-1 justify-content-center">
          <input
            type="date"
            className="form-control form-control-lg w-50"
            value={empDOB}
            placeholder="Enter DOB"
            onChange={updatempDOB}
            required
          />
        </div>
        {/* </div>
        </div> */}

        <h5 className="text-light text-center col-7"> Enter Hire date </h5>
        <div className="row mb-1 justify-content-center">
          <input
            placeholder="Enter hire date"
            type="date"
            className="form-control form-control-lg mb-1 w-50"
            value={empHireDate}
            onChange={updatempHireDate}
            required
          />
        </div>

        <div>
          <div className="row mb-1 justify-content-center">
            {state.employee.uref.empid ? (
              <input
                type="button"
                onClick={updateEmployee}
                value="Update Employee"
                className="btn btn-lg btn-info w-50"
              />
            ) : (
              <input
                type="button"
                onClick={addNewEmployee}
                value="Add Employee"
                className="btn btn-lg btn-success w-50"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
