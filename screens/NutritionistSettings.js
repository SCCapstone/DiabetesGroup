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
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        this.state ={email: ''};

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
