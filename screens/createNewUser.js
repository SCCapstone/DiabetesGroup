
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  AppRegistry,
  TouchableOpacity,
} from 'react-native';

export default class createNewUser extends Component<{}> {

	static navigationOptions = {title: 'Create a new account',};

	constructor(props) {
	    super(props);
	    this.state = {email: '', password: '', userName: ''};
    }

    _signUp() {

        var email = this.state.email;
        var password = this.state.password;
		var userName = this.state.userName;

        if(email.length < 4){
            alert('Please enter an email address.');
        }
        if(password.length < 4) {
            alert('Please enter a password.');
        }

        //Sign in with email and password.
        //Creating the email
        firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            //Hendle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });

		var user = firebaseApp.auth().currentUser;
		var database = firebaseApp.database();

		firebaseApp.database().ref('users/' + user.uid).set({
			userName: userName,
			email: email,
			password: password

		});
		
        // [END createwitheamil
        const {navigate} = this.props.navigation;
        navigate('User')
    }

	render() {
		return (

        	<View style={styles.container}>
                <View style={styles.stretched}>
                    <Text style={styles.title}>
                        Enter your information below:
                    </Text>

					<TextInput style={styles.input} placeholder="Name"
                     underlineColorAndroid ={'transparent'}
                     onChangeText={(text) => this.setState({userName: text})}
                     value={this.state.userName}
                    />

                    <TextInput style={styles.input} placeholder="Email"
                     underlineColorAndroid ={'transparent'}
                     onChangeText={(text) => this.setState({email: text})}
                     value={this.state.email}
                    />

                    <TextInput style={styles.input} placeholder="Password"
                     underlineColorAndroid ={'transparent'}
                     secureTextEntry={true}
                     onChangeText={(text) => this.setState({password: text})}
                     value={this.state.password}
                    />

                    <SeafoamButton
                      title="Submit"
                      onPress = {() => this._signUp()}
                      //onPress connect values to firebase
                    />
                </View>
      		</View> 	
    	);
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
	paddingLeft: 55,
    paddingRight: 55,
    backgroundColor: '#F7F1D2',
  },
  submitbutton:{
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#1FC97C'
  },
  submittext:{
      fontWeight: 'bold',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 15,
    height: 70,
  },
  stretched: {
          alignSelf: 'stretch',
  },
  title: {
    fontSize: 20,
    marginBottom: 35,
    paddingBottom: 10,
    textAlign: 'center',

  },
  input:{
      height: 40,
      marginBottom: 30,
      alignSelf: 'stretch',
      color: "#000000",
      borderColor: "#000000",
      borderWidth: 1,

  },

});
