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

export default class MedicationInput extends Component<{}> {

    static navigationOptions = {
        title: 'Medication Input',
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        const {navigate} = this.props.navigation;
        this.state = {medicine: '', dosage: '', time:''};
    }


    _medicationValues() {
        var time = this.state.time;
        var medicine = this.state.medicine;
        var dosage = this.state.dosage;
        var user = firebaseApp.auth().currentUser;

        if(time === "" || medicine === "" || dosage === "")
        {
            alert('Please enter a value for all fields');
        }
        else {

            firebaseApp.database().ref('Patients/' + user.uid + '/medications/').push({
                time: time,
                medicine: medicine,
                dosage: dosage,
            });
            const {navigate} = this.props.navigation;
            navigate('PMed')
        }
        }


    render() {
        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#F7F1D2'}}>
                <SeafoamButton title="My Home Screen"
                               onPress={() => navigate('PHome')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="My Diet"
                               onPress={() => navigate('PDiet')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="My Medication"
                               onPress={() => navigate('PMed')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="Settings"
                               onPress={() => navigate('Setting')}/>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="Sign Out"
                               onPress={() => navigate('Sign')}/>
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
                <SeafoamButton title="Submit"
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

