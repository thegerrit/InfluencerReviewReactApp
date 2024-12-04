import { db } from '../utils/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface ContactUsMessage {
  userId: string,
  email: string,
  contactReason: string,
  additionalInfo: string,
  date: Date
}

const WriteContactUsMsgToFirestore = async (message: ContactUsMessage) => {
  try {
    await addDoc(collection(db, 'ContactUsRequests'), message);
    // const docRef = await addDoc(collection(db, 'ContactUsRequests'), message);
    // console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export default WriteContactUsMsgToFirestore;
