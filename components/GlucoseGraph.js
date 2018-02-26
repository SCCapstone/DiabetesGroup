import React, { Component } from 'react';
import Svg from "react-native-svg";
import { VictoryChart, VictoryLine } from 'victory-native';
import {View, Text, StyleSheet} from 'react-native';
import firebaseApp from "../screens/FireBaseApp"
import moment from 'moment';

class GlucoseGraph extends Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        var userID = firebaseApp.auth().currentUser.uid;
        this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/logs/');
        this.state = { logs: [], dates: [], glogs: [], glucoseLevel: '', time: '',};
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var lDates = [];
            var lLogs = [];
            snap.forEach((child) => {
                lDates.push(child.val().time);
                lLogs.push(parseInt(child.val().glucoseLevel));
            });
            this.setState({dates: lDates, glogs: lLogs});
            var items = this.averageDates();
            this.setState({logs: items});
        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    componentWillUnmount(){
        this.itemsRef.off();
    }

    keyExtractor = (item) => item.id;

    averageDates = () => {
        lDates = this.state.dates;
        lLogs = this.state.glogs;
        var items = [];
        var  avg = 0;
        var dCount = 0;

        for(i = 0; i < lDates.length; i++){
            if(i == 0){
                dCount = 1;
                avg += lLogs[i];
            }else if(moment(lDates[i], 'MM/DD/YYYY').format('MM/DD/YYYY') == moment(lDates[i-1], 'MM/DD/YYYY').format('MM/DD/YYYY')){
                dCount++;
                avg += lLogs[i];
            }else{
                var lastDate = moment(lDates[i-1], 'MM/DD/YYYY');
                var lastDateString = lastDate.format('MM/DD/YYYY');
                avg = avg/dCount;
                items.push({
                    Time: lastDateString,
                    GlucoseLevel: avg,
                });
                dCount = 1;
                avg = lLogs[i];
            }
            if((i+1) == lDates.length){
                var currDate = moment(lDates[i], 'MM/DD/YYYY');
                var currDateString = currDate.format('MM/DD/YYYY');
                avg = avg/dCount;
                items.push({
                    Time: currDateString,
                    GlucoseLevel: avg,
                });
            }
        }
        return items;
    };

    render() {
        return (
            this.state.logs.length == 0 ? null : <VictoryChart
                //theme={VictoryTheme.material}
            >
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                    }}
                    keyExtractor = {this.keyExtractor}
                    data= {this.state.logs}
                    x= "Time"
                    y= "GlucoseLevel"
                 />
            </VictoryChart>
        );
    }

}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: 'orange' },
    text: { textAlign:'center', color:'black' },
    row: { height: 30 },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F1D2',
    },
});

module.exports = GlucoseGraph;