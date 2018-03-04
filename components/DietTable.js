import React, { Component } from 'react';
import {View,  StyleSheet} from 'react-native';
//import firebaseApp from './FireBaseApp';
//import Graph from 'react-native-line-plot';

import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import firebaseApp from "../screens/FireBaseApp";
class DietTable extends Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        var userID = firebaseApp.auth().currentUser.uid;
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/diet/');
        this.state = { diet: [], date: '', fruits: '', veges: '', graStar: '', prot: '', dsrt: '', water: '', sugBev: '', cofTea: '',};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push(
                    [child.val().date,
                        child.val().fruits,
                        child.val().veges,
                        child.val().graStar,
                        child.val().prot,
                        child.val().dsrt,
                        child.val().water,
                        child.val().sugBev,
                        child.val().cofTea,])
            });
            this.setState({diet: items});
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
        const tableHead = ['Date', 'Fru', 'Veg', 'G/S', 'Pro', 'Des', 'Wat', 'Sug', 'C/T' ];

        return (
            <View>
                <Table>

                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>

                    {this.state.diet.map((data, i) => (
                        <Row key = {i} data={data} style={[styles.row, i%2 && {backgroundColor: 'orange'}]} textStyle={styles.text}/> ))}

                </Table>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    row: { height: 30 },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F1D2',
    },
});

module.exports = DietTable;