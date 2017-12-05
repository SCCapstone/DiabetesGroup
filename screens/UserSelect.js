
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
                <Text style={styles.input}>
                    AahaRX{"\n"}For{"\n"}Diabetes{"\n"}Management  
                </Text>
                    <SeafoamButton
                        style={styles.button}
                        title="Sign into a patient account"
                        onPress={() => navigate('PSign')}
                    />
                    <Text style={{marginBottom: 30}}>
                    </Text>
                    <SeafoamButton
                        title="Sign into a nutritionist account"
                        onPress={() => navigate('NSign')}
                    />
                    <Text style={{marginBottom: 30}}>
                    </Text>
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
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#F7F1D2',
},
    input:{
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        alignSelf: 'stretch',
        color: "#000000",
    },
});

