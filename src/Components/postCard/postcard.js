import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { MDBBtn } from 'mdbreact'
import { FirebaseApp } from './../../Config/Firebase/firebase'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
  },

}));


export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);


  function addVolunter() {

    let userData = JSON.parse(localStorage.getItem("currentUser"))
    console.log(userData);
    FirebaseApp.firestore().collection("Posts").doc(props.Id).set({ volunter: userData }, { merge: true })
      .then((res) => {
        console.log(res)
      })
  }
  return (
    <center>
      <Card className={classes.card}>
        <CardHeader


          title={props.name}

        />

        <CardContent>
          <Typography variant="body2" color="brown" component="p">
            <b> {props.units} Units of {props.group} required</b><br />
            <b> At {props.location} for my {props.relation} </b><br />
            <b>Urgency: {props.urgency} </b><br />

            <h5>Additional Requirements</h5>

            <MDBBtn color="brown" onClick={() => addVolunter()}>Volunter</MDBBtn>
            <MDBBtn color="brown" onClick={() => props.path.push("/postdetail", {
              country: props.country,
              group: props.group,
              location: props.location,
              relation: props.relation,
              state: props.state,
              urgency: props.urgency,
              city: props.city,
              units: props.units,
              path: props.history,
              name:props.name
            })}>Comment</MDBBtn>
          </Typography>
        </CardContent>


      </Card>
    </center>
  );
}
