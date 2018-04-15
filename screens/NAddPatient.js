
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';

export default class NAddPatient extends Component<{}> {

    static navigationOptions = {
        title: 'Add Patient',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props){
        super(props);
        console.disableYellowBox = true;
        this.state =  {pEmail: ''};
    }

    addPatient () {
		var that = this;
		var added = false;
		var alreadyTied = false;
        var user = firebaseApp.auth().currentUser;
        var pRef = firebaseApp.database().ref('Patients/');
        pRef.once('value', function (snapshot) {
            snapshot.forEach((child) => {
                var pID = child.key;
                if(child.val().email === that.state.pEmail) {
                    if(child.val().Nutritionist === '' || typeof child.val().Nutritionist == 'undefined') {
                        firebaseApp.database().ref('Nutritionists/' + user.uid + '/patients').push({
                            pID: pID,
                            pEmail: child.val().email,
                            pUserName: child.val().userName,
                        });

                        added = true;

                        firebaseApp.database().ref('Patients/' + pID).update({
                            Nutritionist: user.email,
                        });
                        that.props.navigation.goBack();
                    }else {
                        alert('This patient already has a nutritionist')
                        alreadyTied = true;
                    }
                }
            });
            if(added === false && alreadyTied === false) {
               alert('Please enter in a valid patient email.')
            }
        })
    }

    render() {
        return (
            <View style={{padding:0, paddingTop: 10, flex: 1, justifyContent: 'center', backgroundColor:'#fffcf6'}}>

                <View style={styles.container}>
                    <View style={styles.container}>

                        <Text style={styles.login}>Please Input Your Patient's email</Text>

                        <TextInput
                            placeholder={"Enter Email"}
                            placeholderTextColor="#CFCFCF"
                            keyboardType = "email-address"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            underlineColorAndroid ={'transparent'}
                            style={styles.input}
                            onChangeText={(text) => this.setState({pEmail: text})}
                            value={this.state.pEmail}
                        />

                        <SeafoamButton
                            title="Add Patient"
                            onPress = {() => this.addPatient()}
                        />

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffcf6',
        padding: 5,
        paddingTop: 1,
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        borderWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        alignSelf: 'center',
        color: "#FFFFFF",
    },
    login: {
        textAlign: 'center',
        alignSelf: 'stretch',
        fontWeight: 'bold',
        fontSize: 14,
        color: "#112471",
        paddingTop: 5
    }

});
