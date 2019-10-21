import React from 'react'
import Appbar from '../../Components/Appbar/appBar'
import {FirebaseApp} from './../../Config/Firebase/firebase'
import PostCard from './../../Components/postCard/postcard'
import {connect} from 'react-redux'
import {getPosts} from './../../Config/Store/action'
import Slider from './../..//Components/Slider/slider'

class Home extends React.Component{
  constructor(){
    super();
    this.state={
      allPosts:""
    }
  }

    

    componentDidMount=()=>{
        FirebaseApp.auth().onAuthStateChanged((user)=> {
          if (user) {
            if(user.emailVerified){
              localStorage.setItem("currentId",JSON.stringify(user.uid))
              this.props.history.push("/home")

            }
            else{
              this.props.history.push("/verification")
            }
            
          } else {
            this.props.history.push("/")
          }
        });
        this.props.getPosts();
      
      }
Logout=()=>{
FirebaseApp.auth().signOut()
.then(()=>{
  this.props.history.push("/")
})
.catch((err)=>{
  console.log(err)
})
}
    render(){
      console.log(this.props.allPosts)
        return(
           <div>
            <Appbar path={this.props.history} logout={this.Logout}/>        
            {
              this.props.allPosts&&this.props.allPosts.map((val,i)=>{
                return(
                  <PostCard 
                  country={val.country}
                  group={val.group}
                  location={val.location}
                  relation={val.relation}
                  state={val.state}
                  urgency={val.urgency}
                  city={val.city}
                  units={val.units}
                  path={this.props.history}
                  Id={val.id}
                  currentId={val.currentId}
                  name={val.userName}
                  />
                )
              })
            }
            </div>
        )
    }
}




const mapStateToProps = (state) => {

  console.log(state.Posts);
  return {
      allPosts: state.Posts,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    getPosts: () => dispatch(getPosts()),



  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
