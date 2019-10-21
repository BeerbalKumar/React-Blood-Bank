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
import "./Signup.css";
import { connect } from 'react-redux'
import { Signup } from './../../Config/Store/action'
import { FirebaseApp } from './../../Config/Firebase/firebase'
import { Link } from 'react-router-dom'
import GroupList from './../../Components/Grouplist/grouplist'
import { BloodGroups } from './../../Config/Store/action'


class ClassicFormPage extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: '',
      password: '',
      bloodGroup: ''

    }
    this.textInput = React.createRef();
    this.textInput1 = React.createRef();
    this.textInput2 = React.createRef();
  }
  imageFunc = async (e) => {
    console.log(e.target.files[0])
    let imagename = e.target.files[0].name
    let ref = FirebaseApp.storage().ref('/').child("image/" + imagename)
    await ref.put(e.target.files[0])
    ref.getDownloadURL().then(url => {
      console.log(url)
      this.setState({
        file: url,

      })
    }
    )
      .catch((error) => {
        console.log(error)
      })
  }
  signupFunc = () => {
    if (this.state.fullName === "") {
      this.textInput.current.setFocus()
    }
    else if (this.state.email === "") {
      this.textInput1.current.setFocus()
    }
    else if (this.state.password === "") {
      this.textInput2.current.setFocus()
    }
    else {
      this.props.sendData(this.state, this.props.history)
    }
  }


  componentDidMount = () => {
    this.props.getBloods()
  }


  render() {
    console.log(this.state.value)
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
                          Signup
                        </h1>

                        <MDBInput
                          ref={this.textInput}
                          onChange={(e) => this.setState({ fullName: e.target.value })}

                          hint="User Name"
                          outline
                          iconClass="brown-text"

                        />
                        <GroupList onChange={(e) => this.setState({ value: e.target.value })} groups={this.props.allGroups} />

                        <MDBInput
                          ref={this.textInput1}
                          onChange={(e) => this.setState({ email: e.target.value })}
                          iconClass="brown-text"
                          hint="Email"
                          outline


                        />
                        <MDBInput
                          ref={this.textInput2}
                          onChange={(e) => this.setState({ password: e.target.value })}


                          hint="Password"
                          outline

                          type="password"
                        />
                        <div className="text-center">
                          <MDBBtn className="button" color="#201c1c" onClick={() => this.signupFunc()}>signup</MDBBtn>
                          <hr style={{ backgroundColor: "#4b7f79" }} />
                          <div className="text-center d-flex justify-content-center white-label">

                          </div>
                          <p style={{ color: "brown" }}>Already have an account <Link to="/">Login</Link></p>
                        </div>

                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
        <div id="snackbar" className={this.props.snackBar}>{this.props.signupErr}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state, 'state')
  return {
    signupErr: state.SignupErr,
    snackBar: state.snackBar,
    allGroups: state.BloodGroups
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendData: (data, path) => dispatch(Signup(data, path)),
    getBloods: () => dispatch(BloodGroups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassicFormPage);