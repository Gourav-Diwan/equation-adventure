import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyx0aOtTy6SVFz2A6q4Pz-5t-chGF9wfo",
  authDomain: "equation-adventure.firebaseapp.com",
  projectId: "equation-adventure",
  storageBucket: "equation-adventure.firebasestorage.app",
  messagingSenderId: "1084899764795",
  appId: "1:1084899764795:web:bd4fb70fea1199cba5ca1e"
};
//Intitialize firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Firestore functions for custom levels
export const saveLevel = async (userId, level) => {
  try {
    const docRef = await addDoc(collection(db, 'levels'), {
      ...level,
      userId,
      createdAt: new Date().toISOString(),
      likes: 0,
      plays: 0
    });
    return { id: docRef.id, ...level };
  } catch (error) {
    console.error("Error saving level:", error);
    throw error;
  }
};

export const getUserLevels = async (userId) => {
  try {
    const q = query(
      collection(db, 'levels'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user levels:", error);
    throw error;
  }
};

export const getAllLevels = async () => {
  try {
    const q = query(
      collection(db, 'levels'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting all levels:", error);
    throw error;
  }
};

export const deleteLevel = async (levelId) => {
  try {
    await deleteDoc(doc(db, 'levels', levelId));
  } catch (error) {
    console.error("Error deleting level:", error);
    throw error;
  }
};