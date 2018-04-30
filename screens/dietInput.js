import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
const DeleteButton = require('../components/DeleteButton');
const DietPicker = require('../components/DietPicker');
import firebaseApp from './FireBaseApp';
import DatePicker from 'react-native-datepicker';
import {WheelPicker} from 'react-native-wheel-picker-android';
import  Modal from 'react-native-modal';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    AppRegistry,
    Picker,
    ScrollView, Alert,
    TouchableOpacity,
} from 'react-native';

const pickerValues = [
    {label: "0", value: "0"},
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
    {label: "4", value: "4"},
    {label: "5", value: "5"},
    {label: "6", value: "6"},
    {label: "7", value: "7"},
    {label: "8", value: "8"},
    {label: "9", value: "9"},
    {label: "10", value: "10"},
    {label: "11", value: "11"},
    {label: "12", value: "12"},
    {label: "13", value: "13"},
    {label: "14", value: "14"},
    {label: "15", value: "15"},
    {label: "16", value: "16"},
    {label: "17", value: "17"},
    {label: "18", value: "18"},
    {label: "19", value: "19"},
    {label: "20", value: "20"},
];



export default class dietInput extends Component<{}> {

    static navigationOptions = {
        title: "Update Diet",
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        this.state = {date: '', fruits: 0, veges: 0, graStar: 0, prot: 0, dsrt: 0, water: 0, sugBev: 0, cofTea: 0};
    }


