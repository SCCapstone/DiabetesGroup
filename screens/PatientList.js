import React from 'react';
import {View, ListView, BackHandler, StyleSheet} from 'react-native';
import firebaseApp from './FireBaseApp';
const ListName = require('../components/ListName');

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#BBFFB6',
    },
    namelistview: {
        flex: 1,
    },
});