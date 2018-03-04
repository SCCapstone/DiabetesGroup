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

export default class Settings extends Component<{}> {

    static navigationOptions = {
        title: 'Settings',
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        this.state = {Age: '', Sex: '', Weight: '', Height: '', DType: '', email: ''};

        var userID = firebaseApp.auth().currentUser.uid;
        var userRef = firebaseApp.database().ref('Patients/' + userID + '/Pinfo/');
        userRef.once('value', (snapshot) => {
            this.state ={Age: snapshot.val().Age, Sex: snapshot.val().Sex, Weight: snapshot.val().Weight,
                Height: snapshot.val().Height, DType: snapshot.val().DType, email: ''};
        });
    }

    _resetPassword(){
        const {navigate} = this.props.navigation;
        var user = firebaseApp.auth().currentUser;
        var email =this.state.email;
        firebaseApp.auth().sendPasswordResetEmail(email);
        firebaseApp.auth().signOut();
        navigate('User');

    }

    _submitInfo() {
        const {navigate} = this.props.navigation;

        var Age = this.state.Age;
        var Sex = this.state.Sex;
        var Weight = this.state.Weight;
        var Height = this.state.Height;
        var DType = this.state.DType;

        var user = firebaseApp.auth().currentUser;
        var database = firebaseApp.database();

        firebaseApp.database().ref('Patients/' + user.uid + '/Pinfo/').set({
            Age: Age,
            Sex: Sex,
            Weight: Weight,
            Height: Height,
            DType: DType,
        });

        //navigate('User')
    }

    render() {

        return (
            <ScrollView>

            <View style={styles.container}>
                <View style={styles.stretched}>
                    <Text style={styles.title}>
                        Change Your Information:
                    </Text>
                        <Text>Age:</Text>
                        <TextInput style={styles.input} defaultValue= {this.state.Age}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Age: text})}
                                   value={this.state.Age}
                        />
                        <Text>Sex:</Text>
                        <TextInput style={styles.input} defaultValue={this.state.Sex}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Sex: text})}
                                   value={this.state.Sex}

                        />

                        <Text>Weight:</Text>
                        <TextInput style={styles.input} defaultValue= {this.state.Weight}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Weight: text})}
                                   value={this.state.Weight}
                        />
                        <Text>Height:</Text>
                        <TextInput style={styles.input} defaultValue= {this.state.Height}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Height: text})}
                                   value={this.state.Height}
                        />

                    <Text>Diabetes Type:</Text>
                    <TextInput style={styles.input} defaultValue= {this.state.DType}
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor= "#CFCFCF"
                               onChangeText={(text) => this.setState({DType: text})}
                               value={this.state.DType}
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
