import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
const MedicationLogTable = require('../components/MedicationLogTable');
const AddToGraph = require('../components/AddToGraph');

import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    AppRegistry,
    DrawerLayoutAndroid,
    TouchableOpacity,
} from 'react-native';

export default class patientMedication extends Component<{}> {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Medications',
            headerStyle: {backgroundColor: "#112471"},
            headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
            headerTintColor: "#FFFFFF",
        };
    };

    constructor(props) {
        super(props);
        var userID = props.navigation.state.params.ID;
        this.state = {user: userID};
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
            <ScrollView style={styles.container}>
                <MedicationLogTable user = {this.state.user}>
                </MedicationLogTable>
            </ScrollView>
</DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        flexDirection: 'column',
        backgroundColor: '#fff9ea',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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
