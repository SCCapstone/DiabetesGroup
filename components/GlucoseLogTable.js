
import React, { Component } from 'react';
import {Alert, View,  StyleSheet, TouchableOpacity, Text, TouchableHighlight} from 'react-native';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import firebaseApp from "../screens/FireBaseApp";
import { withNavigation } from 'react-navigation';


class GlucoseLogTable extends Component {
    static navigationOptions = {
        title: 'Home Screen',
        headerStyle: {backgroundColor: "#112471"}
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.isNotPatient = (this.props.user != firebaseApp.auth().currentUser.uid);

        var userID;
        if(this.props.user === firebaseApp.auth().currentUser.uid){
            userID = firebaseApp.auth().currentUser.uid;
        }else{
            userID = this.props.user;
        }
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/logs/');

        this.state = { logs: [], glucoseLevel: '', readingType: '', time: ''}

    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            var items = [];
            var i = 0;
            snap.forEach((child) => {
                var key = child.key;
                items.push({
                    gLevel: child.val().glucoseLevel,
                    rType: child.val().readingType,
                    lDate: child.val().time,
                    lKey: key,
                    note: child.val().notes,
                    count: i++,
                });
            });
            this.setState({logs: items});
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
    }

    onRowDidOpen = (item, rowMap) => {
        console.log('This row opened', item);
        setTimeout(() => {
            this.closeRow(rowMap, item);
        }, 2000);
    };

    closeRow(rowMap, item) {
        if (rowMap[item]) {
            rowMap[item].closeRow();
        }
    }

    editLevels(key, gLevel, rType, note) {
        const {navigate} = this.props.navigation;
        navigate('GEdit', {gKey: key, gLevel: gLevel, rType: rType, gNotes: note})
    }

    deleteEvent(key) {
        Alert.alert(
            'Log Deletion',
            'Are you sure you want to delete this glucose log?',
            [
                {text: 'Cancel'},
                {text: 'Yes', onPress: () => this.deleteLog(key)},
            ]
        )
    }

    deleteLog(key) {
        var userID = firebaseApp.auth().currentUser.uid;
        var ref = firebaseApp.database().ref('Patients/' + userID + '/logs/' + key);
        ref.remove();
    }

    keyExtractor = (item) => item.id;

    render() {
        const tableHead = ['Glucose Level (mg/dL)', 'Type', 'Time Recorded'];

        return (
            <View>
                <Table borderStyle={{borderColor: 'transparent'}}>
                    <Row data={tableHead} style={[styles.row, {backgroundColor: '#BCF7FF'}]} textStyle={styles.headText}/>
                </Table>
                <SwipeListView
                   style={styles.backGrnd}
                   useFlatList={true}
                   data={this.state.logs}
                   keyExtractor = {this.keyExtractor}
                   disableRightSwipe={this.isNotPatient}
                   disableLeftSwipe={this.isNotPatient}
                   renderItem ={({item}) =>
                       <TouchableHighlight>
                           <Table borderStyle={{borderColor: 'transparent'}}>
                               <Row data={[item.gLevel, item.rType, item.lDate,]} style={[styles.row, item.count%2 > 0 && {backgroundColor: '#bcf7ff'}, item.count%2 === 0 && {backgroundColor: 'white'}]} textStyle={styles.text}/>
                           </Table>
                       </TouchableHighlight>
                   }
                   renderHiddenItem={ ({item}, {rowMap}) => (
                       <View style={[styles.rowBack, item.count%2 > 0 && {backgroundColor: '#bcf7ff'}, item.count%2 === 0 && {backgroundColor: 'white'}]}>
                           <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={ () => this.deleteEvent(item.lKey) }>
                               <Text style={styles.backTextWhite}>Delete</Text>
                           </TouchableOpacity>

                           <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ () => this.editLevels(item.lKey, item.gLevel, item.rType, item.note)}>
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
module.exports = withNavigation(GlucoseLogTable);