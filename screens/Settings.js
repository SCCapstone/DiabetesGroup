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
        var user = firebaseApp.auth().currentUser.Age;
        this.state = {Age: user.Age, Sex: user.Sex, Weight: user.Weight, Height: user.Height, DType: user.DType};
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

        firebaseApp.database().ref('Patients/' + user.uid).set({
            Age: Age,
            Sex: Sex,
            Weight: Weight,
            Height: Height,
            DType: DType,
        });

        navigate('User')
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.stretched}>

                    <Text style={styles.title}>
                        Enter your information below:
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <TextInput style={styles.input} placeholder= {this.state.Age}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Age: text})}
                                   value={this.state.Age}
                        />

                        <TextInput style={styles.inputRight} placeholder={this.state.Sex}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Sex: text})}
                                   value={this.state.Sex}

                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TextInput style={styles.input} placeholder= {this.state.Weight}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Weight: text})}
                                   value={this.state.Weight}
                        />

                        <TextInput style={styles.inputRight} placeholder= {this.state.Height}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.setState({Height: text})}
                                   value={this.state.Height}
                        />
                    </View>

                    <TextInput style={styles.input} placeholder= {this.state.DType}
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor= "#CFCFCF"
                               onChangeText={(text) => this.setState({DType: text})}
                               value={this.state.DType}
                    />

                    <SeafoamButton
                        title="Update"
                        onPress = {() => this._submitInfo()}
                    />
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
