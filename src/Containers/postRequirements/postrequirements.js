import React from "react";
import {
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from "mdbreact";
import { connect } from 'react-redux'
import { BloodGroups, getUrgency, getHospital, getRelation, addPost } from './../../Config/Store/action'
import AppBar from './../../Components/Appbar/appBar'

class PostRequirements extends React.Component {
    constructor() {
        super();
        this.state = {
            group: "",
            urgency: "",
            location: "",
            relation: "",
            state: "",
            country: "",
            city: "",
            units: "",
            phone: "",
            volunter: []
        }
    }

    createPost = () => {
        this.props.addPost(this.state)
    }

    componentDidMount = () => {
        this.props.getBloods()
        this.props.getUrgency()
        this.props.getHospital()
        this.props.getRelation()
        if (JSON.parse(localStorage.getItem("currentId"))) {
            this.setState({
                currentId: JSON.parse(localStorage.getItem("currentId")),
                userName: JSON.parse(localStorage.getItem("currentUser")).name
            })
        }
    }
    render() {
        console.log(this.state)
        return (
            <div id="classicformpage">

                <AppBar path={this.props.history} />

                <br />
                <MDBContainer>
                    <MDBRow center>


                        <MDBCol md="6" xl="5" className="mb-4">
                            <MDBCard style={{ backgroungColor: "brown !important" }}>
                                <MDBCardBody className="white-text">
                                    <h1 className="text-center" style={{ color: "brown" }} >
                                        Add Post
   </h1>
                                    <select className="browser-default custom-select" onChange={(e) => this.setState({ group: e.target.value })}>
                                        <option>Select your blood group</option>
                                        {
                                            this.props.allGroups && this.props.allGroups.map((val, i) => {
                                                return (
                                                    <option value={val.blood}>{val.blood}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <MDBInput
                                        onChange={(e) => this.setState({ units: e.target.value })}
                                        hint="No: of units required"
                                        outline
                                    />

                                    <select className="browser-default custom-select" onChange={(e) => this.setState({ urgency: e.target.value })}>
                                        <option>Urgency</option>
                                        {
                                            this.props.allUrgency && this.props.allUrgency.map((val, i) => {
                                                return (
                                                    <option value={val.urgency}>{val.urgency}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br /><br />
                                    <select className="browser-default custom-select" onChange={(e) => this.setState({ country: e.target.value })}>
                                        <option>Country</option>
                                        <option>Pakistan</option>
                                        <option>USA</option>
                                        <option>New Zeland</option>
                                    </select>
                                    <br /><br />
                                    <select className="browser-default custom-select" onChange={(e) => this.setState({ state: e.target.value })}>
                                        <option>State</option>
                                        <option>Sindh</option>
                                        <option>Punjab</option>
                                        <option>Balochistan</option>
                                        <option>KPK</option>
                                    </select>
                                    <br /><br />
                                    <select className="browser-default custom-select" onChange={(e) => this.setState({ location: e.target.value })}>
                                        <option>Select your Location</option>
                                        {
                                            this.props.allHospitals && this.props.allHospitals.map((val, i) => {
                                                return (
                                                    <option value={val.hospital}>{val.hospital}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br /><br />
                                    <select className="browser-default custom-select" onChange={(e) => this.setState({ relation: e.target.value })}>
                                        <option>Relationship with patient</option>
                                        {
                                            this.props.allRelations && this.props.allRelations.map((val, i) => {
                                                return (
                                                    <option value={val.relation}>{val.relation}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br />
                                    <MDBInput
                                        onChange={(e) => this.setState({ phone: e.target.value })}
                                        type="number"
                                        hint="Contact Number"
                                        outline
                                    />


                                    <MDBInput
                                        onChange={(e) => this.setState({ city: e.target.value })}
                                        type="text"
                                        hint="City name"
                                        outline
                                    />


                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        placeholder="Adiitional information"
                                    />
                                    <div className="text-center">

                                        <MDBBtn color="brown" onClick={() => this.createPost()}>
                                            Submit
 </MDBBtn>
                                    </div>

                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>


                <div id="snackbar" className={this.props.snackBar}>{this.props.signupErr}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state, 'state')
    return {
        allUrgency: state.Urgency,
        allGroups: state.BloodGroups,
        allHospitals: state.Hospitals,
        allRelations: state.Relations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        getBloods: () => dispatch(BloodGroups()),
        getUrgency: () => dispatch(getUrgency()),
        getHospital: () => dispatch(getHospital()),
        getRelation: () => dispatch(getRelation()),
        addPost: (data) => dispatch(addPost(data))


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRequirements);