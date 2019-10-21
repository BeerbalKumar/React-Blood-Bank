import React, { Component } from 'react';

class SelectPage extends Component {

  render () {
   
    return(
     <select className="browser-default custom-select" onChange={this.props.onChange}>  
         {   
              this.props.groups&&this.props.groups.map((val,i)=>{
               return(
                    <option value={val.blood}>{val.blood}</option>
                  
                  )
              })
            }
            </select>
            );
  }
}

export default SelectPage;