import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { connectFirestoreEmulator} from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    // apiKey: process.env.VITE_FIREBASE_API_KEY,
    // authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.VITE_FIREBASE_APP_ID,
    // measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
console.log('Initializing Firebase...');
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log("Environment: ", import.meta.env.VITE_ENVIRONMENT);
if (import.meta.env.VITE_ENVIRONMENT === 'local') {
    console.log('Connecting to Firestore emulator...');
    connectFirestoreEmulator(db, '127.0.0.1', 8081);
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}


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
