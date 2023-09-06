import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt49KvTjHMeQ0e3LWJh8R7I0nAelB4gQ0",
  authDomain: "server-rack-products.firebaseapp.com",
  projectId: "server-rack-products",
  storageBucket: "server-rack-products.appspot.com",
  messagingSenderId: "557573252891",
  appId: "1:557573252891:web:cbb7db415f8e7d7ba795be",
  measurementId: "G-WSJV68ENQQ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
