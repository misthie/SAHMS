// js/firebase.js
// Firebase v8 setup (classic script)

const firebaseConfig = {
  apiKey: "AIzaSyAskVG5jy-oQ5Jywszkn_TQlyR03S8WOJo",
  authDomain: "aahms-a0035.firebaseapp.com",
  databaseURL: "https://aahms-a0035-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aahms-a0035",
  storageBucket: "aahms-a0035.appspot.com",
  messagingSenderId: "1058168019904",
  appId: "1:1058168019904:web:60f108c34731a8376c0625",
  measurementId: "G-TKQMV1EMDJ"
};

// Initialize Firebase (prevent double init)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Global exports
var auth = firebase.auth();
var db = firebase.database();