    _dietValues() {
        var that = this;

        var date = this.state.date;
        var fruits = this.state.fruits;
        var veges = this.state.veges;
        var graStar = this.state.graStar;
        var prot = this.state.prot;
        var dsrt = this.state.dsrt;
        var water = this.state.water;
        var sugBev = this.state.sugBev;
        var cofTea = this.state.cofTea;


        var user = firebaseApp.auth().currentUser;
        var isUpdate = false;

        if (date === '') {
            alert('Please select a date for diet entry.');
        }else {
            var dietRef = firebaseApp.database().ref('Patients/' + user.uid + '/diet/');
            dietRef.once('value', function (snapshot) {
                snapshot.forEach((child) => {
                    if(child.val().date === date) {
                        firebaseApp.database().ref('Patients/' + user.uid + '/diet/' + child.key).update({
                            date: date,
                            fruits: fruits,
                            veges: veges,
                            graStar: graStar,
                            prot: prot,
                            dsrt: dsrt,
                            water: water,
                            sugBev: sugBev,
                            cofTea: cofTea,
                        });
                        isUpdate = true;
                    }
                });
                if(isUpdate === false) {
                    firebaseApp.database().ref('Patients/' + user.uid + '/diet/').push({
                        date: date,
                        fruits: fruits,
                        veges: veges,
                        graStar: graStar,
                        prot: prot,
                        dsrt: dsrt,
                        water: water,
                        sugBev: sugBev,
                        cofTea: cofTea,
                    });
                }
            });
            this.props.navigation.goBack();
        }
    }

    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={{color: '#000000'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    renderModalButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.modalButton}>
                <Text style={{color: '#000000'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    );


    getDayDiet (date) {
        var that = this;
        var user = firebaseApp.auth().currentUser;
        this.setState({date: date});
        var dietRef = firebaseApp.database().ref('Patients/' + user.uid + '/diet/');
        dietRef.once('value', function (snapshot) {
            var fruits = '0';
            var veges = '0';
            var graStar = '0';
            var prot = '0';
            var dsrt = '0';
            var water = '0';
            var sugBev = '0';
            var cofTea = '0';
            snapshot.forEach((child) => {
                if(child.val().date === date) {
                        fruits = child.val().fruits;
                        veges = child.val().veges;
                        graStar = child.val().graStar;
                        prot = child.val().prot;
                        dsrt = child.val().dsrt;
                        water = child.val().water;
                        sugBev = child.val().sugBev;
                        cofTea = child.val().cofTea;
                }
            });
            that.setState({fruits: fruits, veges: veges, graStar: graStar, prot: prot, dsrt: dsrt, water: water, sugBev: sugBev, cofTea: cofTea})
        });
    }

    deleteEvent() {
        Alert.alert(
            "Day's Diet Deletion",
            "Are you sure you want to delete this day's diet?",
            [
                {text: 'Cancel'},
                {text: 'Yes', onPress: () => this.deleteDiet()},
            ]
        )
    }

    deleteDiet () {
        var that = this;
        var user = firebaseApp.auth().currentUser;
        var delDietRef = firebaseApp.database().ref('Patients/' + user.uid + '/diet/');
        delDietRef.once('value', function (snapshot) {
            snapshot.forEach((child) => {
                if(child.val().date === that.state.date) {
                    var ref = firebaseApp.database().ref('Patients/' + user.uid + '/diet/' + child.key);
                    ref.remove();
                }
            });


        });
        this.onComplete()
    }

    onComplete() {
        this.props.navigation.goBack();
    }

    render() {

        const dietData = [];
        for(var i = 0; i<21; i++) {
            dietData.push(i);
        }
        return (
            <ScrollView style={{backgroundColor: '#fffcf6'}}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Please Enter the Following Fields:
                    </Text>

                    <Text style={styles.title}>
                        *Input diet based on serving amounts.*
                    </Text>
                    <View style={styles.stretched}>


                        <View style={styles.line}>
                            <Text> Date: </Text>

                            <DatePicker
                                style={styles.input}
                                date={this.state.date}
                                mode="date"
                                placeholder="Date"
                                format="MM/DD/YYYY"
                                minDate="2018-01-01"
                                maxDate="2050-01-01"
                                showIcon={false}
                                customStyles={{
                                    placeholderText:{
                                        color: '#000000',
                                        fontSize: 16,
                                    },


                                }}


                                onDateChange={(date) => this.getDayDiet(date)}
                            />

                        </View>

                        <Text/>

                        <View style={styles.container3}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Fruits: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.fruits, () => this.setState({visibleModal: 'fruits'}))}
                                                            <Modal
                                                                isVisible={this.state.visibleModal === 'fruits'}
                                                                animationIn="slideInLeft"
                                                                animationOut="slideOutRight"
                                                                onBackdropPress={() => this.setState({visibleModal: null})}
                                                            >
                                                                <View style={styles.modalContent}>
                                                                    <WheelPicker
                                                                        onItemSelected={(event) => this.setState({fruits: event.data})}
                                                                        selectedItemPosition={dietData.indexOf(this.state.fruits)}
                                                                        isCurved
                                                                        isCurtain
                                                                        curtainColor='#112471BF'
                                                                        selectedItemTextColor='#000000'
                                                                        data={dietData}
                                                                        style={{width: 300, height: 300}}
                                                                    />
                                                                    {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                                                </View>
                                                        </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Vegetables: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.veges, () => this.setState({visibleModal: 'veges'}))}
                                    <Modal
                                        isVisible={this.state.visibleModal === 'veges'}
                                        animationIn="slideInLeft"
                                        animationOut="slideOutRight"
                                        onBackdropPress={() => this.setState({visibleModal: null})}
                                    >
                                        <View style={styles.modalContent}>
                                            <WheelPicker
                                                onItemSelected={(event) => this.setState({veges: event.data})}
                                                selectedItemPosition={dietData.indexOf(this.state.veges)}
                                                isCurved
                                                isCurtain
                                                curtainColor='#112471BF'
                                                selectedItemTextColor='#000000'
                                                data={dietData}
                                                style={{width: 300, height: 300}}
                                            />
                                            {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Grains/Starches: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.graStar, () => this.setState({visibleModal: 'graStar'}))}
                                    <Modal
                                        isVisible={this.state.visibleModal === 'graStar'}
                                        animationIn="slideInLeft"
                                        animationOut="slideOutRight"
                                        onBackdropPress={() => this.setState({visibleModal: null})}
                                    >
                                        <View style={styles.modalContent}>
                                            <WheelPicker
                                                onItemSelected={(event) => this.setState({graStar: event.data})}
                                                selectedItemPosition={dietData.indexOf(this.state.graStar)}
                                                isCurved
                                                isCurtain
                                                curtainColor='#112471BF'
                                                selectedItemTextColor='#000000'
                                                data={dietData}
                                                style={{width: 300, height: 300}}
                                            />
                                            {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Protein: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.prot, () => this.setState({visibleModal: 'prot'}))}
                                    <Modal
                                        isVisible={this.state.visibleModal === 'prot'}
                                        animationIn="slideInLeft"
                                        animationOut="slideOutRight"
                                        onBackdropPress={() => this.setState({visibleModal: null})}
                                    >
                                        <View style={styles.modalContent}>
                                            <WheelPicker
                                                onItemSelected={(event) => this.setState({prot: event.data})}
                                                selectedItemPosition={dietData.indexOf(this.state.prot)}
                                                isCurved
                                                isCurtain
                                                curtainColor='#112471BF'
                                                selectedItemTextColor='#000000'
                                                data={dietData}
                                                style={{width: 300, height: 300}}
                                            />
                                            {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Desserts: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.dsrt, () => this.setState({visibleModal: 'dsrt'}))}
                                    <Modal
                                        isVisible={this.state.visibleModal === 'dsrt'}
                                        animationIn="slideInLeft"
                                        animationOut="slideOutRight"
                                        onBackdropPress={() => this.setState({visibleModal: null})}
                                    >
                                        <View style={styles.modalContent}>
                                            <WheelPicker
                                                onItemSelected={(event) => this.setState({dsrt: event.data})}
                                                selectedItemPosition={dietData.indexOf(this.state.dsrt)}
                                                isCurved
                                                isCurtain
                                                curtainColor='#112471BF'
                                                selectedItemTextColor='#000000'
                                                data={dietData}
                                                style={{width: 300, height: 300}}
                                            />
                                            {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Water: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.water, () => this.setState({visibleModal: 'water'}))}
                                    <Modal
                                        isVisible={this.state.visibleModal === 'water'}
                                        animationIn="slideInLeft"
                                        animationOut="slideOutRight"
                                        onBackdropPress={() => this.setState({visibleModal: null})}
                                    >
                                        <View style={styles.modalContent}>
                                            <WheelPicker
                                                onItemSelected={(event) => this.setState({water: event.data})}
                                                selectedItemPosition={dietData.indexOf(this.state.water)}
                                                isCurved
                                                isCurtain
                                                curtainColor='#112471BF'
                                                selectedItemTextColor='#000000'
                                                data={dietData}
                                                style={{width: 300, height: 300}}
                                            />
                                            {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Sugary Beverages: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.sugBev, () => this.setState({visibleModal: 'sugBev'}))}
                                    <Modal
                                        isVisible={this.state.visibleModal === 'sugBev'}
                                        animationIn="slideInLeft"
                                        animationOut="slideOutRight"
                                        onBackdropPress={() => this.setState({visibleModal: null})}
                                    >
                                        <View style={styles.modalContent}>
                                            <WheelPicker
                                                onItemSelected={(event) => this.setState({sugBev: event.data})}
                                                selectedItemPosition={dietData.indexOf(this.state.sugBev)}
                                                isCurved
                                                isCurtain
                                                curtainColor='#112471BF'
                                                selectedItemTextColor='#000000'
                                                data={dietData}
                                                style={{width: 300, height: 300}}
                                            />
                                            {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:.5}}>
                                    <Text> Coffee/Tea: </Text>
                                </View>
                                <View style={{flex:.5}}>
                                    {this.renderButton(this.state.cofTea, () => this.setState({visibleModal: 'cofTea'}))}
                                    <Modal
                                        isVisible={this.state.visibleModal === 'cofTea'}
                                        animationIn="slideInLeft"
                                        animationOut="slideOutRight"
                                        onBackdropPress={() => this.setState({visibleModal: null})}
                                    >
                                        <View style={styles.modalContent}>
                                            <WheelPicker
                                                onItemSelected={(event) => this.setState({cofTea: event.data})}
                                                selectedItemPosition={dietData.indexOf(this.state.cofTea)}
                                                isCurved
                                                isCurtain
                                                curtainColor='#112471BF'
                                                selectedItemTextColor='#000000'
                                                data={dietData}
                                                style={{width: 300, height: 300}}
                                            />
                                            {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                            <Text/>
                            <Text/>
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <DeleteButton
                            title = "Delete Day's Diet"
                            onPress = { () => this.deleteEvent()}
                        />

                        <SeafoamButton title="Submit/Update"
                                       onPress = { () => this._dietValues()}
                        />
                    </View>
                    <Text/>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 55,
        paddingRight: 55,
        backgroundColor: '#fffcf6',
    },
    line:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    stretched: {
        alignSelf: 'stretch',
    },

    instructions: {
        textAlign: 'center',
        color: '#000000',
        marginBottom: 10,
        marginTop: -20,
    },
    input:{
        backgroundColor: '#ffffff',
        marginBottom: 20,
        borderWidth: 1,
        width: '60%',

    },
     title: {
        fontSize: 15,
        marginBottom: 10,
        paddingBottom: 5,
        textAlign: 'center',
    },
    container3: {
      flex:1,
    },
    bottomContainer: {
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
            backgroundColor: "#ffffff",
            justifyContent: "center",
            height: 45,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#000000",
            width: 80,
        },
    modalButton: {
            backgroundColor: "#059c29",
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            borderColor: "rgba(0, 0, 0, 0.1)",
            marginBottom: 15,
        },
    DTbutton: {
            backgroundColor: "#ffffff",
              padding: 12,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#000000",
                marginBottom: 15,
            },
    modalContent: {
            backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                borderColor: "rgba(0, 0, 0, 0.1)"
},
});