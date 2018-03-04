import React from 'react';
import {View, Text, BackHandler, StyleSheet, ScrollView, FlatList,DrawerLayoutAndroid} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');
const GlucoseLogTable = require('../components/GlucoseLogTable');
const GlucoseGraph = require('../components/GlucoseGraph');

export default class NutritionistPHome extends React.Component {
    static navigationOptions = {
        title: 'Patient Information',
        headerStyle: {backgroundColor: "#FF6127"}
    };
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

		var userID = props.navigation.state.params.ID;
        this.apptRef = firebaseApp.database().ref('Patients/' + userID);
        this.infoRef = firebaseApp.database().ref('Patients/' + userID + '/Pinfo/');
        this.state = {nextAppt: '', Age: '', Sex: '', Weight: '', Height: '', DType: '', user: userID, Name: ''};

    }

    updateItems(apptRef, infoRef) {
        apptRef.on('value', (snapshot) => {
            var appt = snapshot.val().nextAppt;
            var name = snapshot.val().userName;
            this.setState({nextAppt: appt, Name: name});
        });
        infoRef.on('value', (snapshot) => {
            var age = snapshot.val().Age;
            var dtype = snapshot.val().DType;
            var height = snapshot.val().Height;
            var sex = snapshot.val().Sex;
            var weight = snapshot.val().Weight;
            this.setState({Age: age, Sex: sex, Weight: weight, Height: height, DType: dtype});
        });
    }

    componentDidMount() {
        this.updateItems(this.apptRef, this.infoRef);
    }

    componentWillUnmount(){
        this.apptRef.off();
        this.infoRef.off();
    }

    render(){
        const val1 = 7.6;
        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#F7F1D2'}}>
                <SeafoamButton title="Patient List Home Screen"
                               onPress={() => navigate('PList')}/>
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
                <View style={styles.container3}>
                    <MessengerButton
                        onPress={() => navigate('PHome')}/>
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
                    <Text style={styles.nameText}>
                        {this.state.Name}
                    </Text>

                    <View style={styles.textContainer} >
                        <Text style={styles.nText}>
                            <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
                                {'Sex: '}
                            </Text>
                            {this.state.Sex}
                        </Text>
                        <Text style={styles.nTextRight}>
                            <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
                                {'Age: '}
                            </Text>
                            {this.state.Age}
                        </Text>
                    </View>

                    <View style={styles.textContainer} >
                        <Text style={styles.nText}>
                            <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
                                {'Weight: '}
                            </Text>
                            {this.state.Weight}
                        </Text>
                        <Text style={styles.nTextRight}>
                            <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
                                {'Height: '}
                            </Text>
                            {this.state.Height}
                        </Text>
                    </View>

                    <Text style={styles.nText}>
                        <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
                            {'Next Appointment: '}
                        </Text>
                        {this.state.nextAppt}
                    </Text>

                    <SeafoamButton title="Patient's Diet"
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
        backgroundColor: '#F7F1D2',
    },
    container2:{
        flex:1,
        paddingBottom: 20,
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
    nameText: {
        color: '#000000',
        textAlign: 'left',
        fontSize: 38,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    nText: {
        color: '#000000',
        textAlign: 'left',
        fontSize: 16,
        padding:10,
    },
    nTextRight: {
        color: '#000000',
        textAlign: 'right',
        fontSize: 16,
        padding:10,
    },
    textContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-around',
        backgroundColor: '#F7F1D2',
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
