import { firebaseAuth } from './config/firebase'

export function onSubmitSignIn(email, password) {
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}
export function onSubmitSignUp(email, password) {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
}

export function getLocalIsoTime() {
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60000
  const localISOTime = new Date(Date.now() - offsetInMilliseconds).toISOString().slice(0, -1)
  return localISOTime
}

export function addHoursToTime(time, hoursToAdd) {
  return new Date(time.setHours(time.getHours() + hoursToAdd)).toISOString().slice(0, -1)
}