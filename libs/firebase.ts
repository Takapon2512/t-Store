import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyABR7E0F85-WeQpxm4aO1X7v9CospAE0vk",
    authDomain: "t-store-13d90.firebaseapp.com",
    projectId: "t-store-13d90",
    storageBucket: "t-store-13d90.appspot.com",
    messagingSenderId: "268771023629",
    appId: "1:268771023629:web:1593e24f685d5882be6e44"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore()

export default app