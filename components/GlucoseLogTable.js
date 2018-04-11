
import React, { Component } from 'react';
import {Alert, View,  StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
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

        this.isPatient = (this.props.user === firebaseApp.auth().currentUser.uid);

        var userID;
        if(this.props.user === firebaseApp.auth().currentUser.uid){
            userID = firebaseApp.auth().currentUser.uid;
        }else{
            userID = this.props.user;
        }
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/logs/');

        this.state = { logs: [], glucoseLevel: '', readingType: '', time: '', notes: []}

    }

    listenForItems(itemsRef) {
       itemsRef.on('value', (snap) => {

            var items = [];
            var gNotes = [];
            snap.forEach((child) => {
                var key = child.key;
                this.isPatient === true ?
                items.push(
                    [child.val().glucoseLevel,
                        child.val().readingType,
                        child.val().time,
                        key,
                    ]) :
                items.push(
                    [child.val().glucoseLevel,
                        child.val().readingType,
                        child.val().time,
                    ])

                gNotes.push(child.val().notes)
            });
            this.setState({logs: items, notes: gNotes});
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
        const {navigate} = this.props.navigation;

        const tableHead = this.isPatient === true ? ['Glucose Level (mg/dL)', 'Type', 'Time Recorded', 'Edit/Delete'] : ['Glucose Level (mg/dL)', 'Type', 'Time Recorded'];

        const gBut = (key, data, index) => (
            <TouchableOpacity
                onPress={() => navigate('GEdit', {gKey: key, gData: data, gNotes: this.state.notes[index]})}>

                <View style={styles.btn}>
                    <Text style={styles.btnText}>Edit</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <View>
                <Table borderStyle={{borderColor: 'transparent'}}>

                    <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>

                    {
                        this.state.logs.map((rowData, index) => (
                            <TableWrapper key={index} style={[styles.row, index%2 > 0 && {backgroundColor: '#bcf7ff'}, index%2 === 0 && {backgroundColor: 'white'}]}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={this.isPatient === false ? cellData : (cellIndex === 3 ? gBut(cellData, rowData, index) : cellData)} textStyle={this.isPatient === false ? styles.text : (cellIndex === 2 ? styles.date : styles.text)}/>
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
    head: { height: 40, backgroundColor: '#bcf7ff'},
    headText: { textAlign:'center', color:'black', fontWeight: 'bold'},
    text: { textAlign:'center', color:'black' },
    date: { textAlign:'center', color:'black', fontSize: 12},
    row: { height: 35, flexDirection: 'row', justifyContent: 'center'},
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefbea',
    },
    btn: {
        width: 70,
        height: 27,
        marginLeft: 10,
        backgroundColor: '#112471',
        borderRadius: 2,
        alignContent: 'center',
        justifyContent: 'center',
    },
    btnText: {
        textAlign: 'center',
        color: '#fff'
    }
});
module.exports = withNavigation(GlucoseLogTable);