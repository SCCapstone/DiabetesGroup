/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: HomeHelp

Puropse: This screen is used by all users to help understand the information on a patient's home page.

Functions Used:
    N/A

---------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import {View, Text, StyleSheet, ScrollView, DrawerLayoutAndroid, Dimensions} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');


export default class HomeHelp extends React.Component {
    static navigationOptions = {
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF",
        title: 'Home Screen Help Page',
    };

    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        var userID = firebaseApp.auth().currentUser.uid;
        this.myRef = firebaseApp.database().ref('Patients/' + userID);
        this.state = {nextAppt: '', user: userID};
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
                <ScrollView style={{backgroundColor: '#FFFCF6'}}>
                    <View style={[styles.container, {marginLeft: 18}]}>
                        <MessengerButton/>

                        <View style={{flex: 1, marginLeft: 16, justifyContent: 'center'}}>
                            <Text style={styles.text}>
                                This Button Takes you to the messenger with you nutritionist.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.container, {marginTop: 10}]}>
                        <GlucoseCircle name={'HgbA1c'} user = {this.state.user}/>

                        <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
                            <Text style={styles.text}>
                                This circle represents your average blood sugar over an extended period of time. This number is recorded by your provider. The number is your latest A1c value.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.container, {marginTop: 10}]}>
                        <GlucoseCircle name={'FBG'} user = {this.state.user}/>

                        <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
                            <Text style={styles.text}>
                                This circle represents your fasting blood sugar average.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.container, {marginTop: 10}]}>
                        <GlucoseCircle name={'PpBG'} user = {this.state.user}/>

                        <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
                            <Text style={styles.text}>
                                This circle represents your post-prandial (post-meal) blood sugar average.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.infotainer, {marginTop: 10}]}>
                        <Text style={styles.title}> *Graph Info* </Text>
                        <Text style={styles.text}> The line graph on the home screen contains the average blood glucose levels of every day. You can slide the graph along the x-axis (by date) and you can two finger zoom along the x-axis to get a more accurate view all the way down to the average per hour. The graph will display a blank graph with the current date untill you have at least two days worth of logs.
                        </Text>
                    </View>
                </ScrollView>
            </DrawerLayoutAndroid>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#fffcf6',
        maxWidth: Dimensions.get('window').width
    },
    infotainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',
        backgroundColor: '#fffcf6',
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: '#000000'
    }

});