
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
    KeyboardAvoidingView
} from 'react-native';

export default class PatientSignIn extends Component<{}> {

	static navigationOptions = {
	    title: 'Patient Login',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props){
        super(props);
        console.disableYellowBox = true;
        this.state =  {email: '', password: ''};
    }

    _signIn() {
        var email = this.state.email;
        var password = this.state.password;
        const {navigate} = this.props.navigation;
        if (email.length < 4) {
            alert('Please enter a valid email address.');
        }
        if (password.length < 4) {
            alert('Please enter a valid password');
        }
    //Log in user if correct credentials are entered
        firebaseApp.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        //Checking whether the user that signed in is the correct user type
            var userRef =  firebaseApp.database().ref('Patients/' + user.uid);
            userRef.once('value', function (snapshot) {
                if(snapshot.exists()) {
                //checking to see if the patient entered in their info or not. This is to make sure the the info exists in the database, if not- then it will take the user to the new info screen.
                    userRef.child('/Pinfo').once('value', function (snapshot) {
                        if(snapshot.exists()) {
                            navigate('PHome')
                        }else{
                            alert('Missing some info from your account creation');
                            navigate('NewPatient')
                        }
                    });
                }else{
                    alert("You're not an authorized Patient. Please sign in using a Patient account.");
                    firebaseApp.auth().signOut().then(function(){
                        console.log('Signed Out');
                    });
                }
            });
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                alert('User not found.');
            }
            else if (errorCode === 'auth/wrong-password') {
                alert('Wrong Password.');
            }
            else if (errorCode === 'auth/invalid-email') {
                alert('Invalid Email.');
            }
            else {
                alert(errorMessage);
            }
            console.log(error);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{padding:0, paddingTop: 10, flex: 1, justifyContent: 'center', backgroundColor:'#fffcf6'}}>
                <Image
                    style={{width: 360, height: 100, alignSelf: 'center'}}

                    source = {require('../components/homeLogo.png')}
                />

                <View style={styles.container}>
                    <View style={styles.container}>

                        <Text style={styles.login}>Please Input Your Login Credentials</Text>

                        <TextInput
                            placeholder={"Enter Email"}
                            placeholderTextColor="#CFCFCF"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType = "email-address"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            underlineColorAndroid ={'transparent'}
                            style={styles.input}
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                        />
                        <TextInput
                            placeholder={"Enter Password"}
                            placeholderTextColor= "#CFCFCF"
                            secureTextEntry
                            underlineColorAndroid ={'transparent'}
                            style={styles.input}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                        />

                        <SeafoamButton
                            title="LOGIN"
                            onPress = {() => this._signIn()}
                        />

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffcf6',
        padding: 5,
        paddingTop: 1,
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        borderWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        alignSelf: 'center',
        color: "#FFFFFF",
    },
    login: {
        textAlign: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#112471",
        paddingTop: 5
    }

});
