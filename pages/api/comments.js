import admin from '@/lib/firebase'
import { validateEmail } from '@/lib/operations'

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const firebase = admin.firestore()
    const { slug } = req.query
    return new Promise((resolve, reject) => {
      firebase
        .collection('comments')
        .get()
        .then((snapshot) => {
          const posts = snapshot.docs
            .map((doc) => doc.data())
            .filter((doc) => doc.slug === slug)
            .map((doc) => {
              const { name, content, time, slug } = doc
              return { name, content, time: time.seconds, slug }
            })
          res.status(200).json({ posts })
          res.end()
          resolve()
        })
        .catch((e) => {
          console.log(e)
          res.status(405).json(e)
          res.end()
          resolve()
        })
    })
  } else if (req.method == 'POST') {
    const firebase = admin.firestore()
    const { name, slug, content, email } = req.body
    let temp = { name, slug, content }
    temp['time'] = admin.firestore.Timestamp.fromDate(new Date())
    if (validateEmail(email)) temp['email'] = email
    return new Promise((resolve, reject) => {
      firebase
        .collection('comments')
        .add(temp)
        .then(() => {
          res.status(200)
          res.end()
          resolve()
        })
        .catch((e) => {
          console.log(e)
          res.status(405).json(e)
          res.end()
          resolve()
        })
    })
  }
  res.status(404)
  res.end()
}
