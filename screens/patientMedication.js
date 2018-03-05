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
    AppRegistry,
    DrawerLayoutAndroid
} from 'react-native';

export default class patientMedication extends Component<{}> {

    static navigationOptions = {
        title: 'Medication',
        headerStyle: {backgroundColor: "#FF6127"}
    };

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
            <ScrollView style={styles.container}>
                <MedicationLogTable>

                </MedicationLogTable>
                <SeafoamButton
                    title="Add new medication"
                    onPress = { () => navigate('MInput')}
                />
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
        backgroundColor: '#F7F1D2',
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
