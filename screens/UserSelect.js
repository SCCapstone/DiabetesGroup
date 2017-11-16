
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry
} from 'react-native';

export default class UserSelect extends Component<{}> {

	static navigationOptions = {title: 'What kind of user are you?',};

	render() {
		const {navigate} = this.props.navigation;
		return (
        	<View style={styles.container}>
       			<SeafoamButton 
				title="Sign into a patient account" 
				onPress={() => navigate('PSign')}
				/>
				<SeafoamButton 
				title="Sign into a nutritionist account" 
				onPress={() => navigate('NSign')}
				/>
				<SeafoamButton 
				title="Create new user" 
				onPress={() => navigate('NewUser')} 
				/>
      		</View> 	
    	);
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
	height:80,
    //alignItems: 'center',
    backgroundColor: '#F7F1D2',
      paddingHorizontal: 20,
      padding: 20
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
