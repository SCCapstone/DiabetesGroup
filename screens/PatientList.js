import React from 'react';
import {View, Text, BackHandler, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, DrawerLayoutAndroid} from 'react-native';
import firebaseApp from './FireBaseApp';
import { SwipeListView } from 'react-native-swipe-list-view';
const SeafoamButton = require('../components/SeafoamButton');

export default class PatientList extends React.Component {
    static navigationOptions = {
        title: 'Nutritionist Patient List',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign: 'center'},
        headerTintColor: "#FFFFFF",
        headerRight: (<View />)
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.itemsRef = firebaseApp.database().ref('Patients/');
		this.patientRef = firebaseApp.database().ref('Nutritionists/');
        this.state = {listType: 'FlatList', userName: '', Patients: [], listOfP: []};
    }
	containsP(obj, list) {
		console.log("something happens in contains");
		var i;
			for (i in list) {
				if (list.hasOwnProperty(i) && list[i] === obj) {
					console.log(list[i]);
					console.log(obj);
					return true;
				}
			}
		return false;
	}
    listenForItems(itemsRef) {
		this.listenForItems2(this.patientRef);
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
				if(this.containsP(child.val().email, this.state.listOfP))
				{
		            items.push({
		                id: child.key,
		                userName: child.val().userName,
		            });
				}
            });
            this.setState({Patients: items});
        });
    }
	
	listenForItems2(patientRef) {
		var tempList = [];
		console.log(firebaseApp.auth().currentUser.uid);
		patientRef.on('value', (snap) => {
			snap.forEach((child) => {
				console.log("nothing");
				tempList.push(child.val().pEmail);
			
			});
		});
		this.setState({listOfP: tempList});
	}

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
		this.patientRef.off();
    }

    keyExtractor = (item) => item.id;

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
                navigate("NPHome", {ID: item.id});
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
				<SeafoamButton title="Add a patient"
                               onPress={() => navigate('NAddP')}/>
                <Text></Text>
                <Text></Text>
                <SeafoamButton title="Settings"
                               onPress={() => navigate('NutritionistSetting')}/>
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

             <SwipeListView style={styles.backGrnd}
                useFlatList={true}
                data={this.state.Patients}
                keyExtractor = {this.keyExtractor}
                renderItem ={({item}) =>
                    <TouchableHighlight
						onPress = {() => this._pDataCheck(item)}
                        style={styles.rowFront}
                        underlayColor={'#fffcf6'}
                    >
                        <Text style ={styles.rowText}>{item.userName}</Text>
                    </TouchableHighlight>
                }
                 /*TODO: The Messenger Button needs to take the nutritionist to the messenger between them and this specific patient of theirs*/
                renderHiddenItem={ ({item}, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={ () => navigate("NMess", {ID: item.id})}>
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
