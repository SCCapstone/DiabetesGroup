
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
    TextInput
} from 'react-native';

export default class NutritionistSignIn extends Component<{}> {

	static navigationOptions = {title: 'Please input your login credentials',};

	constructor(props){
	    super(props);
	    this.state =  {email: '', password: ''};
    }

    _signIn(){
	    var email = this.state.email;
	    var password = this.state.password;
        const {navigate} = this.props.navigation;

	    if(email.length < 4){
	        alert('Please enter a valid email address.');
        }
        if(password.length < 4){
	        alert('Please enter a valid password');
        }
        //Log in user if correct credentials are entered
        firebaseApp.auth().signInWithEmailAndPassword(email,password)
            .then(function(user){
            navigate('PList')
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode === 'auth/user-not-found') {
                alert('User not found.');
            }
            else if(errorCode === 'auth/wrong-password') {
                alert('Wrong Password.');
            }
            else if(errorCode === 'auth/invalid-email') {
                alert('Invalid Email.');
            }
            else{
                alert(errorMessage);
            }
            console.log(error);
        });
        
    }


	render() {
		const {navigate} = this.props.navigation;
		return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>
                        <Text style={styles.login}>Nutritionist Login</Text>
                    </Text>
                    <TextInput
                        placeholder={"Enter Username or Email"}
                        placeholderTextColor="#000000"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        style={styles.input}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                    />
                    <TextInput
                        placeholder={"Enter Password"}
                        placeholderTextColor="#000000"
                        secureTextEntry
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F1D2',
        padding: 20,
        justifyContent: 'center'
    },
    input: {
        height: 55,
        fontSize: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        marginBottom: 20,
        color: '#000000',
        paddingHorizontal: 20
    },

    login: {
        fontWeight: 'bold',
        fontSize: 20
    }

});
