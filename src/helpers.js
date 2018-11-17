import { firebaseAuth } from './config/firebase'

export function onSubmitSignIn(email, password) {
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}
export function onSubmitSignUp(email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
}
