import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    DrawerLayoutAndroid
} from 'react-native';

export default class patientMedication extends Component<{}> {

    static navigationOptions = {
        title: 'Patient Medications',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
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
                renderNavigationView={() => navigationView}>
                <ScrollView style={styles.container}>
                        <Table>

                            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>

                            {this.state.medications.map((data, i) => (
                                <Row key = {i} data={data} style={[styles.row, i%2 && {backgroundColor: '#afc2f7'}]} textStyle={styles.text}/> ))}

                        </Table>
                        <Text/>
                    <SeafoamButton
                        title="Add new medication for patient"
                        onPress = { () => navigate("NMInput", {ID: this.state.user})}
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
        head: { height: 40, backgroundColor: '#afc2f7' },
        text: { textAlign:'center', color:'black' },
        row: { height: 30 },
    container: {
        flex: 1,
        paddingBottom: 20,
        flexDirection: 'column',
        backgroundColor: '#F7F1D2',
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