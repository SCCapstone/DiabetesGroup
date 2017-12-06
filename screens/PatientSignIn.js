
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
    TextInput
} from 'react-native';

export default class PatientSignIn extends Component<{}> {

	static navigationOptions = {
	    title: 'Please input your login credentials',
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props){
        super(props);
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
            navigate('PHome')
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
        //after sign in, navigate to patient home screen
    }



    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        AahaRX{"\n"}For{"\n"}Diabetes{"\n"}Management
                    </Text>

                    <Text style={styles.login}>Patient Login</Text>

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
        fontSize: 16,
        backgroundColor: '#FEFDF5',
        marginBottom: 20,
        borderWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        alignSelf: 'stretch',
        color: "#000000",
    },
    login: {
        textAlign: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#000000",
    }

});
