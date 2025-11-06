var firebaseConfig = {
  apiKey: "AIzaSyAI61JKYodTHlMplWwfYeEGZXONxrnC4Xc",
  authDomain: "rshquizapp.firebaseapp.com",
  databaseURL: "https://rshquizapp-default-rtdb.firebaseio.com",
  projectId: "rshquizapp",
  storageBucket: "rshquizapp.firebasestorage.app",
  messagingSenderId: "730186115553",
  appId: "1:730186115553:web:de949a5f487d33c822caa0"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

function usrdta(usrId,usrNm,usrEmail,usrCont,usrShift) {
    console.log(db);
    var obj = {
        usrid: usrId.value,
        usrnm: usrNm.value,
        usremail: usrEmail.value,
        usrcont: usrCont.value,
        usrshift: usrShift.value,
    }
    console.log(obj);
    firebase.database().ref("user").push(obj);

}
