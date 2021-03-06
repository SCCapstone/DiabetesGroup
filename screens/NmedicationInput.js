/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: NmedicationInput

Puropse: This screen is used by Nutritionists to add medications for a patient.

Functions Used:
    _medicationValues(): Verifies input to make sure all fields were entered and pushes medication information to Firebase.

---------------------------------------------------------------------------------------------------------------------------------*/
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
    DrawerLayoutAndroid
} from 'react-native';

export default class NmedicationInput extends Component<{}> {

    static navigationOptions = {
        title: 'Medication Input',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        var userID = props.navigation.state.params.ID;
        this.state = {medicine: '', dosage: '', time:'', user: userID};
    }

    _medicationValues() {
        var time = this.state.time;
        var medicine = this.state.medicine;
        var dosage = this.state.dosage;
        var userID = this.state.user;

        if(time === "" || medicine === "" || dosage === "")
        {
            alert('Please enter a value for all fields');
        }
        else {


            firebaseApp.database().ref('Patients/' + userID + '/medications/').push({
                time: time,
                medicine: medicine,
                dosage: dosage,
            });
            this.props.navigation.goBack();
        }
    }


    render() {
        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fefbea'}}>
                <View style={{height: 50, width: 300, backgroundColor: '#112471'}}>
                    <Text style={{alignSelf: "center", fontSize: 30, color: '#FFFFFF'}}>Hello!
                    </Text>
                </View>
                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('PList')}>
                    <Text style={styles.sideText}>Home</Text>
                </TouchableOpacity>
                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('NutritionistSetting')}>
                    <Text style={styles.sideText}>Settings</Text>
                </TouchableOpacity>

                <View style={{height: 190, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('Sign')}>
                    <Text style={styles.sideText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>

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
                <SeafoamButton title="Submit Patient Medication"
                               onPress = { () => this._medicationValues()}
                />

            </View>
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 55,
        paddingRight: 55,
        backgroundColor: '#fffcf6',
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
        backgroundColor: '#ffffff',
        marginBottom: 20,
        borderWidth: 1,

    },
    title: {
        fontSize: 15,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
    },
    sideButton: {
        width: 280,
        height: 40,
        backgroundColor: '#112471',
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#000000'
    },
    sideText: {
        fontSize: 25,
        color: '#fefbea',
        alignSelf: 'center'
    },
});
