import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW6Yjs96CXEtmiokVX8LlWy2ZSvTJfrKw",
  authDomain: "test-b69f2.firebaseapp.com",
  projectId: "test-b69f2",
  storageBucket: "test-b69f2.appspot.com",
  messagingSenderId: "348959440968",
  appId: "1:348959440968:web:6b7eb99a6cb0fe05fdd87d",
  measurementId: "G-VMCEES3F9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);
export { serverTimestamp };
export default app;
