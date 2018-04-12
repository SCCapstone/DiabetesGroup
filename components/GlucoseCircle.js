import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import firebaseApp from "../screens/FireBaseApp";
import moment from "moment/moment";


class GlucoseCircle extends Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        var userID;
        if(this.props.user == firebaseApp.auth().currentUser.uid){
            userID = firebaseApp.auth().currentUser.uid;
        }else{
            userID = this.props.user;
        }
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/logs/');
        this.state = {gLevel: 0};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var fLogs = [];
            var pLogs = [];
            var log = 0;
            var type = this.props.name;
            snap.forEach((child) => {
                log = parseInt(child.val().glucoseLevel);
                if(child.val().readingType == 'Post-Meal'){
                    pLogs.push(log);
                }else if(child.val().readingType == 'Fasting'){
                    fLogs.push(log);
                }
            });
            if(type == 'FBG'){
                var f = this.avgLogs(fLogs);
                this.setState({gLevel: f});
            }else if(type == 'PpBG'){
                var  p = this.avgLogs(pLogs);
                this.setState({gLevel: p});
            }else{
                this.setState({gLevel: 7.2});   //a1c is static because clinician would enter it himself
            }
        });
    }


    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }


    componentWillUnmount(){
        this.itemsRef.off();
    }

    keyExtractor = (item) => item.id;

    avgLogs (log){
        var  avg = 0;
        for(i = 0; i < log.length; i++){
            avg = avg + log[i];
        }
        avg = avg/log.length;

        if(isNaN(avg) == true){
            avg = 0;
            return avg;
        }
        return Math.round(10*avg)/10;
    };

    colorLevels = function() {
        var type = this.props.name;
        var level = this.state.gLevel;
        var color = '';
        if(type == 'FBG'){
            if(level >=70 && level <= 130){              //good fast
                color = '#1ce04c';
            }else if(level > 130 && level <= 160){       //okay fast
                color = '#ffda22';
            }else{                                       //bad  fast
                color = '#f4000b';
            }
        }

        if(type == 'PpBG'){
            if(level > 70 && level <= 180){             //good meal
                color = '#1ce04c';
            }else if(level > 180 && level <=220){       //okay meal
                color = '#ffda22';
            }else{                                      //bad  meal
                color = '#f4000b';
            }
        }

        if(type == 'HgbA1c'){
            if(level >= 5 && level <= 7){               //good a1c
                color = '#1ce04c';
            }else if(level > 7 && level <= 8){          //okay a1c
                color = '#ffda22';
            }else{                                      //bad  a1c
                color = '#f4000b';
            }
        }
        return color;
    };

    render() {
        return (
            <View style={[styles.gCircle, {borderColor: this.colorLevels(), backgroundColor: '#fffcf6'}]}>
                <TouchableHighlight>

                    <Text style={[styles.valText, {color: this.colorLevels()}]}>
                        {this.state.gLevel + '\n' + this.props.name}
                    </Text>

                </TouchableHighlight>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    gCircle: {
       // backgroundColor: '#1ce04c',
        borderRadius: 60,
        borderColor: '#000000',
        borderWidth: 3,
        overflow: 'hidden',
        width: 120,
        height: 120,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 30,

    },
    valText: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },

});

module.exports = GlucoseCircle;