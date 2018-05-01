/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: NewPatientInfo

Puropse: This screen is used by patients to add new account information.

Functions Used:
    _submitInfo(): Used to verify new user information input adds it to the database.
    checkNumberInput(text, type): Checks to make sure input is only a number otherwise it is erased from the
                                input box for age and weight.
---------------------------------------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';
const SeafoamButton = require('../components/SeafoamButton');
import firebaseApp from './FireBaseApp';
import {WheelPicker} from 'react-native-wheel-picker-android';
import  Modal from 'react-native-modal';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default class NewPatientInfo extends Component<{}> {

    static navigationOptions = {
        title: 'New Account',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        this.state = {Age: '', Sex: '', Weight: '', Height: '', DType: ''};
    }

    //function for submitting changed info and updating firebase
    _submitInfo() {
        var Age = this.state.Age;
        var Sex = this.state.Sex;
        var Weight = this.state.Weight;
        var Height = this.state.Height;
        var DType = this.state.DType;

        var user = firebaseApp.auth().currentUser;
        var database = firebaseApp.database();

        firebaseApp.database().ref('Patients/' + user.uid + '/Pinfo/').set({
            Age: Age,
            Sex: Sex,
            Weight: Weight,
            Height: Height,
            DType: DType,
        });
        alert('Settings updated.');
        const {navigate} = this.props.navigation;
        navigate('PHome')
    }

    //These are functions for rendering the button to close the modals
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

    //this function checks the text input for letters which aren't valid
    checkNumberInput(text, type) {
        var newText = '';
        var numbers = '0123456789';
        if(text.length < 1){
            if(type === 'age') {
                this.setState({Age: ''});
            }else{
                this.setState({Weight: ''});
            }
        }
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }else {
                alert('Please only enter in numbers')
            }
            if(type === 'age'){
                this.setState({Age: newText });
            }else{
                this.setState({Weight: newText });
            }
        }
    }
    render() {
        const GenderData = ['Male', 'Female', 'N/A'];
        const HeightData = [];
        for(var i = 4; i<7; i++) {
            for(var j = 0; j<12; j++){
                HeightData.push(i + "'" + j + "''");
            }
        }
        const TypeData = ['Type 1 Diabetes', 'Type 2 diabetes', 'Prediabetes', 'Gestational Diabetes'];
        let tempGender = this.state.Sex;
        let tempHeight = this.state.Height;
        let tempDType = this.state.DType;
        return (
            <ScrollView style={{backgroundColor: '#FFFCF6'}}>
                <View style={styles.container}>
                    <Text style={[styles.title, {marginBottom: 30, marginTop: 40}]}>
                        Enter Your Personal Information:
                    </Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
                        <Text style={{marginRight: 52}}>Age:</Text>
                        <TextInput style={styles.input} defaultValue= {this.state.Age}
                                   underlineColorAndroid ={'transparent'}
                                   keyboardType = 'numeric'
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.checkNumberInput(text,'age')}
                                   maxLength={3}
                                   value={this.state.Age}
                        />

                        <Text>Gender:</Text>
                        {this.renderButton(this.state.Sex, () => this.setState({visibleModal: 'gender'}))}
                        <Modal
                            isVisible={this.state.visibleModal === 'gender'}
                            animationIn="slideInLeft"
                            animationOut="slideOutRight"
                            onBackdropPress={() => this.setState({visibleModal: null})}
                        >
                            <View style={styles.modalContent}>
                                <WheelPicker
                                    onItemSelected={(event) => tempGender = event.data}
                                    selectedItemPosition={GenderData.indexOf(this.state.Sex)}
                                    isCurved
                                    isCurtain
                                    renderIndicator
                                    indicatorColor='#112471'
                                    curtainColor='#112471BF'
                                    selectedItemTextColor='#000000'
                                    data={GenderData}
                                    style={{width: 300, height: 300}}
                                />
                                {this.renderModalButton('Confirm', () => this.setState({Sex: tempGender,visibleModal: null}))}
                            </View>
                        </Modal>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
                        <Text>Weight (lbs):</Text>
                        <TextInput style={styles.input} defaultValue= {this.state.Weight}
                                   underlineColorAndroid ={'transparent'}
                                   keyboardType = 'numeric'
                                   placeholderTextColor= "#CFCFCF"
                                   onChangeText={(text) => this.checkNumberInput(text,'weight')}
                                   maxLength={3}
                                   value={this.state.Weight}
                        />

                        <Text>Height:</Text>
                        {this.renderButton(this.state.Height, () => this.setState({visibleModal: 'height'}))}
                        <Modal
                            isVisible={this.state.visibleModal === 'height'}
                            animationIn="slideInLeft"
                            animationOut="slideOutRight"
                            onBackdropPress={() => this.setState({visibleModal: null})}
                        >
                            <View style={styles.modalContent}>
                                <WheelPicker
                                    onItemSelected={(event) => tempHeight = event.data}
                                    selectedItemPosition={HeightData.indexOf(this.state.Height)}
                                    isCurved
                                    isCurtain
                                    renderIndicator
                                    indicatorColor='#112471'
                                    curtainColor='#112471BF'
                                    selectedItemTextColor='#000000'
                                    data={HeightData}
                                    style={{width: 300, height: 300}}
                                />
                                {this.renderModalButton('Confirm', () => this.setState({Height: tempHeight, visibleModal: null}))}
                            </View>
                        </Modal>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', JustifyContent: 'center', marginBottom: 30, textAlign: 'center'}}>
                            <Text style={{marginRight: 10}}>Diabetes Type:</Text>
                            <TouchableOpacity onPress={() => this.setState({visibleModal: 'DType'})}>
                                <View style={styles.DTbutton}>
                                    <Text style={{color: '#000000'}}>{this.state.DType}</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal
                                isVisible={this.state.visibleModal === 'DType'}
                                animationIn="slideInLeft"
                                animationOut="slideOutRight"
                                onBackdropPress={() => this.setState({visibleModal: null})}
                            >
                                <View style={styles.modalContent}>
                                    <WheelPicker
                                        onItemSelected={(event) => tempDType = event.data}
                                        selectedItemPosition={TypeData.indexOf(this.state.DType)}
                                        isCurved
                                        isCurtain
                                        renderIndicator
                                        indicatorColor='#112471'
                                        curtainColor='#112471BF'
                                        selectedItemTextColor='#000000'
                                        data={TypeData}
                                        style={{width: 300, height: 300}}
                                    />
                                    {this.renderModalButton('Confirm', () => this.setState({DType: tempDType, visibleModal: null}))}
                                </View>
                            </Modal>
                        </View>
                    </View>

                    <SeafoamButton
                        title="Submit Info"
                        onPress = {() => this._submitInfo()}
                    />

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#fffcf6',
    },
    submitbutton:{
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#1FC97C'
    },
    submittext:{
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#000000",
    },
    input:{
        backgroundColor: '#ffffff',
        borderColor: "#000000",
        borderWidth: 1,
        height: 45,
        width: 80,
        textAlign: 'center'
    },
    passInput:{
        width: 200,
        backgroundColor: '#ffffff',
        borderColor: "#000000",
        borderWidth: 1,
        padding: 12,
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
        minWidth: 100,
    },
    modalContent: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
});
