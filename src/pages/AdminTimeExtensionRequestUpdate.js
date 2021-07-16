import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployeeRequestAction,
  updateEmployeeTaskExtensionRequestAction,
} from "../redux/EmployeeRequestReducer";
import { AppNav } from "./AppNav";
import { Select } from "react-select";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import logo from "../logo15.png";
import { signOutAction } from "../redux/UserReducer";
export const AdminTimeExtensionRequestUpdate = () => {
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

  const [taskExtensionDate, setTaskExtensionDate] = useState(
    state.employeeRequest.uref.taskExtensionDate
  );
  const [reason, setReason] = useState(state.employeeRequest.uref.reason);
  const [status, setStatus] = useState(state.employeeRequest.uref.status);

  const [task, setTask] = useState(state.employeeRequest.uref.task);

  const updateTaskExtensionDate = (e) => setTaskExtensionDate(e.target.value);
  const updateReason = (e) => setReason(e.target.value);
  const updateStatus = (e) => setStatus(e.target.value);

  const updateTask = (e) => setTask(e.target.value);

 
  const updateEmployeeTaskExtensionRequest = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      console.log(state.employeeRequest.uref.requestid);
      dispatch(
        updateEmployeeTaskExtensionRequestAction({
          requestid: state.employeeRequest.uref.requestid,

          taskExtensionDate: taskExtensionDate,
          reason: reason,
          status: status,

          task: { taskId: task },
        })
      );

      // clear the form

      setTaskExtensionDate("");
      setReason("");
      setStatus("");
      setTask("");
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
      <div className="alert alert-secondary">
       
          <center>
            {" "}
            <h2>Employee Request Update</h2>
          </center>
       
          
      </div>

      {state.employeeRequest.progress && (
        <div className="row mb-1 justify-content-center">
          <div className="mx-4 alert alert-success w-50">
            Request updated Successfully
          </div>
        </div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
        <div className="row mb-1 justify-content-center">
          <input
            type="text"
            value={reason}
            onChange={updateReason}
            className="form-control form-control-lg w-50"
            placeholder="Enter Reason"
            required
          />
        </div>
        <h5 className="text-light text-center col-8">Enter Extension date </h5>
        <div className="row mb-1 justify-content-center">
          <input
            type="date"
            value={taskExtensionDate}
            onChange={updateTaskExtensionDate}
            className="form-control form-control-lg w-50"
            placeholder="Enter Task Extension Date"
            required
          />
        </div>
        <div className="row mb-1 justify-content-center">
         
            <select
              className="custom-select custom-select-lg w-50"
              onChange={(e) => {
                const selectedStatus = e.target.value;
                setStatus(selectedStatus);
              }}
            >
              <option value="">SELECT</option>
              <option value="REJECTED">REJECT</option>

              <option value="APPROVED">APPROVE</option>
            </select>
         
        </div>

        <div className="row mb-1 justify-content-center">
       
           <input
           type="text"
           value={task}
           onChange={updateTask}
           className="form-control form-control-lg mb-1 w-50"
           placeholder="Enter Task Id"
           required
         />
           
       
        </div>

        <div className="row mb-1 justify-content-center">
          
            <input
              type="button"
              onClick={updateEmployeeTaskExtensionRequest}
              value="Update Employee Request"
              className="btn btn-lg btn-info w-50"
            />
        
        </div>
      </form>
    </div>
  );
};
