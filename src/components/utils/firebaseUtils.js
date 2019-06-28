import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDUiBlfUjdsVpsl2GjZi9B9Evn2lIs1lqo",
    authDomain: "pet-event.firebaseapp.com",
    databaseURL: "https://pet-event.firebaseio.com",
    projectId: "pet-event",
    storageBucket: "",
    messagingSenderId: "61527628241"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();