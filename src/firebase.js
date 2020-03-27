import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

// import { Redirect } from 'react-router-dom';

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

// Initialize Firebase class with async methods
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
        try {
            await this.auth.createUserWithEmailAndPassword(email, password);
            
            await this.auth.currentUser.updateProfile({
                    displayName: name
            });

            window.location = "/dashboard";

        } catch(error) {
            alert(`${error}`);
        }
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    async getTopics() {
        const topics = await this.db.collection('topics').orderBy('topic.topic').get();

        return topics;
    }

    async getTopic(id) {
        const topic = await this.db
            .collection('topics')
            .doc(id)
            .get()

        return topic;
    }

    async addTopic(topic) {
        if(!this.auth.currentUser) {
            return alert("Not authorized");
        }

        const topicToMatch = await this.db
            .collection('topics')
            .where('topic', "==", topic)
            .get();
        
        let count = 0;

        await topicToMatch.forEach(topic => {
            count++;
        });

        await !count ? this.db.collection('topics').add({
            topic
        }) : (
            alert(`Topic "${topic.topic}" already exists! Now following...`)
        )
    }

    async followAddedTopic(topic) {
        if(!this.auth.currentUser) {
            return alert("Not authorized");
        }

        const topicToFollow = await this.db
            .collection('topics')
            .where('topic.topic', '==', `${topic.toUpperCase()}`)
            .get();

        let docId;

        topicToFollow.forEach(topic => docId = topic.id);

        return this.db
            .collection('topics')
            .doc(docId)
            .get();
    }

    deleteTopic(id) {
        if(!this.auth.currentUser) {
            return alert("Not authorized");
        }
        return this.db
            .collection('topics')
            .doc(id)
            .delete();
    }

    async addNewReader() {
        const reader = await this.db
            .collection('readers')
            .where('uid', "==", this.auth.currentUser.uid)
            .get();
        
        let count = 0;

        reader.forEach(val => {
            count++;
        });

        if(!count) {
            return this.db.collection('readers').add({
                uid: this.auth.currentUser.uid,
                username: this.auth.currentUser.displayName
            });
        } else {
            return true;
        }
    }

    async getReaders() {
        const readers = await this.db.collection('readers').get();
        return readers;
    }

    async getUserFollows() {
        const topics = [];
        const userFollows = await this.db
            .collection('follows')
            .where('follower', '==', this.auth.currentUser.uid)
            .get();

        userFollows.forEach(topic => {
            topics.push(topic.data().topic);
        });

        return topics;
    }

    async getAllFollows() {
        const allFollows = await this.db
            .collection('follows')
            .get();

        const followArray = [];

        allFollows.forEach(async follow => {
            followArray.push({
                topic: follow.data().topic, 
                follows: await this.countFollows(follow.data().topic)
            })
        })

        return followArray;
    }

    async countFollows(topic) {
        let count = 0;
        
        const follows = await this.db
            .collection('follows')
            .where('topic', '==', topic)
            .get();

        follows.forEach(val => {
            count++;
        });

        return count;
    }

    addFollow(topic) {
        if(!this.auth.currentUser) {
            return alert('Please login or sign up first.')
        }

        return this.db
            .collection('follows')
            .add({
                follower: this.auth.currentUser.uid,
                topic: topic,
                lookUpKey: `${this.auth.currentUser.uid}_${topic}`,
                created: new Date(),
            })
    }

    async unFollow(topic) {
        if(!this.auth.currentUser) {
            return alert("Not authorized");
        }
        const followToDelete = await this.db
            .collection('follows')
            .where('lookUpKey', '==', `${this.auth.currentUser.uid}_${topic}`)
            .get();

        let docId;

        followToDelete.forEach(topic => docId = topic.id);

        return this.db
            .collection('follows')
            .doc(docId)
            .delete();
    }

    getTitles(topics) {
        let topicTitles = [];

        topics.forEach(topicId => {            
            this.getTopic(topicId)
                .then(topic => {
                    let title = topic.data().topic.topic;
                    topicTitles.push(title);
                })
                .catch(error => {
                    return error;
                });
        });

        return topicTitles;
    }

    async getFollowTitles() {

        let newTopics = [];
        
        const follows = await this.getUserFollows()
        
        await follows.forEach(follow => {
            newTopics.push(follow);
        })

        return this.getTitles(newTopics);
    }; 
};

export default new Firebase(); 

