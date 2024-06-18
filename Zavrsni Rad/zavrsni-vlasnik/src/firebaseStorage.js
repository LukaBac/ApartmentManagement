import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKgW9xEaNM1ZorWMfY1SLNpYCcCU59Oc8",
  authDomain: "zavrsni-27830.firebaseapp.com",
  databaseURL: "https://zavrsni-27830-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zavrsni-27830",
  storageBucket: "zavrsni-27830.appspot.com",
  messagingSenderId: "447036788552",
  appId: "1:447036788552:web:d94e008b7c6ecb5524ed7d",
  measurementId: "G-Z506Q0ZL4R"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;