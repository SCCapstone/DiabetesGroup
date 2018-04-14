
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';

export default class NAddPatient extends Component<{}> {

    static navigationOptions = {
        title: 'Add Patient',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign: 'center'},
        headerTintColor: "#FFFFFF",
        headerRight: (<View />)
    };

    constructor(props){
        super(props);
        console.disableYellowBox = true;
        this.state =  {pEmail: ''};
    }

    addPatient () {
        var user = firebase.auth().currentUser;

        var pRef = firebaseApp.database.ref('Patients/');
        pRef.once('value', function (snapshot) {
            snapshot.forEach((child) => {
                var pID = child.key;

                if(child.val().email === this.state.pEmail) {
                    if(child.val().Nutritionist === '' || child.val() === 'undefined') {
                        firebaseApp.database().ref('Nutritionists/' + user.uid + '/patients').push({
                            pID: pID,
                            pEmail: child.val().email,
                        });
                        firebaseApp.database().ref('Patients/' + key).set({
                            Nutritionist: user.email,
                        });
                        this.props.navigation.goBack();
                    }else {
                        alert('This patient already has a nutritionist')
                    }
                }
            })
        });
        alert('Please enter in a valid patient email.')
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
                            onSubmitEditing={() => this.passwordInput.focus()}
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