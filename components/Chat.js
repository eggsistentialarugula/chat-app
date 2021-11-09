import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo';
import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Day, Bubble, SystemMessage, InputToolbar } from 'react-native-gifted-chat';
//custom chat features (sharing images and location)
import CustomActions from './CustomActions';
// MapView Component
import MapView from 'react-native-maps'
// Import the functions you need from the SDKs you need
const firebase = require('firebase');
require('firebase/firestore');

// The applications main chat component that renders the UI
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      loggedInText: 'Logging in...',
      user: {
        _id: '',
        name: '',
      },
      isConnected: false,
      image: null,
      location: null,
    }
    // firebase config details
    const firebaseConfig = {
      apiKey: "AIzaSyD3vQS-Y4fy2fqqOkeGEaqUGGX_bBkoN3g",
      authDomain: "chatapp-d15e4.firebaseapp.com",
      projectId: "chatapp-d15e4",
      storageBucket: "chatapp-d15e4.appspot.com",
      messagingSenderId: "53594298368",
      appId: "1:53594298368:web:478b522f1bb32807f5e0e5"
    }
    // initialize firestore
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    //reference to collection in database
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    // listen to authentication events, Authenticate user with Firebase
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({ isConnected: true })

        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          // update user state with currently active user data
          this.setState({
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/animals',
            },
            messages: [],
          });
          // listen for collection changes
          this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({
          isConnected: false
        })
        // calls messages from offline storage
        this.getMessages();
        window.alert('You are offline and not allowed to send messages.');
      }
    });
  }

  componentWillUnmount() {
    // stop receiving updates
    this.unsubscribe();
    // stop receiving authentication updates
    this.authUnsubscribe();
  }

  // load messages when offline
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete messages from asyncstorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }


  // add messages to database
  addMessage() {
    const message = this.state.messages[0];
    // add a new msg to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || '',
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // save messages to local storage to view offline
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // function to send messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      // call addMessage to save messages to database
      () => {
        this.addMessage();
        // saves current state into asyncStorage
        this.saveMessages();
      }
    );
  }

  // retrieve current message and store them in state: messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null
      });
    });
    this.setState({
      messages,
    });
  };
  // set system messages colors
  renderSystemMessage(props) {
    let bgColor = this.props.route.params.bgColor;
    if (bgColor === '#8A95A5') {
      return (
        <SystemMessage
          {...props}
          textStyle={{ color: '#f0f8ff' }}
        />
      )
    }
    else {
      return (
        <SystemMessage
          {...props}
          textStyle={{ color: '#000' }}
        />
      )
    }
  }

  // change color of date
  renderDay(props) {
    let bgColor = this.props.route.params.bgColor;
    if (bgColor === '#8A95A5') {
      return (
        <Day
          {...props}
          textStyle={{ color: '#f0f8ff' }}
        />
      )
    }
    else {
      return (
        <Day
          {...props}
          textStyle={{ color: '#303030' }}
        />
      )
    }

  }

  // set message bubbles colors
  renderBubble(props) {
    let bgColor = this.props.route.params.bgColor;

    if (bgColor === '#cfdeca') {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'rgba(0, 0, 0, 0.65)'
            },
            left: {
              backgroundColor: '#faffc9'
            }
          }}
          timeTextStyle={{
            right: { color: '#faffc9' },
            left: { color: 'rgba(0, 0, 0, 0.65)' }
          }}
        />
      )
    }

    else if (bgColor === '#dcccff') {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'rgba(0, 0, 0, 0.65)'
            },
            left: {
              backgroundColor: '#cfdeca'
            }
          }}
          timeTextStyle={{
            right: { color: '#cfdeca' },
            left: { color: 'rgba(0, 0, 0, 0.65)' }
          }}
        />
      )
    }

    else if (bgColor === '#8A95A5') {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'rgba(0, 0, 0, 0.65)'
            },
            left: {
              backgroundColor: '#b8e6e4'
            }
          }}
          timeTextStyle={{
            right: { color: '#b8e6e4' },
            left: { color: 'rgba(0, 0, 0, 0.65)' }
          }}
        />
      )
    }

    else if (bgColor === '#faffc9') {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'rgba(0, 0, 0, 0.65)'
            },
            left: {
              backgroundColor: '#b8e6e4'
            }
          }}
          timeTextStyle={{
            right: { color: '#b8e6e4' },
            left: { color: 'rgba(0, 0, 0, 0.65)' }
          }}
        />
      )
    }

    else if (bgColor === '#b8e6e4') {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'rgba(0, 0, 0, 0.65)'
            },
            left: {
              backgroundColor: '#dcccff'
            }
          }}
          timeTextStyle={{
            right: { color: '#dcccff' },
            left: { color: 'rgba(0, 0, 0, 0.65)' }
          }}
        />
      )
    }
  }

  // don't render input toolbar if offline
  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      )
    }
  }

  // render CustomActions to display ActionSheet
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // render MapView if the message object contains location data
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    let { bgColor } = this.props.route.params;
    return (
      <View style={[styles.backgroundColor(bgColor), styles.container]}>
        <View style={styles.chatContainer}>
          <GiftedChat
            renderSystemMessage={this.renderSystemMessage.bind(this)}
            renderBubble={this.renderBubble.bind(this)}
            renderDay={this.renderDay.bind(this)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            isTyping={true}
            user={this.state.user}
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  // Brings over selected background color in home screen
  backgroundColor: (bgColor) => ({
    backgroundColor: bgColor,
  }),

  chatContainer: {
    flex: 1,
    width: '100%',
  }
});