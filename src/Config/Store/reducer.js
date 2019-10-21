const ALL_STATE = {
    isRegister: false,
    isSigned: false,
    isLogin: false,
    SignupErr: false,
    snackBar: 'snackbar',
    loginMessage :false,
    BloodGroups:"",
    Urgency:"",
    Hospitals:"",
    Relations:"",
    Posts:""

}
function reducer(state = ALL_STATE, action) {
    console.log(action)


    switch (action.type) {


        case "signupSucess":
            return { ...state }
            break;


        case "showSignupErr":
            state.SignupErr = action.payload
            state.snackBar = "show"
            return {
                ...state, snackBar: state.snackBar, SignupErr: state.SignupErr.concat()
            }
            break;



        case "hideSignupErr":
            state.SignupErr = ""
            state.snackBar = "snackBar"
            return {
                ...state, snackBar: state.snackBar, SignupErr: state.SignupErr.concat()
            }
            break;



        case "loginSucess" : 
        state.loginMessage = action.loginMessage
        state.snackBar = "show"
        return{
            ...state, snackBar:state.snackBar,loginMessage:state.loginMessage.concat()
        }
        break;




        case "loginFailed" : 
        state.loginMessage = action.loginMessage
        state.snackBar = "show"
        return{
            ...state, snackBar:state.snackBar,loginMessage:state.loginMessage.concat()
        }
        break;




        case "hideloginMessage" :
                state.loginMessage =""
                state.snackBar = "snackBar"
                return{
                    ...state, snackBar:state.snackBar,loginMessage:state.loginMessage.concat()
                }
         break;




        case "bloodGroups" : 
        state.BloodGroups = action.allGroups
        return{
            ...state,BloodGroups:state.BloodGroups.concat()
        }
        break;



        case "Urgency" : 
        state.Urgency = action.allUrgency
        return{
            ...state,Urgency:state.Urgency.concat()
        }
        break;



        case "Hospitals" : 
        state.Hospitals = action.Hospitals
        return{
            ...state,Hospitals:state.Hospitals.concat()
        }
        break;




        case "Relations" : 
        state.Relations = action.Relations
        return{
            ...state,Relations:state.Relations.concat()
        }
        break;


        case "posts" : 
        state.Posts = action.Posts
        return{
            ...state,Posts:state.Posts.concat()
        }
        break;

        

        default: {
            return state
        }
    }
}

export default reducer