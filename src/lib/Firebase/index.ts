import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0E3TvgqngzIqPUdY1qc_myIRLdtKEPHQ",
    authDomain: "kettle-30589.firebaseapp.com",
    projectId: "kettle-30589",
    storageBucket: "kettle-30589.appspot.com",
    messagingSenderId: "384856975843",
    appId: "1:384856975843:web:fa12108ff7968a7a6698d6"
  };

const app = initializeApp(firebaseConfig);

export const fireAuth = getAuth(app);

export const fireStorage = getStorage(app);

export const firestore = getFirestore(app);