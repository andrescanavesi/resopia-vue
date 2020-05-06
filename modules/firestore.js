import firebase from '../store/Firebase'

export default function MyFirestore (moduleOptions) {
  return firebase.firestore()
}
