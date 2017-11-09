import { AppRegistry } from 'react-native';
import App from './App';
import PatientList from './screens/PatientList';
import {StackNavigator,} from 'react-navigation';

//This is going to be the apps main navigator
const AppNavigator = StackNavigator({
        PList: {screen: PatientList}
    },
    {
        initialRouteName: 'PList'
    }
);

AppRegistry.registerComponent('DiabetesGroup', () => AppNavigator);
