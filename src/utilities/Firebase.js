import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDIGIBAubTFVPojBG-ilU3EfOa9GysEo-A",
  authDomain: "mech-finder-22.firebaseapp.com",
  projectId: "mech-finder-22",
  storageBucket: "mech-finder-22.appspot.com",
  messagingSenderId: "869378297964",
  appId: "1:869378297964:web:5d77050977ab06d63f8849",
  measurementId: "G-Y6FX70HNEH",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
export default database;
