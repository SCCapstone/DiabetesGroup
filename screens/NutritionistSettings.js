import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    Picker,
    AppRegistry,
    TouchableOpacity,
} from 'react-native';

export default class NutritionistSettings extends Component<{}> {

    static navigationOptions = {
        title: 'Settings',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        this.state ={email: '', username:'', userType: '' };
        var userID = firebaseApp.auth().currentUser.uid;
        var clinicianRef = firebaseApp.database().ref('Clinician/' + userID);
        var nutritionistRef = firebaseApp.database().ref('Nutritionists/' + userID);
        //checking to see if clinician or nutritionist
        clinicianRef.on('value', (snap) =>{
            if(snap.val() != null){
                this.state.userType = 'Clinician';
                this.state.username = snap.val().userName;
                this.render();
            }
        });
        nutritionistRef.on('value', (snap) =>{
            if(snap.val() != null){
                this.state.userType = 'Nutritionist';
                this.state.username = snap.val().userName;
                this.render();
            }
        });

    }
    _submitInfo(){
        var userID = firebaseApp.auth().currentUser.uid;
        if(this.state.userType == 'Nutritionist'){
            firebaseApp.database().ref('Nutritionists/' + userID ).update({
                "userName": this.state.username
            });
            alert('Username updated to ' + this.state.username);
        }
        else if(this.state.userType == 'Clinician'){
            firebaseApp.database().ref('Clinician/' + userID ).update({
                "userName": this.state.username
            });
            alert('Username updated to ' + this.state.username);
        }

    }


    _resetPassword(){
        const {navigate} = this.props.navigation;
        var user = firebaseApp.auth().currentUser;
        var email =this.state.email;
        firebaseApp.auth().sendPasswordResetEmail(email);
        firebaseApp.auth().signOut();
        navigate('User');
    }

    render() {

        return (
            <ScrollView style={{backgroundColor: '#F7F1D2'}}>

                <View style={styles.container}>
                    <View style={styles.stretched}>
                        <Text>Username:</Text>
                        <TextInput style={styles.input} placeholder= "Enter your new username here"
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({username: text})}
                                   value = {this.state.username}
                        />
                        <SeafoamButton
                            title="Update"
                            onPress = {() => this._submitInfo()}
                        />

                        <Text>Send a Reset Password Email</Text>
                        <TextInput style={styles.input} placeholder="Re-enter your email"
                                   underlineColorAndroid={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({email: text})}
                                   value={this.state.email}
                        />

                        <SeafoamButton
                            title="Reset Password"
                            onPress = {() => this._resetPassword()}
                        />

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 55,
        paddingRight: 55,
        backgroundColor: '#F7F1D2',
    },
    submitbutton:{
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#1FC97C'
    },
    submittext:{
        fontWeight: 'bold',
    },
    stretched: {
        alignSelf: 'stretch',
        backgroundColor: '#F7F1D2',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: "#000000",
    },
    input:{
        marginBottom: 10,
        alignSelf: 'stretch',
        backgroundColor: '#FEFDF5',
        borderColor: "#000000",
        borderWidth: 1,
        padding: 10,
    },
    inputRight:{
        marginBottom: 10,
        marginLeft: 30,
        alignSelf: 'stretch',
        backgroundColor: '#FEFDF5',
        borderColor: "#000000",
        borderWidth: 1,
    },

});
