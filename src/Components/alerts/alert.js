import React from "react";
import { MDBContainer, MDBAlert } from 'mdbreact';

const AlertPage = (props) => {
  return (
    <MDBContainer >
     {
         props.children
     }
    </MDBContainer>
  );
};

export default AlertPage;