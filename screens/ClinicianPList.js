/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: ClinicianPList

Puropse: This screen is used by Clinicians to view their list of patients.

Functions Used:
    _pDataCheck(item): Checks to make sure the selected patient has finished account setup before allowing
                        the Clinician to view their information.
    deletePatient(key, pid): Allows the clinician to delete a patient from their list.
    deleteEvent(key, pid): Uses a popup to ensure deletion of that patient from the clinician's list is what the
                            clinician actually wants to do.

---------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import {Alert,View, Text, BackHandler, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight,DrawerLayoutAndroid} from 'react-native';
import firebaseApp from './FireBaseApp';
import { SwipeListView } from 'react-native-swipe-list-view';
const SeafoamButton = require('../components/SeafoamButton');
const MenuButton = require('../components/MenuButton');

export default class ClinicianPList extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Patient List',
            headerStyle: {backgroundColor: "#112471"},
            headerTitleStyle: {color: "#FFFFFF", textAlign: 'center', alignSelf: 'center', flex: 1},
            headerRight: (<View></View>),
            headerTintColor: "#FFFFFF",
            headerLeft: <MenuButton onPress = {() => params.open()}/>,
        };
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
		var user = firebaseApp.auth().currentUser;
        this.pRef = firebaseApp.database().ref('Clinician/' + user.uid + '/patients/');
        this.state = {listType: 'FlatList', userName: '', patients: []};
        super();
        this.openDrawer = this.openDrawer.bind(this);
    }

    listenForPatientIDs(pRef) {
        pRef.on('value', (snap) => {
            var pIDs = [];
            snap.forEach((child) => {
				var key = child.key;
                pIDs.push({
					lKey: key,
                    pID: child.val().pID,
                    pUserName: child.val().pUserName
                });
            });
            this.setState({patients: pIDs});
        });
    }

    componentDidMount() {
        this.listenForPatientIDs(this.pRef);
        this.props.navigation.setParams({ open: this.openDrawer });
    }

    componentWillUnmount(){
        this.pRef.off();
		this.props.navigation.setParams({ open: this.openDrawer });
    }

    openDrawer(){
        this.drawer.openDrawer();
    }

    keyExtractor = (item) => item.id;


    deleteEvent(key, pid) {
    	Alert.alert(
			'Patient Removal',
			'Are you sure you want to remove this patient?',
			[
				{text: 'Cancel'},
				{text: 'Yes', onPress: () => this.deletePatient(key, pid)},
			]
		)
    }

	deletePatient(key, pid) {
		var userID = firebaseApp.auth().currentUser.uid;
		var ref = firebaseApp.database().ref('Clinician/' + userID + '/patients/' + key);
		ref.remove();
		var patref = firebaseApp.database().ref('Patients/' + pid + '/Clinician');
		patref.remove();
		
	}

    closeRow(rowMap, item) {
        if (rowMap[item]) {
            rowMap[item].closeRow();
        }
    }

    onRowDidOpen = (item, rowMap) => {
        setTimeout(() => {
            this.closeRow(rowMap, item);
        }, 2000);
    };

    _pDataCheck(item) {
        const {navigate} = this.props.navigation;
        this.pRef.child('/Pinfo').once('value', function (snapshot) {
            if(snapshot.exists()) {
                alert("Patient hasn't finished account creation. Once they complete account initialization you can view their info.")
            }else{
                navigate("CPHome", {ID: item.pID});
            }
        });
    }

    render() {
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
                                  onPress={() => navigate('CAddP')}>
                    <Text style={styles.sideText}>Add a patient</Text>
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
                renderNavigationView={() => navigationView}
                ref = {_drawer => (this.drawer = _drawer)}>

             <SwipeListView style={styles.backGrnd}
                useFlatList={true}
                data={this.state.patients}
                keyExtractor = {this.keyExtractor}
				disableRightSwipe = {true}
                renderItem ={({item}) =>
                    <TouchableHighlight
                        onPress = {() => this._pDataCheck(item)}
                        style={styles.rowFront}
                        underlayColor={'#fffcf6'}
                    >
                        <Text style ={styles.rowText}>{item.pUserName}</Text>
                    </TouchableHighlight>
                }
                renderHiddenItem={ ({item}, {rowMap}) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={ _ => this.closeRow(rowMap, {ID: item.pID}) }>
                            <Text style={styles.backTextWhite}>Messenger</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ () => this.deleteEvent(item.lKey, item.pID) }>
                            <Text style={styles.backTextWhite}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={85}
                rightOpenValue={-75}
                onRowDidOpen={this.onRowDidOpen}
            />
            </DrawerLayoutAndroid>
        );
    }

}


const styles = StyleSheet.create({
    backTextWhite: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rowText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fffcf6',
        borderBottomColor: '#112471',
        borderBottomWidth: 1,
        paddingTop: 20,
        height: 60,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fffcf6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 85
    },
    backLeftBtnLeft: {
        backgroundColor: 'blue',
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    backGrnd: {
        backgroundColor: '#fffcf6'
    },
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
