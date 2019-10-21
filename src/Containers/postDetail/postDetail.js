import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { FirebaseApp } from './../../Config/Firebase/firebase'
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { MDBBtn, MDBInput } from 'mdbreact'
import AppBar from './../../Components/Appbar/appBar'





export default function RecipeReviewCard(props) {

  //  const Logout=()=>{
  //     FirebaseApp.auth().signOut()
  //     .then(()=>{
  //       this.props.history.push("/")
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })
  //     }



  console.log(props.location.state)

  return (
    <div>
      <AppBar path={props.history} />
      <br /><br /><br />
      <center>
        <Card style={{ color: "blue !important", backgroundColor: "white", maxWidth: 700 }}>
          <CardHeader


          title={props.location.state.name}

          />

          <CardContent>
            <Typography style={{ color: "brown" }} >
              <h5><b>Units   :   </b>{props.location.state.units} Units of {props.location.state.group} required</h5>
              <h5><b>Location  : </b> At {props.location.state.location} for my {props.location.state.relation} </h5>
              <h5><b>Urgency: </b>{props.location.state.urgency}</h5> <br />


            </Typography >

            <MDBInput hint="Comment...." /><MDBBtn color="brown">Comment</MDBBtn>
          </CardContent>


        </Card>
      </center>
    </div>
  );
}
