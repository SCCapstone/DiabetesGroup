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
    ScrollView,
    Picker,
    TouchableOpacity,
} from 'react-native';

export default class Settings extends Component<{}> {

    static navigationOptions = {
        title: 'Settings',
        headerStyle: {backgroundColor: "#112471"},
        headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
        headerRight: (<View></View>),
        headerTintColor: "#FFFFFF"
    };

    constructor(props) {
        super(props);
        this.state = {Age: '', Sex: '', Weight: '', Height: '', DType: '', email: ''};

        var userID = firebaseApp.auth().currentUser.uid;
        var userRef = firebaseApp.database().ref('Patients/' + userID + '/Pinfo/');
        userRef.once('value', (snapshot) => {
            this.state ={Age: snapshot.val().Age, Sex: snapshot.val().Sex, Weight: snapshot.val().Weight,
                Height: snapshot.val().Height, DType: snapshot.val().DType, email: '', visibleModal: null};
        });
    }

    _resetPassword(){
        const {navigate} = this.props.navigation;
        var user = firebaseApp.auth().currentUser;
        var email =this.state.email;
        firebaseApp.auth().sendPasswordResetEmail(email);
        firebaseApp.auth().signOut();
        navigate('User');
    }

    _submitInfo() {
        const {navigate} = this.props.navigation;

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

        return (
            <ScrollView style={{backgroundColor: '#FFFCF6'}}>
                <View style={styles.container}>
                    <Text style={[styles.title, {marginBottom: 30, marginTop: 40}]}>
                        Personal Information:
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
                                    onItemSelected={(event) => this.setState({Sex: event.data})}
                                    selectedItemPosition={GenderData.indexOf(this.state.Sex)}
                                    isCurved
                                    isCurtain
                                    curtainColor='#112471BF'
                                    selectedItemTextColor='#000000'
                                    data={GenderData}
                                    style={{width: 300, height: 300}}
                                />
                                {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
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
                                    onItemSelected={(event) => this.setState({Height: event.data})}
                                    selectedItemPosition={HeightData.indexOf(this.state.Height)}
                                    isCurved
                                    isCurtain
                                    curtainColor='#112471BF'
                                    selectedItemTextColor='#000000'
                                    data={HeightData}
                                    style={{width: 300, height: 300}}
                                />
                                {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
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
                                        onItemSelected={(event) => this.setState({DType: event.data})}
                                        selectedItemPosition={TypeData.indexOf(this.state.DType)}
                                        isCurved
                                        isCurtain
                                        curtainColor='#112471BF'
                                        selectedItemTextColor='#000000'
                                        data={TypeData}
                                        style={{width: 300, height: 300}}
                                    />
                                    {this.renderModalButton('Confirm', () => this.setState({visibleModal: null}))}
                                </View>
                            </Modal>
                        </View>
                    </View>

                    <SeafoamButton
                        title="Update Personal Info"
                        onPress = {() => this._submitInfo()}
                    />

                    <View style={{marginTop: 30}}>
                        <SeafoamButton
                            title="Reset Password"
                            onPress = {() => this.setState({visibleModal: 'password'})}
                        />
                    </View>
                    <Modal
                        isVisible={this.state.visibleModal === 'password'}
                        animationIn="slideInLeft"
                        animationOut="slideOutRight"
                        onBackdropPress={() => this.setState({visibleModal: null})}
                    >
                        <View style={[styles.modalContent, {height: 200}]}>
                            <Text>Send a Reset Password Email</Text>
                            <TextInput style={styles.passInput} placeholder="Re-enter your email"
                                       underlineColorAndroid={'transparent'}
                                       placeholderTextColor= "#CFCFCF"
                                       onChangeText={(text) => this.setState({email: text})}
                                       value={this.state.email}
                            />
                            <TouchableOpacity
                                onPress = {() => this._resetPassword()}
                            >
                                <View style={[styles.modalButton, {marginTop: 15}]}>
                                    <Text style={{color: '#000000'}}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 45,
        paddingRight: 45,
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
    },
    modalContent: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
});
