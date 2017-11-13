import React from 'react';
import {View, Text, BackHandler, StyleSheet, FlatList} from 'react-native';
import firebaseApp from './FireBaseApp';
const PatientListButton = require('../components/PatientListButton');

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
        this.state = { Name: '', Patients: [], Age: '',};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    id: child.key,
                    Name: child.val().Name,
                    Age: child.val().Age,
                });
            });
            this.setState({Patients: items});
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
        return (
            <View style={styles.container}>
                <FlatList
                    data = {this.state.Patients}
                    keyExtractor = {this.keyExtractor}
                    renderItem ={({item}) =>
                        <PatientListButton
                            title = {item.Name + ', ' + item.Age}
                            //TODO: Need onPress event to take Nutritionist User to HomeScreen
                            onPress={() => navigate('User')}
                        />
                    }
                    style={{marginTop: 20, marginLeft: 20,}}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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