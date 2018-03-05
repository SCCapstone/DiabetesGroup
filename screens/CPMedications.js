import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    AppRegistry,
    DrawerLayoutAndroid
} from 'react-native';

export default class CPMedications extends Component<{}> {

    static navigationOptions = {
        title: 'Patient Medications',
        headerStyle: {backgroundColor: "#FF6127"}
    };
    constructor(props) {
        super(props);
        //console.ignoredYellowBox = [
        // 'Setting a timer'
        //];
        var userID = props.navigation.state.params.ID;
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/medications/');
        this.state = { medications: [], medicine: '', dosage: '', time: '', user: userID};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push(
                    [child.val().medicine,
                        child.val().dosage,
                        child.val().time,])
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

    keyExtractor = (item) => item.id;



    render() {
        const tableHead = ['Medicine', 'Dosage', 'Time'];
        const {navigate} = this.props.navigation;
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#F7F1D2'}}>
                <SeafoamButton title="Patient List Home Screen"
                               onPress={() => navigate('PList')}/>
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
                <ScrollView style={styles.container}>
                        <Table>

                            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>

                            {this.state.medications.map((data, i) => (
                                <Row key = {i} data={data} style={[styles.row, i%2 && {backgroundColor: 'orange'}]} textStyle={styles.text}/> ))}

                        </Table>

                        <Text/>
                    <SeafoamButton
                        title="Add new medication for patient"
                        onPress = { () => navigate("CMInput", {ID: this.state.user})}
                    />
                </ScrollView>
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    row: { height: 30 },
    container: {
        flex: 1,
        paddingBottom: 20,
        flexDirection: 'column',
        backgroundColor: '#F7F1D2',
    },
});