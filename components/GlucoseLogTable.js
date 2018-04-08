
import React, { Component } from 'react';
import {Alert, View,  StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import firebaseApp from "../screens/FireBaseApp";
const EditButton = require('../components/EditButton');

class GlucoseLogTable extends Component {
    static navigationOptions = {
        title: 'Home Screen',
        headerStyle: {backgroundColor: "#FF6127"}
    };

    isPatient;

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.isPatient = (this.props.user === firebaseApp.auth().currentUser.uid);

        var userID;
        if(this.props.user === firebaseApp.auth().currentUser.uid){
            userID = firebaseApp.auth().currentUser.uid;
        }else{
            userID = this.props.user;
        }
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/logs/');
        this.state = { logs: [], glucoseLevel: '', readingType: '', time: '',};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                this.isPatient === true ?
                items.push(
                    [child.val().glucoseLevel,
                        child.val().readingType,
                        child.val().time,
                        'index4',
                    ]) :
                    items.push(
                        [child.val().glucoseLevel,
                            child.val().readingType,
                            child.val().time,
                    ])
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

    keyExtractor = (item) => item.id;


    render() {
        //const {navigate} = this.props.navigation;
        const tableHead = this.isPatient === true ? ['Glucose Level (mg/dL)', 'Type', 'Time Recorded', 'Edit'] : ['Glucose Level (mg/dL)', 'Type', 'Time Recorded'];
        const gBut = (data, index) => (
            <TouchableOpacity onPress={() => alert('WHAT IS UP YO')}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Edit</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View>
                <Table borderStyle={{borderColor: 'transparent'}}>

                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>

                    {
                        this.state.logs.map((rowData, index) => (
                            <TableWrapper key={index} style={[styles.row, index%2 > 0 && {backgroundColor: 'orange'}, index%2 === 0 && {backgroundColor: 'white'}]}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={this.isPatient === false ? cellData : (cellIndex === 3 ? gBut(cellData, index) : cellData)} textStyle={this.isPatient === false ? styles.text : (cellIndex === 2 ? styles.date : styles.text)}/>
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }

                </Table>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    date: { textAlign:'center', color:'black', fontSize: 12},
    row: { height: 35, flexDirection: 'row',},
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F1D2',
    },
    btn: {
        width: 70,
        height: 20,
        backgroundColor: '#1bcc39',
        borderRadius: 2,
        alignContent: 'center',
        marginLeft: 17,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff'
    }
});
module.exports = GlucoseLogTable;