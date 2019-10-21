
import {FirebaseApp, providerApp} from './../Firebase/firebase'






//******************************Signup***************************** */
function Signup(data,path) {
    console.log(data)
    return (dispatch) => {

        FirebaseApp.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                 console.log(res.user.emailVerified);
                 res.user.sendEmailVerification()
                 .then(()=>{
                     console.log("email has gone");
                     FirebaseApp.firestore().collection("users").doc(res.user.uid).set(data)
                     .then((res) => {
                         console.log(res)
                         dispatch({
                             type: "signupSucess",
 
                         })
                         path.push("/")
                     })
                     .catch((err) => {
                         console.log(err)
                         dispatch({ type: "showSignupErr", payload: err.message });
                         setTimeout(() => { dispatch({ type: "hideSignupErr" }) }, 3000)
                     })
                 })
                 .catch((err)=>{
                     console.log(err)
                 })

            })
            .catch((err) => {
                dispatch({ type: "showSignupErr", payload: err.message });
                setTimeout(() => { dispatch({ type: "hideSignupErr" }) }, 3000)
            })
    }

}








//******************************Login***************************** */
function Login(data,path){
    return(dispatch)=>{
        FirebaseApp.auth().signInWithEmailAndPassword(data.email,data.password)
        .then((res)=>{
            console.log(res);
            if(res.user.emailVerified===false){
                path.push("/emailverified");
            }
            else{
                path.push("/home")
                dispatch({type:"loginSucess",loginMessage:"login Sucessfully"})
                setTimeout(() => { dispatch({ type: "hideloginMessage" }) }, 3000)
            }
           
        })
        .catch((err)=>{
            console.log(err);
            dispatch({type:"loginFailed",loginMessage:err.message})
            setTimeout(() => { dispatch({ type: "hideloginMessage" }) }, 3000)
        })
    }
}










//******************************Login With Facebook***************************** */
function loginWithFacebook(){
    return async(dispatch)=>{

        await FirebaseApp.auth().signInWithPopup(providerApp)
        .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
}


function BloodGroups(){
    return async(dispatch)=>{
await FirebaseApp.firestore().collection("BloodGroups").get().then((bloodgroups)=>{
    var allGroups=[]
    bloodgroups.forEach((Groups)=>{
        console.log(Groups.data())
         allGroups.push(Groups.data())
       dispatch({type:"bloodGroups",allGroups})
    })
})
.catch((err)=>{
    console.log(err)
    })
}
}



function getUrgency(){
    
    return async(dispatch)=>{
        await FirebaseApp.firestore().collection("Urgency").get().then((urgency)=>{
            var allUrgency=[]
            urgency.forEach((urgencies)=>{
                console.log(urgencies.data())
                 allUrgency.push(urgencies.data())
               dispatch({type:"Urgency",allUrgency})
            })
        })
        .catch((err)=>{
            console.log(err)
            })
        }      
}


function getHospital(){
    return async(dispatch)=>{
        await FirebaseApp.firestore().collection("Hospital").get().then((hospital)=>{
            var Hospitals=[]
            hospital.forEach((hospitals)=>{
                console.log(hospitals.data())
                Hospitals.push(hospitals.data())
               dispatch({type:"Hospitals",Hospitals})
            })
        })
        .catch((err)=>{
            console.log(err)
            })
        } 
}



function getRelation(){
    return async(dispatch)=>{
        await FirebaseApp.firestore().collection("Relation").get().then((relation)=>{
            var Relations=[]
            relation.forEach((relations)=>{
                
                Relations.push(relations.data())
               dispatch({type:"Relations",Relations})
            })
        })
        .catch((err)=>{
            console.log(err)
            })
        } 
}



//******************************Add Posts***************************** */

function addPost(data){
    
    return dispatch=>{
        FirebaseApp.firestore().collection("Posts").add(data)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
  console.log(data)
    }
}

//******************************Get Posts***************************** */

function getPosts(){
    let currentUser =JSON.parse(localStorage.getItem("currentId"))
    console.log(currentUser)
    return dispatch=>{
    FirebaseApp.firestore().collection("Posts").get()
    .then((posts)=>{
        let Posts=[]
       posts.forEach((Post)=>{
      
           let postData = Post.data();
           postData.id = Post.id
           Posts.push(postData)
           dispatch({type:"posts",Posts})
        
       })
       
    })
    .catch((err)=>{
        console.log(err)
    })

}
}

export {
    Signup,
    Login,
    loginWithFacebook,
    BloodGroups,
    getUrgency,
    getHospital,
    getRelation,
    addPost,
    getPosts
}