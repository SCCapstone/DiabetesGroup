import React from 'react';
import {View, ListView, BackHandler, StyleSheet, FlatList} from 'react-native';
import firebaseApp from './FireBaseApp';
const ListName = require('../components/ListName');
/**
export default class PatientList extends React.Component {
    static navigationOptions = {
        title: 'Patient List',
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.NamesRef = this.getRef().child('Patients'); //Patients is looking at the children of the Patients table in the database
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForNames(NamesRef) {
        NamesRef.on('value', (snap) => {

            // get children as an array
            var patients = [];
            snap.forEach((child) => {
                patients.push({
                    Name: child.val().Name,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(patients)
            });

        });
    }

    componentDidMount() {
        this.listenForNames(this.NamesRef);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount(){
        this.NamesRef.off();
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderName.bind(this)}
                    enableEmptySections={true}
                    style={styles.namelistview}
                />

            </View>
        );
    }

    renderName(name) {
        return (
            <ListName name={name} />

        );
    }

    onBackPress = () => {
        const {goBack} = this.props.navigation;
        return goBack();
    }
}
**/

export default class PatientList extends React.Component {
    static navigationOptions = {
        title: 'Patient List',
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.itemsRef = firebaseApp.database().ref('Patients');
        this.state = { Name: '', Patients: []};
    }

    keyExtractor = (item) => item.id;

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    id: child.key,
                    Name: child.val().Name,
                });
            });
            this.setState({Patients: items});
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data = {this.state.Patients}
                    keyExtractor = {this.keyExtractor}
                    renderItem = {({item}) => (
                        //<Text style={styles.nText}>{item.Name}</Text>

                        <ListName name = {item.Name} />
                    )}
                    style={{marginTop: 20}}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F7F1D2',
    },
    namelistview: {
        flex: 1,
    },
    nText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 16,
    },
});