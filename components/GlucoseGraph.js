import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory-native';
import {View, Text, StyleSheet} from 'react-native';
import firebaseApp from "../screens/FireBaseApp"
import moment from 'moment';

class GlucoseGraph extends Component {
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
        this.state = { logs: [{Time: '00/00/0000', GlucoseLevel: 0}, {Time: '00/00/0000', GlucoseLevel: 0}], dates: [], glogs: []};
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
                var lDate = lastDate.toDate();
                avg = avg/dCount;
                items.push({
                    Time: lDate,
                    GlucoseLevel: avg,
                });
                dCount = 1;
                avg = lLogs[i];
            }
            if((i+1) == lDates.length){
                var currDate = moment(lDates[i], 'MM/DD/YYYY');
                var cDate = currDate.toDate();
                avg = avg/dCount;
                items.push({
                    Time: cDate,
                    GlucoseLevel: avg,
                });
            }
        }
        return items;
    };

    render() {
        return (
            this.state.logs.length < 2 ? null : <VictoryChart
                scale={{ x: 'time'}}
                containerComponent={<VictoryZoomContainer zoomDimension='x'/>}
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
        backgroundColor: '#fefbea',
    },
});

module.exports = GlucoseGraph;
