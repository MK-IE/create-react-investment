import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { passwordVerify } from "../AuxilaryFunctions/Hash";

/* 

  Intializes FireBase and has all important functions to read and write to the server
  We utilize async to make sure the application waits for these executions before proceeding to do other things

  -- functions --
  
    errorHandler : Just lets us know if any error has occured with a boolean.
    readMaxKey : Gets the max key off firebase to make sure the next post doesn't overwrite any other key for other posts.
    writeUserData : Specifies the structure of the user object.
    checkUserName : Looks up if a user-name already exists in the database
    checkUserEmail : Looks up if the email has been used in a different account
    readUserData : Pull of the user-data based on the username if it a wrong user-name it will return false
    writePostData : Makes a new post with the specified structure and gets the newest key to post with using readMaxKey
    writeStorage : Used for saving images on the databse
    readStorage : Pulls of the images
    readAllPosts : Gets all the posts which are on the database 

*/


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
  postKey: 0,
  found: false
};

function errorHandler(e) {
  if (e) {
    return (userAuth.Error = true);
  } else {
    return (userAuth.Error = false);
  }
}

async function readMaxKey() {
  const fetch = firebase.database().ref("mPosts/");
  const getKey = await fetch.once("value");
  const val = getKey.val();
  return (userAuth.postKey = val);
}

export function writeUserData(
  userName,
  name,
  email,
  gender,
  password,
  userType,
  salt
) {
  let user = {
    name: name,
    email: email,
    gender: gender,
    password: password,
    salt: salt,
    userType: userType
  };

  firebase
    .database()
    .ref("users/" + userName)
    .set(user, errorHandler);
  return userAuth.Error;
}

export async function checkUserName(userName) {
  const fetch = firebase.database().ref("users/" + userName);
  const checkUser = await fetch.once("value");
  if (checkUser.val() !== null) {
    return true;
  } else {
    return false;
  }
}

export async function checkUserEmail(email) {
  const fetch = firebase.database().ref("users/");
  const checkUser = await fetch.once("value");
  const loop = function(email) {
    for (let i in checkUser.val()) {
      if (checkUser.val()[i].email === email) {
        return true;
      }
    }
    return false;
  };
  return loop(email);
}

export async function readUserData(userName, password) {
  const fetch = firebase.database().ref("users/" + userName);
  const checkUser = await fetch.once("value");

  if (checkUser.val() === null) {
    return (userAuth.located = false);
  }

  let verification = passwordVerify(password, checkUser.val().salt);
  if (checkUser.val().password === verification) {
    return (userAuth.located = checkUser.val());
  } else {
    return (userAuth.located = false);
  }
}

export async function writePostData(title, body, userName, imageName) {
  await readMaxKey();

  let post = {
    title: title,
    body: body,
    imageName: imageName,
    userName: userName
  };
  firebase
    .database()
    .ref("posts/" + ++userAuth.postKey)
    .set(post, errorHandler);
  if (!userAuth.Error) {
    firebase
      .database()
      .ref("mPosts/")
      .set(userAuth.postKey, errorHandler);
  }
  return userAuth.Error;
}

export async function writeStorage(image) {
  const storageUpload = firebase.storage().ref();
  const checkFinish = storageUpload.child(image.name).put(image);
  if (checkFinish.snapshot.ref !== null) {
    return true;
  } else {
    return false;
  }
}

export async function readStorage(imageName) {
  const storage = firebase
    .storage()
    .ref()
    .child(imageName);
  const image = await storage.getDownloadURL();
  return image;
}

export async function readAllPost() {
  const fetch = firebase.database().ref("posts/");
  const getPost = await fetch.once("value");
  const storePosts = [];
  const loop = function() {
    for (let i in getPost.val()) {
      storePosts.push(getPost.val()[i]);
    }
    return storePosts;
  };
  if (getPost.val() !== null) {
    return loop();
  } else {
    return false;
  }
}
