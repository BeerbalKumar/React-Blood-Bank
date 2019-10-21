import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBNav, MDBNavItem, MDBNavLink,
MDBContainer } from "mdbreact";
import {FirebaseApp} from './../../Config/Firebase/firebase'

class PanelPage extends React.Component{


  componentDidMount=()=>{
    FirebaseApp.auth().onAuthStateChanged((user)=> {
      if (user) {
        if(user.emailVerified){
          this.props.history.push("/home")
        }
        else{
          this.props.history.push("/verification")
        }
        
      } else {
        this.props.history.push("/")
      }
    });
  }

render(){

  return (
 <div>
<br/><br/><br/><br/><br/><br/><br/>
<MDBContainer >
  <MDBCard style={{backgroundColor:"brown"}} className="text-center">
    <MDBCardHeader>
      <MDBNav header>

      </MDBNav>
    </MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle style={{color:"white"}}>Welcome User</MDBCardTitle>
      <MDBCardText style={{color:"white"}}>
      Please verify your email
      </MDBCardText>
      <MDBBtn color="white" style={{color:"brown",height:50}}>Refresh your page</MDBBtn>
    </MDBCardBody>
  </MDBCard>
</MDBContainer>
 </div>


);
}
};

export default PanelPage;