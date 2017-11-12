
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

	render() {
		const {navigate} = this.props.navigation;
		return (

        	<View style={styles.container}>
                <View style={styles.stretched}>
                    <Text style={styles.title}>
                        Enter your information below:
                    </Text>

                    <TextInput style={styles.input} placeholder="Your name"
                     underlineColorAndroid ={'transparent'}
                     onChangeText={(text) => this.setState({text})}
                     //value={this.state.name}
                    />

                    <TextInput style={styles.input} placeholder="Username"
                     underlineColorAndroid ={'transparent'}
                     onChangeText={(text) => this.setState({text})}
                     //value={this.state.username}
                    />

                    <TextInput style={styles.input} placeholder="Password"
                     underlineColorAndroid ={'transparent'}
                     secureTextEntry={true}
                     onChangeText={(text) => this.setState({text})}
                     //value={this.state.password}
                    />

                    <TouchableOpacity style={styles.submitbutton}>
                        <Text style={styles.submittext}>
                        Submit
                        </Text>
                    </TouchableOpacity>
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
    backgroundColor: '#F5FCFF',
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
