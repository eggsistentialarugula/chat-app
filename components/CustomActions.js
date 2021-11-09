import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'

export default class CustomActions extends React.Component {
    // display ActionSheet component to add a button that lets users choose whether to take a photo, choose an existing photo, or send their location to their contacts.
    onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        return;
                    case 1:
                        console.log('user wants to take a photo');
                        return;
                    case 2:
                        console.log('user wants to get their location');
                    default:
                }
            },
        );
    };

    // choose image from image library
    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        try {
            if (status === "granted") {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: 'Images',
                }).catch(error => console.log(error));

                if (!result.cancelled) {
                    this.setState({
                        image: result
                    });
                }
            }
        }
    }
    render() {
        return (
            <TouchableOpacity
                style={[styles.container]}
                onPress={this.onActionPress}>
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};