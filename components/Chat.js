import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat, Day, Bubble, SystemMessage } from 'react-native-gifted-chat';

// The applications main chat component that renders the UI
export default class Chat extends React.Component {
  constructor(){
    super();
    this.state={
      messages: [],
    };
  }

  componentDidMount(){
    this.setState({
      messages:[
        // system message
        {
          _id: 2,
          text: `${this.props.route.params.name} has entered the chat!`,
          createdAt: new Date(),
          system: true,
        },
        // receieved sample message#2
        {
          _id: 3,
          text: 'What are you up to?',
          createdAt: new Date(),
          user:{
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/animals',
          },
        },
        // received sample message #1
        {
          _id: 1,
          text: `Hello ${this.props.route.params.name}!`,
          createdAt: new Date(), 
          user:{
            _id:2,
            name:'React Native',
            avatar: 'https://placeimg.com/140/140/animals'
          },
        },
      ]
    })
  }

  // function for sending message
  onSend(messages = []){
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  // set system messages colors
  renderSystemMessage(props){
    return(
      <SystemMessage
        {...props}
        textStyle={{color:'#000'}}
      />
    )
  }

  // change color of date
  renderDay(props){
    return(
      <Day 
        {...props}
        textStyle={{color:'#606060'}}
      />
    )
  }

  // set message bubbles colors
  renderBubble(props){
    let bgColor = this.props.route.params.bgColor;

    if(bgColor === '#cfdeca'){
      return(
        <Bubble
          {...props}
          wrapperStyle={{
            right:{
              backgroundColor:'rgba(0, 0, 0, 0.65)'
            },
            left:{
              backgroundColor:'#faffc9'
            }
          }}
          timeTextStyle={{
            right:{color:'#faffc9'},
            left:{color:'rgba(0, 0, 0, 0.65)'}
          }}
        />
      )      
    }

    else if(bgColor === '#dcccff'){
      return(
        <Bubble
          {...props}
          wrapperStyle={{
            right:{
              backgroundColor:'rgba(0, 0, 0, 0.65)'
            },
            left:{
              backgroundColor:'#cfdeca'
            }
          }}
          timeTextStyle={{
            right:{color:'#cfdeca'},
            left:{color:'rgba(0, 0, 0, 0.65)'}
          }}
        />
      )   
    }

    else if(bgColor === '#8A95A5'){
      return(
        <Bubble
          {...props}
          wrapperStyle={{
            right:{
              backgroundColor:'rgba(0, 0, 0, 0.65)'
            },
            left:{
              backgroundColor:'#b8e6e4'
            }
          }}
          timeTextStyle={{
            right:{color:'#b8e6e4'},
            left:{color:'rgba(0, 0, 0, 0.65)'}
          }}
        />
      ) 
    }

    else if(bgColor === '#faffc9'){
      return(
        <Bubble
          {...props}
          wrapperStyle={{
            right:{
              backgroundColor:'rgba(0, 0, 0, 0.65)'
            },
            left:{
              backgroundColor:'#b8e6e4'
            }
          }}
          timeTextStyle={{
            right:{color:'#b8e6e4'},
            left:{color:'rgba(0, 0, 0, 0.65)'}
          }}
        />
      )   
    }

    else if(bgColor === '#b8e6e4'){
      return(
        <Bubble
          {...props}
          wrapperStyle={{
            right:{
              backgroundColor:'rgba(0, 0, 0, 0.65)'
            },
            left:{
              backgroundColor:'#dcccff'
            }
          }}
          timeTextStyle={{
            right:{color:'#dcccff'},
            left:{color:'rgba(0, 0, 0, 0.65)'}
          }}
        />
      )   
    }
  }

  render() {
    // Brings params over from home screen name and background color selected
    let { name, bgColor } = this.props.route.params;
    // Sets the entered name as the title in the Chat screen
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.backgroundColor(bgColor), styles.container]}>
        <View style = {styles.chatContainer}>
          <GiftedChat
            renderSystemMessage={this.renderSystemMessage.bind(this)}
            renderBubble={this.renderBubble.bind(this)}
            renderDay={this.renderDay.bind(this)}
            messages={this.state.messages}
            onSend={(messages)=>this.onSend(messages)}
            isTyping = {true}
            user={{
              _id: 1,
            }}
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height"/>
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
    flex:1,
    width:'100%',
  }
});