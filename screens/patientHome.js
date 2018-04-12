import React from 'react';
import {View, Text, StyleSheet, ScrollView, DrawerLayoutAndroid, TouchableHighlight} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');
const GlucoseLogTable = require('../components/GlucoseLogTable');
const GlucoseGraph = require('../components/GlucoseGraph');


export default class patientHome extends React.Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        var userID = firebaseApp.auth().currentUser.uid;
        this.myRef = firebaseApp.database().ref('Patients/' + userID);
        this.state = {nextAppt: '', user: userID};
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
        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fefbea'}}>
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
            <ScrollView>
<<<<<<< HEAD
                <View style={styles.container3}>
                    <MessengerButton
                        onPress={() => navigate('PMess')}/>
=======
                <View style={styles.topContainer}>
                    <View style={styles.helpView}>
                        <TouchableHighlight
                            onPress={() => navigate('HHelp')}>
                            <Text style={styles.helpText}>Need Help?</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.messageView}>
                        <MessengerButton
                            onPress={() => navigate('PHome')}/>
                    </View>
>>>>>>> master
                </View>

                <View style={styles.container}>
                    <GlucoseCircle name={'HgbA1c'} user = {this.state.user}/>
                    <Text></Text>
                </View>

                <View style = {styles.container2}>
                    <GlucoseCircle name={'FBG'} user = {this.state.user}/>
                    <GlucoseCircle name={'PpBG'} user = {this.state.user}/>
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
                    <GlucoseGraph user = {this.state.user}>
                    </GlucoseGraph>

                    <GlucoseLogTable user = {this.state.user}>

                    </GlucoseLogTable>
                </View>
            </ScrollView>
            </DrawerLayoutAndroid>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffcf6',
    },
    container2:{
        flex:1,
        paddingBottom: 50,
        flexDirection: 'row',
        justifyContent:'space-around',
        backgroundColor: '#fffcf6',
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fffcf6',
    },
    messageView: {
        flex: 1,
        marginRight: 5,
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#fffcf6',
    },
    helpView: {
        flex: 1,
        marginLeft: 5,
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#fffcf6',
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
        backgroundColor: '#fffcf6',
    },
    helpText: {
        textAlign:'center',
        color:'#0000EE',
        textDecorationLine: 'underline',
        fontSize: 16
    },
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    row: { height: 30 },

});
