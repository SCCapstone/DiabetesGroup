import React from 'react';
import {View, Text, BackHandler, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, DrawerLayoutAndroid} from 'react-native';
import firebaseApp from './FireBaseApp';
import { SwipeListView } from 'react-native-swipe-list-view';
const SeafoamButton = require('../components/SeafoamButton');
const MenuButton = require('../components/MenuButton');

export default class PatientList extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Nutritionist Patient List',
            headerStyle: {backgroundColor: "#112471"},
            headerTitleStyle: {color: "#FFFFFF", textAlign: 'center'},
            headerTintColor: "#FFFFFF",
            headerRight: (<View/>),
            headerLeft: <MenuButton onPress = {() => params.open()}/>
        };
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.itemsRef = firebaseApp.database().ref('Patients/');
        this.state = {listType: 'FlatList', userName: '', Patients: []};
        super();
        this.openDrawer = this.openDrawer.bind(this);
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    id: child.key,
                    userName: child.val().userName,
                });
            });
            this.setState({Patients: items});
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
        this.props.navigation.setParams({ open: this.openDrawer });

    }

    componentWillUnmount(){
        this.itemsRef.off();
    }

    openDrawer(){
        this.drawer.openDrawer();
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
            <View style={{flex: 1, backgroundColor: '#fefbea'}}>
                <View style={{height: 50, width: 300, backgroundColor: '#112471'}}>
                    <Text style={{alignSelf: "center", fontSize: 30, color: '#FFFFFF'}}>Hello!
                    </Text>
                </View>
                <View style={{height: 30, width: 300, backgroundColor: '#fefbea'}}/>

                <TouchableOpacity style={styles.sideButton}
                                  onPress={() => navigate('PList')}>
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
                renderNavigationView={() => navigationView}
                ref = {_drawer => (this.drawer = _drawer)}>

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
