import React, { useState } from 'react';
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

// Set the Background Image
const backgroundImage = require('../assets/Background-Image.png');
// Background color options - Green, Blue, Orange, Gray, White
const bgColors = ['#ade899', '#dcccff', '#8A95A5', '#faffc9'];

export default class Start extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            bgColor: '#090C08',
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground 
                    style = {styles.backgroundImage} source = {backgroundImage}>
                        <View style = {styles.titleDiv}>
                            <Text style ={styles.titleText}>YAMALOT</Text>
                        </View>
                        <View style = {styles.menu}>
                            <TextInput
                                style = {[styles.inputField, styles.text]}
                                onChangeText={(name)=>this.setState({name})}
                                value={this.state.name}
                                placeholder="enter your name"
                            />
                            <Text style = {styles.text}>Choose Background Color</Text>
                            <View style = {styles.colorPicker}>
                                {bgColors.map((colorSelected)=>(
                                    <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select Background Color"
                                    accessibilityHint="Sets the background color of your chat screen."
                                    accessibilityRole="button"
                                    activeOpacity={0.8}
                                    key = {colorSelected}
                                    onPress={() => this.setState({ bgColor: colorSelected })}
                                    style={[
                                        styles.colors(colorSelected),
                                    ]}
                                    />
                                ))}
                            </View>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Hop on to the chat"
                                accessibilityHint="Takes you to chat screen."
                                accessibilityRole="button"
                                activeOpacity={0.8}
                                style={styles.chatButton}
                                onPress={()=>this.props.navigation.navigate('Chat', {name:this.state.name, bgColor: this.state.bgColor})}>
                                
                                <Text style = {styles.text}>
                                    Start Chatting
                                </Text>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
         justifyContent: 'center',
    },

    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleDiv:{
        flex:0.4, 
        justifyContent:'space-evenly',
    },
    titleText:{
        fontSize: 45,
        fontWeight: 'bold',
        color: '#fff',
    },
    menu:{
        backgroundColor: 'rgba(62, 58, 74,0.4)',
        borderColor: '#24202e',
        borderWidth: 1,
        width:'90%',
        alignItems: 'center',
        justifyContent:'space-evenly',
        paddingBottom: '10%',
        borderRadius: 5,
    },
    inputField:{
        width:'80%',
        height:60,
        borderWidth:2,
        marginTop: '10%',
        marginBottom: '10%',
        borderRadius: 5,
        backgroundColor: 'rgba(230, 222, 255,0.4)'
    },
    text:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
        color:'#f2edff',
        padding: '2%',
    },
    colorPicker:{
        marginTop: '2.5%',
        flexDirection: 'row',
    },
    colors: (colorSelected) => ({
        backgroundColor: colorSelected,
        width:40,
        height:40,
        borderRadius:50, 
        marginHorizontal: 10,
    }),
    chatButton: {
        width: '80%',
        height: 40,
        backgroundColor: '#3b354a',
        color: '#FFFFFF',
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'space-evenly',
        marginTop: '4%',
        borderRadius: 2,
    },

})