/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: SignOut

Purpose: This screen is used by all users to sign out.

Functions Used:
    N/A
---------------------------------------------------------------------------------------------------------------------------------*/
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

export default class SignOut extends Component<{}> {

    static navigationOptions = {
        title: 'Sign Out',
        header: null,
    };

    logout(){
        firebaseApp.auth().signOut().then(function(){
            console.log('Signed Out');
        });
        const {navigate} = this.props.navigation;
        navigate('User');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.input}>
                    Do you want to sign out?
                </Text>
                <SeafoamButton
                    style={styles.button}
                    title="Yes"
                    onPress = { () => this.logout()}
                />
                <Text style={{marginBottom: 20}}>
                </Text>
                <SeafoamButton
                    title="No"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Text style={{marginBottom: 20}}>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fffcf6',
    },
    input:{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        alignSelf: 'stretch',
        color: "#000000",
    },
});
