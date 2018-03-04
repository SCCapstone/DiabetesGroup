
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
  Picker,
  AppRegistry,
  TouchableOpacity,
} from 'react-native';

export default class createNewUser extends Component<{}> {

	static navigationOptions = {
	    title: 'New Account',
        headerStyle: {backgroundColor: "#FF6127"}
    };

	constructor(props) {
	    super(props);
	    this.state = {email: '', password: '', userName: '', userType: '', Age: ''};
    }

    _signUp() {
        const {navigate} = this.props.navigation;

        var email = this.state.email;
        var password = this.state.password;
		var userName = this.state.userName;
        var userType = this.state.userType;


        if(email.length < 4){
            alert('Please enter an email address.');
        }
        if(password.length < 4) {
            alert('Please enter a password.');
        }

        //Sign in with email and password.
        //Creating the email
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
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
            })
            .then(function (user) {
                if(userType === "Nutritionist")
                {
                    firebaseApp.database().ref('Nutritionists/' + user.uid).set({
                        userName: userName,
                        email: email,
                        password: password
                    });
                    navigate('User')
                }
                else if(userType === "Patient")
                {
                    //added this random num line to generate a random age for the patient since the patient info screen isn't fully implemented yet.
                    //var Age = Math.floor((Math.random() * 99));
                    firebaseApp.database().ref('Patients/' + user.uid).set({
                        userName: userName,
                        email: email,
                        password: password,
                        nextAppt: "05/18/18, 12:20 PM",
                        nSuggestions: "Nutritionist suggestions pull here!",
                    });
                    navigate('NewPatient')
                }
                else
                {
                    alert('Please select a user type!')
                }
            });
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
                     placeholderTextColor= "#CFCFCF"
                     onChangeText={(text) => this.setState({userName: text})}
                     value={this.state.userName}
                    />

                    <TextInput style={styles.input} placeholder="Email"
                     underlineColorAndroid ={'transparent'}
                     placeholderTextColor= "#CFCFCF"
                     onChangeText={(text) => this.setState({email: text})}
                     value={this.state.email}
                    />

                    <TextInput style={styles.input} placeholder="Password"
                     underlineColorAndroid ={'transparent'}
                     placeholderTextColor= "#CFCFCF"
                     secureTextEntry={true}
                     onChangeText={(text) => this.setState({password: text})}
                     value={this.state.password}
                    />
                    <Picker
                        style={{marginBottom: 15}}
                        selectedValue={this.state.userType}
                        onValueChange={(itemValue) => this.setState({userType: itemValue})}>
                        <Picker.Item label="User Type" value="User Type"/>
                        <Picker.Item label="Nutritionist" value="Nutritionist" />
                        <Picker.Item label="Patient" value="Patient" />
                    </Picker>
                    <SeafoamButton
                      title="Submit"
                      onPress = {() => this._signUp()}
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
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#1FC97C'
  },
  submittext:{
      fontWeight: 'bold',
  },
  stretched: {
          alignSelf: 'stretch',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: "#000000",
  },
  input:{
      marginBottom: 10,
      alignSelf: 'stretch',
      backgroundColor: '#FEFDF5',
      borderColor: "#000000",
      borderWidth: 1,
  },

});
