import React from 'react';
import {View, Text, BackHandler, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight,DrawerLayoutAndroid} from 'react-native';
import firebaseApp from './FireBaseApp';
import { SwipeListView } from 'react-native-swipe-list-view';
const SeafoamButton = require('../components/SeafoamButton');

export default class ClinicianPList extends React.Component {
    static navigationOptions = {
        title: 'Clinician Patient List',
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
		var user = firebaseApp.auth().currentUser;
		this.pRef = firebaseApp.database().ref('Clinician/' + user.uid + '/patients/');
        this.state = {listType: 'FlatList', userName: '', Patients: []};
		super();
		this.openDrawer = this.openDrawer.bind(this);
    }

    listenForPatientIDs(pRef) {
        pRef.on('value', (snap) => {
            var pIDs = [];
            snap.forEach((child) => {
                pIDs.push({
                    pID: child.val().pID,
                    pUserName: child.val().pUserName
                });
            });
            this.setState({Patients: pIDs});
        });
    }


    componentDidMount() {
        this.listenForPatientIDs(this.pRef);
    }

    componentWillUnmount(){
        this.pRef.off();
		this.props.navigation.setParams({ open: this.openDrawer });
    }
	openDrawer(){
		this.drawer.openDrawer();
	}

    keyExtractor = (item) => item.pID;

    closeRow(rowMap, item) {
        if (rowMap[item]) {
            rowMap[item].closeRow();
        }
    }

    deleteRow(rowMap, item) {
        //TODO: Need to add delete patient from list functionality(this will use an "Are you Sure" alert before deletiong from list.
    }

    onRowDidOpen = (item, rowMap) => {
        console.log('This row opened', item);
        setTimeout(() => {
            this.closeRow(rowMap, item);
        }, 2000);
    };

    _pDataCheck(item) {
        const {navigate} = this.props.navigation;
        this.itemsRef.child('/Pinfo').once('value', function (snapshot) {
            if(snapshot.exists()) {
                alert("Patient hasn't finished account creation. Once they complete account initialization you can view their info.")
            }else{
                navigate("CPHome", {ID: item.id});
            }
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fffcf6'}}>
                <SeafoamButton title="Patient List Home Screen"
                               onPress={() => navigate('PList')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="Settings"
                               onPress={() => navigate('NutritionistSetting')}/>
                <Text></Text>
                <Text></Text>
				<View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>
				<TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('NAddP')}>
                    <Text style={styles.sideText}>Add a patient</Text>
                </TouchableOpacity>
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

             <SwipeListView style={styles.backGrnd}
                useFlatList={true}
                data={this.state.Patients}
                keyExtractor = {this.keyExtractor}
				disableRightSwipe = {true}
                renderItem ={({item}) =>
                    <TouchableHighlight
                        onPress = {() => this._pDataCheck(item)}
                        style={styles.rowFront}
                        underlayColor={'#fffcf6'}
                    >
                        <Text style ={styles.rowText}>{item.userName}</Text>
                    </TouchableHighlight>
                }
                renderHiddenItem={ (item, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={ _ => this.closeRow(rowMap, item.id) }>
                            <Text style={styles.backTextWhite}>Messenger</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, item.id) }>
                            <Text style={styles.backTextWhite}>Delete</Text>
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
});
