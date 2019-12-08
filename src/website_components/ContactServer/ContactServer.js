import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBdpf_wxtSI1tFtQCNNST1q-OXlfF6K0kU",
    authDomain: "create-react-investment.firebaseapp.com",
    databaseURL: "https://create-react-investment.firebaseio.com",
    projectId: "create-react-investment",
    storageBucket: "create-react-investment.appspot.com",
    messagingSenderId: "779045166015",
    appId: "1:779045166015:web:9c9e3ab9c07b9f414f1f0a"
};

firebase.initializeApp(firebaseConfig);

let userAuth = {
    located: null,
    Error: null,
    post: null,
    postKey: 0
};

function errorHandler(e) {
    if (e) {
        return userAuth.Error = true;
    } else {
        return userAuth.Error = false;
    }
}

function readMaxKey() {
    firebase.database().ref("mPosts/").once("value").then(function (snap) {
        if (snap.exists() && snap.val() > userAuth.postKey) {
            return userAuth.postKey = snap.val();
        }
    });
}

export function writeUserData(userName, email, gender, passWord, userType) {
    let user = {
        email: email,
        gender: gender,
        passWord: passWord,
        userType: userType
    };

    firebase.database().ref("users/" + userName).set(user, errorHandler);
    return userAuth.Error;
}

export function readUserData(userName, passWord) {

    firebase.database().ref("users/" + userName).once("value").then(function (snap) {
        return snap.exists() && snap.val().passWord === passWord ? userAuth.located = snap.val()
            : userAuth.located = false;
    });
    return userAuth.located;
}

export function writePostData(title, body, userName) {
    readMaxKey();

    let post = {
        title: title,
        body: body,
        userName: userName
    };

    firebase.database().ref("posts/" + (userAuth.postKey++)).set(post, errorHandler);

    if (!userAuth.Error) {
        firebase.database().ref("mPosts/").set(userAuth.postKey, errorHandler);
    }
    return userAuth.Error;
}

export function readPostData(postKey) {
    firebase.database().ref("posts/" + postKey).once("value").then(function (snap) {
        if (snap.exists()) {
            return userAuth.post = snap.val();
        } else {
            return userAuth.post = false;
        }
    });
    return userAuth.post;
}