import React from 'react';
import {View, Text, BackHandler, StyleSheet, ScrollView, FlatList} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');
const GlucoseLogTable = require('../components/GlucoseLogTable');
const GlucoseGraph = require('../components/GlucoseGraph');


export default class patientHome extends React.Component {
    static navigationOptions = {
        title: 'Home Screen',
        headerStyle: {backgroundColor: "#FF6127"}
    };
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        var userID = firebaseApp.auth().currentUser.uid;
        this.myRef = firebaseApp.database().ref('Patients/' + userID);
        //this.ref = firebaseApp.database().ref('Patients/' + userID + '/logs').child('glucoseLevel');
        this.state = {nextAppt: '', glucoseLevel: ''};



    }

    updateItems(myRef) {
        myRef.on('value', (snapshot) => {
            var appt = snapshot.val().nextAppt;
            this.setState({nextAppt: appt});
        });
    }

    componentDidMount() {
        this.updateItems(this.myRef);
    }

    componentWillUnmount(){
        this.myRef.off();
    }

    render(){
        const val1 = 7.6;
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container3}>
                    <MessengerButton
                        onPress={() => navigate('PHome')}/>
                </View>

                <View style={styles.container}>
                    <GlucoseCircle title={val1 + '\nHgbA1c'}/>
                    <Text></Text>
                </View>

                <View style = {styles.container2}>
                    <GlucoseCircle title={60 + '\nFBG'}/>
                    <GlucoseCircle title={154 + '\nPpBG'}/>
                </View>

                <View style={styles.container}>
                    <Text style={styles.nText}>
                        {'Next Appointment: ' + this.state.nextAppt}
                    </Text>

                    <SeafoamButton title="Input Glucose Reading"
                                   onPress={() => navigate('GInput')}/>
                    <Text></Text>

                    <SeafoamButton title="My Diet"
                                   onPress={() => navigate('PDiet')}/>
                    <Text></Text>
                    <SeafoamButton title="Medications"
                                   onPress={() => navigate('PMed')}/>
                    <Text style={{paddingBottom: 80}}></Text>

                </View>

                <View style={styles.dataPage}>
                    <GlucoseGraph>
                    </GlucoseGraph>

                    <GlucoseLogTable>

                    </GlucoseLogTable>
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
        paddingBottom: 50,
        flexDirection: 'row',
        justifyContent:'space-around',
        backgroundColor: '#F7F1D2',
    },
    container3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#F7F1D2',
    },
    nText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 16,
        padding:15,
    },
    dataPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F7F1D2',
    },
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    row: { height: 30 },

});