
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry
} from 'react-native';

export default class PatientSignIn extends Component<{}> {

	static navigationOptions = {title: 'Please input your login credentials',};

	render() {
		const {navigate} = this.props.navigation;
		return (
        	<View style={styles.container}>
				<Text style={styles.welcome}>
				This is where we put in the login code
				</Text>
      		</View> 	
    	);
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
	height:80,
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
