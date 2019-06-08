import app, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAagcLjq__JIH528h5XqPUzZUbrPWyP3RY",
    authDomain: "bitpress-a35b1.firebaseapp.com",
    databaseURL: "https://bitpress-a35b1.firebaseio.com",
    projectId: "bitpress-a35b1",
    storageBucket: "bitpress-a35b1.appspot.com",
    messagingSenderId: "534107389497",
    appId: "1:534107389497:web:f01f89e7a80a5128"
};

// Initialize Firebase class with methods
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        });
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    // async getPersonalTopics() {
    //     const personalTopics = await this.db.collection('topics').get({ userId: this.auth.getCurrentUsername() })

    //     return personalTopics;
    // }

    async getTopics() {
        const topics = await this.db.collection('topics').get()

        return topics;
    }

    async addTopic(topic) {
        if(!this.auth.currentUser) {
            return alert("Not authorized");
        }

        return this.db.collection('topics').add({
            topic
        });
    }

    async getSources() {
        const sources = await this.db.collection('sources').get()
        return sources;
    }

    async addSource(source) {
        if(!this.auth.currentUser) {
            return alert("Not authorized");
        }

        return this.db.collection('sources').add({
            source
        });
    }
}

export default new Firebase(); 

