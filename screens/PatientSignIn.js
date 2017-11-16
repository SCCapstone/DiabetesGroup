
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

	static navigationOptions = {title: 'Please input your login credentials',};

	render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>
                        <Text style={styles.login}>Patient Login</Text>
                    </Text>
                    <TextInput
                        placeholder={"Enter Username or Email"}
                        placeholderTextColor="#000000"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={"Enter Password"}
                        placeholderTextColor="#000000"
                        secureTextEntry
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                    />

                    <SeafoamButton
                        title="LOGIN"
			onPress={() => navigate('PHome')}
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
