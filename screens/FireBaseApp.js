/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: FirebaseApp

Puropse: This simply holds pertinent information about our Firebase app.

Functions Used:
        N/A

---------------------------------------------------------------------------------------------------------------------------------*/
import * as firebase from 'firebase';

//Initialize Firebase
const config = {
    apiKey: "AIzaSyDq3p79SJrBCL7EPBnlcW7JRtEsFVZs2zk",
    authDomain: "proofofconcept-cf256.firebaseapp.com",
    databaseURL: "https://proofofconcept-cf256.firebaseio.com",
    projectId: "proofofconcept-cf256",
    storageBucket: "proofofconcept-cf256.appspot.com",
    messagingSenderId: "920525396793"
};

export default firebaseApp = firebase.initializeApp(config);