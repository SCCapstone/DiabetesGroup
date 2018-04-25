import React, { Component } from 'react';
import {View,  StyleSheet, TouchableOpacity, TouchableHighlight, Text, Alert, FlatList} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
//import firebaseApp from './FireBaseApp';
//import Graph from 'react-native-line-plot';
import { withNavigation } from 'react-navigation';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import firebaseApp from "../screens/FireBaseApp";
class MedicationLogTable extends Component {
    static navigationOptions = {
        headerStyle: {backgroundColor: "#afc2f7"}
    };
    constructor(props) {
        super(props);
        this.isNotPatient = (this.props.user != firebaseApp.auth().currentUser.uid);
        var userID;
        if(this.props.user === firebaseApp.auth().currentUser.uid){
            userID = firebaseApp.auth().currentUser.uid;
        }else{
            userID = this.props.user;
        }
        console.log(userID);
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/medications/');
        this.state = { medications: [], medicine: '', dosage: '', time: '', user: userID};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            var i = 0;
            snap.forEach((child) => {
                var key = child.key;
                items.push(
                    {
                        medicine: child.val().medicine,
                        dosage: child.val().dosage,
                        mTime: child.val().time,
                        lKey: key,
                        count: i++,})
            });
            this.setState({medications: items});
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
    }

    onRowDidOpen = (item, rowMap) => {
        setTimeout(() => {
            this.closeRow(rowMap, item);
        }, 2000);
    };

    closeRow(rowMap, item) {
        if (rowMap[item]) {
            rowMap[item].closeRow();
        }
    }

    editMedication(key, medicine, dosage, mTime) {
        const {navigate} = this.props.navigation;
        navigate('MEdit', {mKey: key, medicine: medicine, dosage: dosage, mTime: mTime, ID: this.state.user})
    }
    deleteEvent(key) {
        Alert.alert(
            'Medication Deletion',
            'Are you sure you want to delete this Medication?',
            [
                {text: 'Cancel'},
                {text: 'Yes', onPress: () => this.deleteMed(key)},
            ]
        )
    }

    deleteMed(key) {
        var userID = this.state.user;
        var ref = firebaseApp.database().ref('Patients/' + userID + '/medications/' + key);
        ref.remove();
    }

    keyExtractor = (item) => item.id;


    render() {
        const tableHead = ['Medicine', 'Dosage', 'Time'];

        if(this.isNotPatient == false) {
            return (
                <View>
                    <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row data={tableHead} style={[styles.row, {backgroundColor: '#BCF7FF'}]} textStyle={styles.headText}/>
                    </Table>
                    <FlatList
                        style={styles.backGrnd}
                        data={this.state.medications}
                        keyExtractor = {this.keyExtractor}
                        renderItem ={({item}) =>
                            <TouchableHighlight>
                                <Table borderStyle={{borderColor: 'transparent'}}>
                                    <Row data={[item.medicine, item.dosage, item.mTime,]} style={[styles.row, item.count%2 > 0 && {backgroundColor: '#bcf7ff'}, item.count%2 === 0 && {backgroundColor: 'white'}]} textStyle={styles.text}/>
                                </Table>
                            </TouchableHighlight>

                         }
                    />
                </View>
            );
        }else{
            return (
                <View>
                    <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row data={tableHead} style={[styles.row, {backgroundColor: '#BCF7FF'}]} textStyle={styles.headText}/>
                    </Table>
                    <SwipeListView
                        style={styles.backGrnd}
                        useFlatList={true}
                        data={this.state.medications}
                        keyExtractor = {this.keyExtractor}
                        renderItem ={({item}) =>
                            <TouchableHighlight>
                                <Table borderStyle={{borderColor: 'transparent'}}>
                                    <Row data={[item.medicine, item.dosage, item.mTime,]} style={[styles.row, item.count%2 > 0 && {backgroundColor: '#bcf7ff'}, item.count%2 === 0 && {backgroundColor: 'white'}]} textStyle={styles.text}/>
                                </Table>
                            </TouchableHighlight>
                        }
                        renderHiddenItem={ ({item}, {rowMap}) => (
                            <View style={[styles.rowBack, item.count%2 > 0 && {backgroundColor: '#bcf7ff'}, item.count%2 === 0 && {backgroundColor: 'white'}]}>
                                <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={ () => this.deleteEvent(item.lKey) }>
                                    <Text style={styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ () => this.editMedication(item.lKey, item.medicine, item.dosage, item.mTime)}>
                                    <Text style={styles.backTextWhite}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        onRowDidOpen={this.onRowDidOpen}
                    />
                </View>
            );
        }

    }
}


const styles = StyleSheet.create({
    headText: { textAlign:'center', color:'black', fontWeight: 'bold'},
    text: { textAlign:'center', color:'black' },
    row: {
        marginLeft: -0.5,
        height: 45,
        borderTopColor: '#6c6c6c',
        borderTopWidth: 1,
    },
    backTextWhite: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rowText: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'space-between',
        color: 'black',
    },
    rowFront: {
        justifyContent: 'space-between',
        backgroundColor: '#f7f1d2',
        paddingTop: 20,
        height: 60,
    },
    backLeftBtn: {
        alignItems: 'center',
        height: 43.5,
        justifyContent: 'center',
        position: 'absolute',
        width: 75
    },
    backLeftBtnLeft: {
        backgroundColor: 'red',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backRightBtn: {
        alignItems: 'center',
        height: 43.5,
        justifyContent: 'center',
        position: 'absolute',
        width: 75
    },
    backRightBtnRight: {
        backgroundColor: '#112471',
        right: 0
    },
    backGrnd: {
        backgroundColor: 'white'
    },
});

module.exports = withNavigation(MedicationLogTable);