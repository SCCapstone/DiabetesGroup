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
    AppRegistry,
    TouchableOpacity,
    ScrollView,
    Picker,
} from 'react-native';

export default class CmedicationInput extends Component<{}> {

    static navigationOptions = {
        title: 'Medication Input',
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        var userID = props.navigation.state.params.ID;
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/medications/');
        this.state = { medications: [], medicine: '', dosage: '', time: '', user: userID,};
    }


    _medicationValues() {
        var time = this.state.time;
        var medicine = this.state.medicine;
        var dosage = this.state.dosage;
        var userID = this.state.user;


        firebaseApp.database().ref('Patients/' + userID + '/medications/').push({
            time: time,
            medicine: medicine,
            dosage: dosage,
        });
        const {navigate} = this.props.navigation;
        navigate("CPMed" , {ID: this.state.user})
    }


    render() {
        return (

            <View style={styles.container}>
                <View style={styles.stretched}>
                    <Text style={styles.title}>
                        Enter the following fields:
                    </Text>

                    <TextInput style={styles.input} placeholder="Medicine"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#CFCFCF"
                               onChangeText={(text) => this.setState({medicine: text})}
                               value={this.state.medicine}
                    />

                    <TextInput style={styles.input} placeholder="Dosage"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#CFCFCF"
                               onChangeText={(text) => this.setState({dosage: text})}
                               value={this.state.dosage}
                    />

                    <TextInput style={styles.input} placeholder="Dosage Rate"
                               underlineColorAndroid ={'transparent'}
                               placeholderTextColor="#CFCFCF"
                               onChangeText={(text) => this.setState({time: text})}
                               value={this.state.time}
                    />



                </View>
                <SeafoamButton title="Submit Medication for Patient"
                               onPress = { () => this._medicationValues()}
                />

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

    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stretched: {
        alignSelf: 'stretch',
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 10,
        marginTop: -20,
    },
    input:{
        fontSize: 16,
        backgroundColor: '#FEFDF5',
        marginBottom: 20,
        borderWidth: 1,

    },
    title: {
        fontSize: 15,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
    }
});