import React from 'react';
import {View, Text, BackHandler, StyleSheet, ScrollView} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');

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
                <ScrollView>
                <View style={styles.container}>
                    <GlucoseCircle title={'7.6' + ' HgbA1c'}/>
                    <Text></Text>

                    <View style = {styles.container2}>
                    <GlucoseCircle title={'60' + ' FBG'}/>
                    <Text></Text>
                    <GlucoseCircle title={'150' + ' PpBG'}/>
                    <Text></Text>
                    </View>

                    <Text style={styles.nText}>
                        Next Appointment: 11/16/2017 -- 10:30
                    </Text>

                    <SeafoamButton title="Input Glucose Reading"
                                   onPress={() => navigate('GInput')}/>
                    <Text></Text>

                    <SeafoamButton title="My Diet"
                                   onPress={() => navigate('PDiet')}/>
                    <Text></Text>
                    <SeafoamButton title="Medications"
                                   onPress={() => navigate('PMed')}/>
                    <Text></Text>

                    <Text style={{fontSize:26}}>
                        SCROLLVIEW WORKS!!!
                        TODO: graph, chart, messenger button

                    </Text>

                    <MessengerButton
                        onPress={() => navigate('PHome')}/>

                    <Text></Text>
                </View>
                </ScrollView>
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
     container2:{
            flex:1,
            flexDirection: 'row',
            justifyContent:'space-between',
     },

    nText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 12,
        padding:15,
    },

});