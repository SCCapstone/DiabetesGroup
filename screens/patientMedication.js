import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
const MedicationLogTable = require('../components/MedicationLogTable');

import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    AppRegistry
} from 'react-native';

export default class patientMedication extends Component<{}> {

    static navigationOptions = {
        title: 'Medication',
        headerStyle: {backgroundColor: "#FF6127"}
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <MedicationLogTable>

                </MedicationLogTable>
                <SeafoamButton
                    title="Add new medication"
                    onPress = { () => navigate('MInput')}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        height:80,
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
});
