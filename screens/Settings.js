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
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
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
        alert('Settings updated, please sign in again');
        navigate('User')
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
                    <Text>Gender:</Text>
                    <Picker
                        style={{marginBottom: 15}}
                        selectedValue={this.state.Sex}
                        value={this.state.Sex}
                        onValueChange={(itemValue) => this.setState({Sex: itemValue})}>
                        <Picker.Item label="Male" value="Male"/>
                        <Picker.Item label="Female" value="Female" />
                    </Picker>

                        <Text>Weight:</Text>
                        <TextInput style={styles.input} defaultValue= {this.state.Weight}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Weight: text})}
                                   value={this.state.Weight}
                        />
                    <Text>Height:</Text>
                    <Picker
                        style={{marginBottom: 15}}
                        selectedValue={this.state.Height}
                        value={this.state.Height}
                        onValueChange={(itemValue) => this.setState({Height: itemValue})}>
                        <Picker.Item label="5'0''" value="5'0''"/>
                        <Picker.Item label="5'1''" value="5'1''"/>
                        <Picker.Item label="5'2''" value="5'2''"/>
                        <Picker.Item label="5'3''" value="5'3''"/>
                        <Picker.Item label="5'4''" value="5'4''"/>
                        <Picker.Item label="5'5''" value="5'5''"/>
                        <Picker.Item label="5'6''" value="5'6''"/>
                        <Picker.Item label="5'7''" value="5'7''"/>
                        <Picker.Item label="5'8''" value="5'8''"/>
                        <Picker.Item label="5'9''" value="5'9''"/>
                        <Picker.Item label="5'10''" value="5'10''"/>
                        <Picker.Item label="5'11''" value="5'11''"/>
                        <Picker.Item label="6'0''" value="6'0''"/>
                        <Picker.Item label="6'1''" value="6'1''"/>
                        <Picker.Item label="6'2''" value="6'2''"/>
                        <Picker.Item label="6'3''" value="6'3''"/>
                        <Picker.Item label="6'4''" value="6'4''"/>
                        <Picker.Item label="6'5''" value="6'5''"/>
                        <Picker.Item label="6'6''" value="6'6''"/>
                        <Picker.Item label="6'7''" value="6'7''"/>
                    </Picker>
                    <Text>Diabetes Type:</Text>
                    <Picker
                        style={{marginBottom: 15}}
                        selectedValue={this.state.DType}
                        value={this.state.DType}
                        onValueChange={(itemValue) => this.setState({DType: itemValue})}>
                        <Picker.Item label="Type 1 Diabetes" value="Type 1 Diabetes"/>
                        <Picker.Item label="Type 2 Diabetes" value="Type 2 Diabetes" />
                        <Picker.Item label="Prediabetes" value="Prediabetes" />
                        <Picker.Item label="Gestational Diabetes" value="Gestational Diabetes" />
                    </Picker>

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
