import React from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBAnimation,
} from "mdbreact";
import "./login.css";
import { connect } from 'react-redux'
import { Login, loginWithFacebook } from './../../Config/Store/action'
import { FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { FirebaseApp } from './../../Config/Firebase/firebase'

class ClassicFormPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      className: "snackBar",
      message: ""
    }
    this.textInput1 = React.createRef()
    this.textInput2 = React.createRef()
  }



  LoginFunc = () => {
    if (this.state.email === "") {
      this.setState({ className: "show", message: "❌❌email is required" })
      this.textInput1.current.setFocus();
    }


    else if (this.state.password === "") {
      this.setState({ className: "show", message: "❌❌password is required" })
      this.textInput2.current.setFocus()
    }



    else {
      this.props.sendData(this.state, this.props.history)
    }



    setTimeout(() => {
      this.setState({ className: "snackBar", message: "" })
    }, 2000)
  }




  componentDidMount = () => {
    FirebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {

        if (user.emailVerified) {
          this.props.history.push("/home")
        }

        else {
          this.props.history.push("/verification")
        }

      }

      else {
        this.props.history.push("/")
      }

    });
  }


  render() {

    return (
      <div id="classicformpage">


        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow center>


                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="zoomIn" delay=".6s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">

                        <h1 className="text-center" style={{ color: "brown" }} >
                          Login
                        </h1>
                        <MDBInput
                          ref={this.textInput1}
                          onChange={(e) => this.setState({ email: e.target.value })}
                          hint="Email"
                          outline="black"
                        />
                        <MDBInput
                          ref={this.textInput2}
                          onChange={(e) => this.setState({ password: e.target.value })}
                          hint="Password"
                          outline
                          type="password"
                        />
                        <div className="text-center">
                          <MDBBtn className="button" color="#201c1c" onClick={() => this.LoginFunc()}>LOgin</MDBBtn>
                          <hr style={{ backgroundColor: "#4b7f79" }} />

                          <div className="text-center d-flex justify-content-center white-label">


                          </div>
                          <p style={{ color: "brown" }}>Not have an account <Link to="/signup">Signup</Link></p>
                        </div>

                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <div id="snackbar" className={this.state.className}>{this.state.message}</div>
        <div id="snackbar" className={this.props.snackBar}>{this.props.LoginMessage}</div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state, 'state')
  return {
    ...state,
    LoginMessage: state.loginMessage,
    snackBar: state.snackBar
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    sendData: (data, path) => dispatch(Login(data, path)),
    loginWithFacebook: () => dispatch(loginWithFacebook())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassicFormPage);