import Firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyDf7NJFzbVoQF4iLcfERSuCN5kZqOjBI1E',
  authDomain: 'vueblog-ffe2b.firebaseapp.com',
  databaseURL: 'https://vueblog-ffe2b.firebaseio.com',
  projectId: 'vueblog-ffe2b',
  storageBucket: 'vueblog-ffe2b.appspot.com',
  messagingSenderId: '167380625054'
}
const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()
export default db
