import React from 'react';
import {View, Text, BackHandler, StyleSheet, ScrollView, FlatList} from 'react-native';
import firebaseApp from './FireBaseApp';
//import Graph from 'react-native-line-plot';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
const SeafoamButton = require('../components/SeafoamButton');
const GlucoseCircle = require('../components/GlucoseCircle');
const MessengerButton = require('../components/MessengerButton');

export default class patientHome extends React.Component {
    static navigationOptions = {
        title: 'Home Screen',
    };
    constructor(props) {
        super(props);



    }



    render(){
        var userId = firebaseApp.auth().currentUser.uid;

        const appt = '11/16/2017 -- 10:30';
        const val1 = 7.6;
        const {navigate} = this.props.navigation;
        const tableHead = ['Glucose Level (mg/dL)', 'Type', 'Time Recorded'];
        const tableData = [
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '11:30'],
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '5:30'],
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '11:30'],
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '5:30'],
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '11:30'],
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '5:30'],
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '11:30'],
            ['112', 'Fasting', '7:30'],
            ['112', 'Post-Meal', '5:30'],
        ];
        return (
            <ScrollView>
                <View style={styles.container3}>
                    <MessengerButton
                        onPress={() => navigate('PHome')}/>
                </View>

                <View style={styles.container}>
                    <GlucoseCircle title={val1 + '      HgbA1c'}/>
                    <Text></Text>
                </View>

                <View style = {styles.container2}>
                    <GlucoseCircle title={'60' + '      FBG'}/>
                    <GlucoseCircle title={'150' + '      PpBG'}/>
                </View>

                <View style={styles.container}>
                    <Text style={styles.nText}>
                        {'Next Appointment: ' + userId}
                    </Text>

                    <SeafoamButton title="Input Glucose Reading"
                                   onPress={() => navigate('GInput')}/>
                    <Text></Text>

                    <SeafoamButton title="My Diet"
                                   onPress={() => navigate('PDiet')}/>
                    <Text></Text>
                    <SeafoamButton title="Medications"
                                   onPress={() => navigate('PMed')}/>
                    <Text></Text>

                </View>
                <Table>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    {tableData.map((data, i) => (
                        <Row key = {i} data={data} style={[styles.row, i%2 && {backgroundColor: 'orange'}]} textStyle={styles.text}/> ))}
                </Table>
            </ScrollView>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F1D2',
    },
    container2:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-around',
        backgroundColor: '#F7F1D2',
    },
    container3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#F7F1D2',
    },

    nText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 12,
        padding:15,
    },
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    row: { height: 30 },

});