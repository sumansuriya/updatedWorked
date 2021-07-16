import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import { signOutAction } from "../redux/UserReducer";
import logo from "../logo15.png";

// export const AppNav = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

  // const signOut = () => {
  //   // Logical Operation.
  //   // cookies / sessino are getting removed from the browser
  //   dispatch(signOutAction());

  //   // redirect the user to login page.
  //   history.push("/");
  // };

  // const clearEmployeeURef = () => {
  //   dispatch(updateRenderAction({}));
  //   history.push("/employee-add");
  // };

  // const clearEmployeeTaskURef = () => {
  //   dispatch(updateRenderAction({}));
  //   history.push("/employee-task-add");
  // };
  // const clearEmployeeRequestURef = () => {
  //   dispatch(updateRenderAction({}));
  //   history.push("/employee-request-add");
  // };
  // const clearEmployeeLeaveRequestURef = () => {
  //   dispatch(updateRenderAction({}));
  //   history.push("/employee-leave-request-add");
  // };

  // return (
    
    // <Navbar bg="dark" variant="dark" expand="sm">
    //   {/* <img align="left" src={logo} height="5%" width="5%" /> */}
    //   <Navbar.Brand href="#home"></Navbar.Brand>

    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />

    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="ml-auto">
          /* <Nav.Link as={Link} to="/admin-list">
            Admin List
          </Nav.Link>

          <Nav.Link as={Link} to="/employee-list">
            Employee List
          </Nav.Link>
          <Nav.Link  onClick={clearEmployeeURef} >
            Employee Add
          </Nav.Link>

          <Nav.Link as={Link} to="/employee-task-list">
            Employee Task List
          </Nav.Link>
          <Nav.Link  onClick={clearEmployeeTaskURef} >
            Employee Task Add
          </Nav.Link>
          <Nav.Link as={Link} to="/employee-request-list">
            Employee Time Extension Request List
          </Nav.Link>
          <Nav.Link  onClick={clearEmployeeRequestURef} >
            Employee Request Add
          </Nav.Link>
           <Nav.Link as={Link} to="/admin-leave-request-list">
            Admin Leave Request List
          </Nav.Link> 
          <Nav.Link  onClick={clearEmployeeLeaveRequestURef} >
            Employee Leave Request Add
          </Nav.Link>
          <Nav.Link as={Link} to="/employee-status-checklist">
            Employee Status Check List
          </Nav.Link>
          <Nav.Link as={Link} to="/employee-status-checkform">
            Employee Status Check Form
          </Nav.Link>
          <Nav.Link as={Link} to="/employee-bench-list">
            Employee Bench List
          </Nav.Link>
          <Nav.Link as={Link} to="/employee-report-list">
            Employee Report List
          </Nav.Link>
          <Nav.Link as={Link} to="/about-us">
            About Us
          </Nav.Link>
          <Nav.Link as={Link} to="/employee-about-us">
            Emloyee About Us
          </Nav.Link> */

           /* <Nav.Link onClick={signOut}>Sign Out</Nav.Link> */
    
    //     </Nav> 
        
    //    </Navbar.Collapse>
    //  </Navbar>
//   );
        
// };