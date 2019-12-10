import * as firebase from "firebase/app";
import "firebase/database";
import { passwordVerify } from "../AuxilaryFunctions/Hash";

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

function errorHandler(e)
{
  if (e)
  {
    return (userAuth.Error = true);
  } else
  {
    return (userAuth.Error = false);
  }
}

async function readMaxKey()
{
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
)
{
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

export async function readUserData(userName, password)
{
  const fetch = firebase.database().ref("users/" + userName);
  const checkUser = await fetch.once("value");

  if (checkUser.val() === null)
  {
    return (userAuth.located = false);
  }

  let verification = passwordVerify(password, checkUser.val().salt);
  if (checkUser.val().password === verification)
  {
    return (userAuth.located = checkUser.val());
  } else
  {
    return (userAuth.located = false);
  }
}

export async function writePostData(title, body, userName)
{
  await readMaxKey();

  let post = {
    title: title,
    body: body,
    userName: userName
  };
  console.log(userAuth.postKey);
  firebase
    .database()
    .ref("posts/" + ++userAuth.postKey)
    .set(post, errorHandler);
  console.log(userAuth.postKey);
  if (!userAuth.Error)
  {
    firebase
      .database()
      .ref("mPosts/")
      .set(userAuth.postKey, errorHandler);
  }
  return userAuth.Error;
}

export function readPostData(postKey)
{
  firebase
    .database()
    .ref("posts/" + postKey)
    .once("value")
    .then(function (snap)
    {
      if (snap.exists())
      {
        return (userAuth.post = snap.val());
      } else
      {
        return (userAuth.post = false);
      }
    })
    .catch(errorHandler);
  return userAuth.post;
}

export function checkDataBase(userName)
{
  firebase
    .database()
    .ref.child("users")
    .orderByChild("ID")
    .equalTo("U1EL5623")
    .once("value", snapshot =>
    {
      if (snapshot.exists())
      {
        const userData = snapshot.val();
        console.log("exists!", userData);
      }
    });
}

function generatePassword(password, salt)
{
  let verification = passwordVerify(password, salt);
  return verification;
}
