import React from 'react';
import {View, Text, BackHandler, StyleSheet, ScrollView, FlatList,DrawerLayoutAndroid,TouchableOpacity,rr} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');
const GlucoseLogTable = require('../components/GlucoseLogTable');
const GlucoseGraph = require('../components/GlucoseGraph');

export default class ClinicianPHome extends React.Component {
    static navigationOptions = {
        title: 'Patient Information',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
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
            <View style={{flex: 1, backgroundColor: '#fefbea'}}>
                <View style={{height: 50, width: 300, backgroundColor: '#112471'}}>
                    <Text style={{alignSelf: "center", fontSize: 30, color: '#FFFFFF'}}>Hello!
                    </Text>
                </View>
                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('CPList')}>
                    <Text style={styles.sideText}>Home</Text>
                </TouchableOpacity>

                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('NutritionistSetting')}>
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

            <ScrollView style = {{backgroundColor: '#fffcf6' }}>

				
                <View style={[styles.container, {marginTop: 50}]}>
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
                                   onPress={() => navigate("CPDiet", {ID: this.state.user})}/>
                    <Text></Text>
                    <SeafoamButton title="Medications"
                                   onPress={() => navigate("CPMed", {ID: this.state.user})}/>
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
    container3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#fffcf6',
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
        backgroundColor: '#fffcf6',
    },
    dataPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fffcf6',
    },
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    row: { height: 30 },

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
