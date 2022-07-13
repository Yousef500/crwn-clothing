// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChSKUILzaMhI4VzVFl0mtrjWVKr-mZjd0",
    authDomain: "crwn-clothing-db-4a362.firebaseapp.com",
    projectId: "crwn-clothing-db-4a362",
    storageBucket: "crwn-clothing-db-4a362.appspot.com",
    messagingSenderId: "981239491506",
    appId: "1:981239491506:web:e665d7d6ddaf09b881d2ab",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
