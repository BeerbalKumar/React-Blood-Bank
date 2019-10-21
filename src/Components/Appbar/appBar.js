import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon
} from "mdbreact";
import { FirebaseApp } from "../../Config/Firebase/firebase";

class NavbarPage extends Component {
  constructor() {
    super();
    this.state = {
      collapseID: "",
      name: ""
    };
  }


  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  componentDidMount = () => {
    let currentUser = JSON.parse(localStorage.getItem("currentId"))
    console.log(currentUser)
    FirebaseApp.firestore().collection("users").doc(currentUser).get()
      .then((data) => {
        console.log(data.data());
        this.setState({ name: data.data().fullName, group: data.data().value })
        localStorage.setItem("currentUser", JSON.stringify({ name: data.data().fullName, group: data.data().value }))
      })
  }

  render() {
    console.log(this.state)
    return (
      <div>

        <MDBNavbar style={{ backgroundColor: "brown" }} dark expand="md" sticky>
          <MDBNavbarBrand>
            {/* <img width="40px" src="https://p7.hiclipart.com/preview/552/293/309/blood-donation-blood-bank-world-blood-donor-day-blood-donors.jpg" /> */}
            <strong className="white-text">BLOOD BANK</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" to="#!">
                  <MDBIcon className="mr-1" />My Posts</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem onClick={() => this.props.path.push("/createpost")}>
                <MDBNavLink className="waves-effect waves-light" to="#!">
                  <MDBIcon className="mr-1" />Post Requirements</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" to="#!">
                  <MDBIcon className="mr-1" />Notification</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>

                    <MDBIcon className="mr-1" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    <MDBDropdownItem >{this.state.name}</MDBDropdownItem>
                    <MDBDropdownItem onClick={() => this.props.logout()}>Log out</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

      </div>
    );
  }
}

export default NavbarPage;