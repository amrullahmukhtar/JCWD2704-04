import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB7bU2_CpA70fIO2kqriSHM0JbSMPMivSE",
    authDomain: "career-avenue.firebaseapp.com",
    projectId: "career-avenue",
    storageBucket: "career-avenue.appspot.com",
    messagingSenderId: "223031206963",
    appId: "1:223031206963:web:fe3db153ca884620de6f46",
    measurementId: "G-RGR3ZP3PFC"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };