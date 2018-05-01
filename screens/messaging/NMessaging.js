/*--------------------------------------------------------------------------------------------------------------------------------
Screen Name: NMessaging

Purpose: This screen is to render the nutritionist and clinician messenger.

Functions Used:
    onSend(): Pushes the message to firebase.
---------------------------------------------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  FlatList,
  DrawerLayoutAndroid
} from 'react-native';
import firebaseApp from '../FireBaseApp';
const SeafoamButton = require('../../components/SeafoamButton');
const GlucoseCircle = require('../../components/GlucoseCircle');
const MessengerButton = require('../../components/MessengerButton');
const GlucoseLogTable = require('../../components/GlucoseLogTable');
const GlucoseGraph = require('../../components/GlucoseGraph');


import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';

export default class patientMessaging extends React.Component {
  static navigationOptions = {
		title: 'Chat',
      headerStyle: {backgroundColor: "#112471"},
      headerTitleStyle: {color: "#FFFFFF", textAlign:'center', alignSelf:'center',flex:1},
      headerRight: (<View></View>),
      headerTintColor: "#FFFFFF"
  };
  constructor(props) {
    super(props);
	var userID = props.navigation.state.params.ID;
	console.log(userID);
	//const { params } = this.props.navigation.state;
	//const userID = params ? params.ID : null;
	this.itemsRef = firebaseApp.database().ref('Patients/' + userID + '/messages/');
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };
    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    //this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

	
	listenForItems(itemsRef) {
		itemsRef.on('value', (snap) => {
		
		var fireMessages = [];

		snap.forEach((child) => {
		console.log(child.child("user").val()._id);
			fireMessages.push(
				{_id: child.val()._id,
				 text: child.val().text,
				 user: {
							_id: child.child("user").val()._id
					   }
				}
			)

		backwardsMess = [];
		for(var i = fireMessages.length - 1;i >= 0; i--)
		
		{
			backwardsMess.push(fireMessages[i]);
		}
		
		});

		this.setState({messages: backwardsMess});
    });

	}


  componentWillMount() {
/*
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('./data/messages.js'),
      };
    });
*/
  }

  componentDidMount() {
  	  this.listenForItems(this.itemsRef);
  }	

  componentWillUnmount() {
    //this._isMounted = false;
	this.itemsRef.off();
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
	var user = firebaseApp.auth().currentUser;

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
	//console.log(messages[0]);
	firebaseApp.database().ref('Patients/' + this.props.navigation.state.params.ID + '/messages/').push(messages[0]);

    // for demo purpose
    //this.answerDemo(messages);
  }
/*
  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }


    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }


  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }
*/
  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }
	
  renderBubble(props) {
	return(
		<Bubble
			{...props}
			textStyle={{
				left: {
					color: 'black',
				}
			}}
		/>
	);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        //loadEarlier={this.state.loadEarlier}
        //onLoadEarlier={this.onLoadEarlier}
        //isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: 2, // sent messages should have same user._id
        }}

        //renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble.bind(this)}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
