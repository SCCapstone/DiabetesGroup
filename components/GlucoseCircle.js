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
        var userID = firebaseApp.auth().currentUser.uid;
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/logs/');
        this.state = { FBGlogs: [], HgbA1clogs: [], PpBGlogs: [], glucoseLevel: ''};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var fLogs = [];
            var pLogs = [];
            var a1Logs = [];
            var log = 0;
            snap.forEach((child) => {
                log = parseInt(child.val().glucoseLevel);
                if(child.val().readingType == 'Post-Meal'){
                    pLogs.push(log);
                    a1Logs.push(log);
                }else if(child.val().readingType == 'Fasting'){
                    fLogs.push(log);
                    a1Logs.push(log);
                }else{
                    a1Logs.push(log);
                }
            });
            var f = this.avgLogs(fLogs);
            var  p = this.avgLogs(pLogs);
            var a1 = this.avgLogs(a1Logs);
            this.setState({FBGlogs: f, PpBGlogs: p, HgbA1clogs: a1});
        });
    }


    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
    }

    keyExtractor = (item) => item.id;

    avgLogs (log){
        var  avg = 0;
        for(i = 0; i < log.length; i++){
            avg = avg + log;
        }
        avg = avg/log.length;
        return avg;
    };

    render() {
        return (
            <View style={styles.gCircle}>
                <TouchableHighlight>

                    <Text style={styles.valText}>{this.props.title}</Text>

                </TouchableHighlight>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    gCircle: {
        backgroundColor: 'orange',
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