import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5YUpSpmJXHDvkAnrN_UgdcSYx6NyctJo",
  authDomain: "ipantry-bf023.firebaseapp.com",
  projectId: "ipantry-bf023",
  storageBucket: "ipantry-bf023.appspot.com",
  messagingSenderId: "375392292154",
  appId: "1:375392292154:web:f3d3a166b43299a9b6d403",
  measurementId: "G-P1GQLY652Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
