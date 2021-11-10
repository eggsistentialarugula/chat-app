# React Native Mobile Chat App

### Quick Access

[Overview](#overview) <br/>
[Description](#description) <br/>
[Key Features](#features) <br/>
[Getting Started](#gettingStarted) <br/>
[Tech](#tech) <br/>
[Stack](#stack) <br/>
[Dependencies](#dependencies) <br/>
[Environment](#Environment) <br/>

<h3 id = "overview">Overview</h3>

A chat app for mobile devices built with **React Native**. The app provides users with a chat interface and options to share images and their location.

<h3 id = "description">Description</h3>

Phones are extremely popular nowadays. People use their phones for common daily tasks such as shopping, creating to-do lists, communicating with friends, scheduling meetings, and more. That's why companies offer native mobile versions of their web apps, or even skip created a web app entirely.

This app is created using **React Native**, **Expo**, and **Google Firestore Database**.

<h3 id = "features">Key Features</h3>

* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation as well as an input field and submit button.
* The app provdes users with two additional communication features: sending images and location data.
* Data gets stored online and offline.

* Users can access messages without internet connection / while offline so they can reread conversations at any time.
* Users care share their location with their friends and family
* App is compatible with a screen reader so that users with visual impairment can engage with a chat interface 

<h3 id = "tech">Tech</h3>

* Written in React Native 
* Developed using Expo
* Chat conversations must be stored in Google Firestore Database
* Authenticates users anonymously via Google Firebase authentication
* Chat conversations are stored locally
* Lets users pick and send images from their phone's image library
* lets users take pictures with the device's camera app and send them
* stores images in Firebase Cloud Storage
* can read the user's location data
* The chat interface and functionality is created using the [Gifted Chat Library](https://github.com/FaridSafi/react-native-gifted-chat)

### Quick Start

- Install [Expo](https://expo.io/): `npm install expo-cli -g`

- For Windows and Linux: Install [Android Studio](https://developer.android.com/studio).<br>

For more information how to set up an emulator, look [here](https://docs.expo.io/versions/latest/workflow/android-studio-emulator/)

- For Mac: Install [XCode](https://developer.apple.com/xcode/)

- Install the Expo app on your mobile device (available in Google Play Store and Apple Store)

<h3 id = "gettingStarted"> Getting Started</h3>

Set up your React Native App in your projects folder

```sh

$ expo init hello-world

```
Go to your project's directory

```sh

$ cd hello-world

```
Install all the dependencies:

```sh

$ npm i

```
Launch the https server Metro Bundler in a new tab
```sh

$ expo start

```
Launch Expo app on physical device and scan QR code in the Expo GUI

<h3 id = "stack"> Stack </h3>

1. React Native


<h3 id = "dependencies"> Dependencies </h3>

1. expo

2. expo-image-picker

3. expo-location

4. expo-permissions

5. firebase

6. react

7. react-dom

8. react-native

9. react-native-gifted-chat

10. react-native-keyboard-spacer

11. react-native-maps

12. react-native-web

13. react-navigation

14. react-navigation-stack

<h3 id = "environment"> Environment</h3>

1. Visual Studio Code v1.53.2

2. npm v7.6.3

3. node v16.4.0

<h3>Database</h3>

This project uses [Google Firebase/Firestore](https://firebase.google.com/products/storage/) for data storage.