import * as firebase from 'firebase'

import { FirebaseConfig } from './keys'
firebase.initializeApp(FirebaseConfig)

export const todosRef = firebase.database().ref()
export const firebaseDB = firebase.database()
export const firebaseAuth = firebase.auth()