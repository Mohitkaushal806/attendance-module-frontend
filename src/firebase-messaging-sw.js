importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCW5cy6Krx6_nNN8zVdAhWk3IKjiBTcYxk",
    authDomain: "demopushnotification-d9fd1.firebaseapp.com",
    projectId: "demopushnotification-d9fd1",
    storageBucket: "demopushnotification-d9fd1.appspot.com",
    messagingSenderId: "189101027342",
    appId: "1:189101027342:web:da89ef8812cd661e9b0c5f",
    measurementId: "G-WVGRXGT59B"
});
const messaging = firebase.messaging();