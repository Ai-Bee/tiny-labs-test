import firebase from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyBY4Gb5sp5lW01HPZGigU1D-bX4dO6CLJU',
  authDomain: 'employees-f516d.firebaseapp.com',
  databaseURL: 'https://employees-f516d.firebaseio.com',
  projectId: 'employees-f516d',
  storageBucket: 'employees-f516d.appspot.com',
  messagingSenderId: '241318872781',
  appId: '1:241318872781:web:106dae29757f3fa1170b84',
  measurementId: 'G-KKS6D2LZ7J'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const db = firebase.firestore()
