import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAEBTUua7PZaFuU6G0IqijofkIBllwqsj4",
  authDomain: "netflix-clone-cf2b0.firebaseapp.com",
  projectId: "netflix-clone-cf2b0",
  storageBucket: "netflix-clone-cf2b0.firebasestorage.app",
  messagingSenderId: "938735833553",
  appId: "1:938735833553:web:13d7ce97ff2c8c30cc90f0",
  measurementId: "G-N8GXK8V93G"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = ( )=>{
     signOut(auth);
}

export {auth,db,login,signup,logout} ;

