import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    DrawerLayoutAndroid
} from 'react-native';

export default class MedicationEdit extends Component<{}> {

    static navigationOptions = {
        title: 'Medication Edit',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        this.key = props.navigation.state.params.mKey;
        var medicine = props.navigation.state.params.medicine;
        var dosage = props.navigation.state.params.dosage;
        var mTime = props.navigation.state.params.mTime;
        this.state = {medicine: medicine, dosage: dosage, mTime: mTime};
    }


    _medicationValues() {
        var mTime = this.state.mTime;
        var medicine = this.state.medicine;
        var dosage = this.state.dosage;
        var user = firebaseApp.auth().currentUser;

        if(mTime === "" || medicine === "" || dosage === "")
        {
            alert('Please enter a value for all fields');
        }
        else {

            firebaseApp.database().ref('Patients/' + user.uid + '/medications/' + this.key).update({
                time: mTime,
                medicine: medicine,
                dosage: dosage,
            }, this.onComplete());
        }
    }

    onComplete(){
        this.props.navigation.goBack();
    }

    render() {
        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fefbea'}}>
                <View style={{height: 50, width: 300, backgroundColor: '#112471'}}>
                    <Text style={{alignSelf: "center", fontSize: 30, color: '#FFFFFF'}}>Hello Patient!
                    </Text>
                </View>
                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('PHome')}>
                    <Text style={styles.sideText}>Home</Text>
                </TouchableOpacity>

                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('PMed')}>
                    <Text style={styles.sideText}>My Medication</Text>
                </TouchableOpacity>

                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('Setting')}>
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
                            Update the following fields:
                        </Text>

                        <TextInput style={styles.input} placeholder={this.state.medicine}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor="#000"
                                   onChangeText={(text) => this.setState({medicine: text})}
                                   value={this.state.medicine}
                        />

                        <TextInput style={styles.input} placeholder={this.state.dosage}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor="#000"
                                   onChangeText={(text) => this.setState({dosage: text})}
                                   value={this.state.dosage}
                        />

                        <TextInput style={styles.input} placeholder={this.state.mTime}
                                   underlineColorAndroid ={'transparent'}
                                   placeholderTextColor="#000"
                                   onChangeText={(text) => this.setState({mTime: text})}
                                   value={this.state.mTime}
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
        backgroundColor: '#FFFFFF',
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
