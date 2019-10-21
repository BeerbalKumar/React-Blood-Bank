import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyAyyN9Du8Xaoa5JbxI6CuTtKqRbAJQlYK0",
  authDomain: "practiceapp-365eb.firebaseapp.com",
  databaseURL: "https://practiceapp-365eb.firebaseio.com",
  projectId: "practiceapp-365eb",
  storageBucket: "practiceapp-365eb.appspot.com",
  messagingSenderId: "807500057765",
  appId: "1:807500057765:web:80c6270cbfa8af9d0b514c",
  measurementId: "G-D0DH8YB3DR"
};
  
  var provider = new firebase.auth.FacebookAuthProvider();
  
  const providerApp = provider.setCustomParameters({'display': 'popup'})
  const FirebaseApp = firebase.initializeApp(firebaseConfig);
  export {
    FirebaseApp,
    providerApp
  }