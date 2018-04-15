import React from 'react';
import {Alert, View, Text, StyleSheet, ScrollView, DrawerLayoutAndroid, TouchableHighlight, TouchableOpacity,} from 'react-native';
import firebaseApp from './FireBaseApp';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');
const GlucoseLogTable = require('../components/GlucoseLogTable');
const MenuButton = require('../components/MenuButton');
const GlucoseGraph = require('../components/GlucoseGraph');


export default class patientHome extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        return {
            headerStyle: {backgroundColor: "#112471"},
            headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
            headerRight: (<View></View>),
            headerTintColor: "#FFFFFF",
            headerLeft: <MenuButton onPress = {() => params.open()}/>
        };
    };

    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        var userID = firebaseApp.auth().currentUser.uid;
        this.myRef = firebaseApp.database().ref('Patients/' + userID);
        this.state = {nextAppt: '', user: userID, nutritionist: ''};
        super();
        this.openDrawer = this.openDrawer.bind(this);
    }

    updateItems(myRef) {
        myRef.on('value', (snapshot) => {
            var appt = snapshot.val().nextAppt;
            this.setState({nextAppt: appt});
        });
    }

    componentDidMount() {
        this.updateItems(this.myRef);
        this.props.navigation.setParams({ open: this.openDrawer });
    }

    componentWillUnmount(){
        this.myRef.off();
    }

    openDrawer(){
        this.drawer.openDrawer();
    }

	checkMessenger(){
        const {navigate} = this.props.navigation;
		var ref = firebaseApp.database().ref('Patients/' + this.state.user);
		console.log(this.state.user);
		ref.on('value', (snap) => {
			var nutri = snap.val().Nutritionist;
			this.setState({nutritionist: nutri});
		});
		console.log(this.state.nutritionist);
		if(typeof this.state.nutritionist !== 'undefined')
		{
			navigate('PMess');
		}
		else{
			Alert.alert('You do not have a nutritionist');
		}
	}

    render(){
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
                                  onPress={() => navigate('PDiet')}>
                    <Text style={styles.sideText}>My Diet</Text>
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
                renderNavigationView={() => navigationView}
                ref = {_drawer => (this.drawer = _drawer)}>
            <ScrollView>
                <View style={styles.messageView}>
                    <MessengerButton
                        onPress={() => this.checkMessenger()}/>
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
        marginTop: -10,
        marginBottom: -10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
