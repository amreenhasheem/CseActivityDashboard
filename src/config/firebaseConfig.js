  import firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyABZOI9p8ygo9DqqLKUudfI3XFXrYZqtzU",
    authDomain: "projectdashboard-a9ab9.firebaseapp.com",
    databaseURL: "https://projectdashboard-a9ab9.firebaseio.com",
    projectId: "projectdashboard-a9ab9",
    storageBucket: "projectdashboard-a9ab9.appspot.com",
    messagingSenderId: "983273703466"
  };
  const fire = firebase.initializeApp(config);
  export default fire;