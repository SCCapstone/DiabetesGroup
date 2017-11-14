import React from 'react';
import {View, Text, BackHandler, StyleSheet,} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');

export default class patientHome extends React.Component {
    static navigationOptions = {
        title: 'Home Screen',
    };

    constructor(props) {
        super(props);
    }
        render(){
            const {navigate} = this.props.navigation;
            return (
                <View style={styles.container}>
                    <Text style={styles.nText}>
                        Next Appointment:
                    </Text>
                    <Text></Text>
                    <SeafoamButton title="Input Glucose Reading"
                                   onPress={() => navigate('GInput')}/>
                    <Text></Text>

                    <SeafoamButton title="My Diet"
                                   onPress={() => navigate('PDiet')}/>
                    <Text></Text>
                    <SeafoamButton title="Medications"
                                   onPress={() => navigate('PMed')}/>
                    <Text></Text>
                </View>
            );
        }
    }





const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F1D2',

    },

    nText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 12,
    },


});