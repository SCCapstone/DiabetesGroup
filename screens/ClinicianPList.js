import React from 'react';
import {View, Text, BackHandler, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight} from 'react-native';
import firebaseApp from './FireBaseApp';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class ClinicianPList extends React.Component {
    static navigationOptions = {
        title: 'Patient List',
        headerStyle: {backgroundColor: "#FF6127"}
    };

    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.itemsRef = firebaseApp.database().ref('Patients/');
        this.state = {listType: 'FlatList', userName: '', Patients: [],
					 Age: '', password: '', email: '',};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    id: child.key,
                    userName: child.val().userName,
                    Age: child.val().Age,
					password: child.val().password,
					email: child.val().email,
                });
            });
            this.setState({Patients: items});
        });
    }
	
/*
	_checkPatient(email, password) {
		const {navigate} = this.props.navigation;
		firebaseApp.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            navigate('NPHome')
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                alert('User not found.');
            }
            else if (errorCode === 'auth/wrong-password') {
                alert('Wrong Password.');
            }
            else if (errorCode === 'auth/invalid-email') {
                alert('Invalid Email.');
            }
            else {
                alert(errorMessage);
            }
            console.log(error);
		});
	
	}
*/

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
    }

    keyExtractor = (item) => item.id;

    closeRow(rowMap, item) {
        if (rowMap[item]) {
            rowMap[item].closeRow();
        }
    }

    deleteRow(rowMap, item) {
        //TODO: Need to add delete patient from list functionality(this will use an "Are you Sure" alert before deletiong from list.
    }

    onRowDidOpen = (item, rowMap) => {
        console.log('This row opened', item);
        setTimeout(() => {
            this.closeRow(rowMap, item);
        }, 2000);
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
             <SwipeListView
                useFlatList={true}
                data={this.state.Patients}
                keyExtractor = {this.keyExtractor}
                renderItem ={({item}) =>
                    <TouchableHighlight
                        onPress = {() => navigate("CPHome", {ID: item.id})}
                        style={styles.rowFront}
                        underlayColor={'#AAA'}
                    >
                        <Text style ={styles.rowText}>{item.userName}, {item.Age}</Text>
                    </TouchableHighlight>
                }
                 /*TODO: The Messenger Button needs to take the nutritionist to the messenger between them and this specific patient of theirs*/
                renderHiddenItem={ (item, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={ _ => this.closeRow(rowMap, item.id) }>
                            <Text style={styles.backTextWhite}>Messenger</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, item.id) }>
                            <Text style={styles.backTextWhite}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={85}
                rightOpenValue={-75}
                onRowDidOpen={this.onRowDidOpen}
            />
        );
    }

}


const styles = StyleSheet.create({
    backTextWhite: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rowText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#f7f1d2',
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
       // borderTopColor: 'orange',
       // borderTopWidth: 1,
        paddingTop: 20,
        height: 60,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#f7f1d2',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 85
    },
    backLeftBtnLeft: {
        backgroundColor: 'blue',
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
});
