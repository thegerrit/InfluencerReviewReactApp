import { initializeApp } from 'firebase/app';
// import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAuth, } from 'firebase/auth';


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOUuvFA3c7pII5AYy1GD7f5SYeZTmz1Tw",
    authDomain: "core-photon-441421-q4.firebaseapp.com",
    projectId: "core-photon-441421-q4",
    storageBucket: "core-photon-441421-q4.firebasestorage.app",
    messagingSenderId: "243546574055",
    appId: "1:243546574055:web:3c0f5cb99bca7b0282a642",
    measurementId: "G-CZCF42FPP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/** Uncomment for local emulator testing */
// // // Connect to Firestore emulator
// connectFirestoreEmulator(db, '127.0.0.1', 8081);

// // // Connect to Auth emulator
// connectAuthEmulator(auth, 'http://127.0.0.1:9099');


/** Uncomment for debugging */
// setLogLevel('debug');
// async function testFirestore() {
//     try {
//       const querySnapshot = await getDocs(collection(db, "testCollection"));
//       querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//       });
//     } catch (e) {
//       console.error("Error fetching documents: ", e);
//     }
//   }
  
// testFirestore();

export { db, auth };
