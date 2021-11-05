import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font'
// Set the Background Image
const backgroundImage = require('../assets/images/yamalotbg.png');
// Background color options - Green, Blue, Orange, Gray, White
const bgColors = ['#cfdeca', '#dcccff', '#8A95A5', '#faffc9', '#b8e6e4'];

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bgColor: '#cfdeca',
            loaded: false,
        }
    }

    _loadFontsAsync = async () => {
        let isLoaded = await Font.loadAsync({
            // MeriendaOne MUST be named as MeriendaOne
            MeriendaOne: require("../assets/fonts/MeriendaOne-Regular.ttf")
        })
        this.setState({ loaded: isLoaded });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        const setBorder = this.state.bgColor;
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImage} source={backgroundImage}>
                    <View style={styles.titleDiv}>
                        {/* <Text style={styles.titleText}>`</Text> */}
                    </View>
                    <View style={styles.menu}>
                        <TextInput style={[styles.inputField, styles.text]}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder="enter your name"
                        />
                        <Text style={styles.text}>Choose Background Color</Text>
                        <View style={styles.colorPicker}>
                            {bgColors.map((colorSelected) => (
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select Background Color"
                                    accessibilityHint="Sets the background color of your chat screen."
                                    accessibilityRole="button"
                                    activeOpacity={0.8}
                                    key={colorSelected}
                                    onPress={() => this.setState({ bgColor: colorSelected })}
                                    style={[
                                        styles.colors(colorSelected),
                                        setBorder === colorSelected ? styles.borderOfCircle : null,
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
                            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor })}
                        >
                            <Text style={styles.text}>
                                Start Chatting!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleDiv: {
        flex: 0.2,
        justifyContent: 'space-evenly',
    },
    titleText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#000',
    },
    menu: {
        backgroundColor: 'rgba(128, 200, 255,0.7)',
        borderColor: 'rgba(99, 188, 255,1)',
        borderWidth: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: '3%',
        borderRadius: 60,
    },
    inputField: {
        width: '80%',
        height: 55,
        borderWidth: 1,
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 10,
        backgroundColor: 'rgba(130, 243, 255,0.85)',
        color: "#000",
    },
    text: {
        fontSize: 18,
        fontFamily: 'MeriendaOne',
        color: '#000',
        paddingLeft: '2%',
    },
    colorPicker: {
        marginTop: '2.5%',
        flexDirection: 'row',
    },
    colors: (colorSelected) => ({
        backgroundColor: colorSelected,
        width: 40,
        height: 40,
        borderRadius: 50,
        marginHorizontal: 10,
    }),
    chatButton: {
        width: '80%',
        height: 40,
        backgroundColor: 'rgba(130, 243, 255,0.85)',
        color: '#FFFFFF',
        borderColor: 'rgba(128, 200, 255,1)',
        borderWidth: 1,
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'space-evenly',
        marginTop: '3%',
        borderRadius: 10,
    },
    borderOfCircle: {
        borderWidth: 2,
        borderColor: '#000',
    }

})