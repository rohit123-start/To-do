import express from 'express'
import bodyParser from 'body-parser'

import { postUsers, getUsers, postCategories, getCategories, postTasks, getTasks, getAlldata} from './database.js'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("hello world")
})

// To get the data from the users

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const response = await getUsers(id)
    .then((succ) => {
      res.status(200).json(succ[0][0])
    })
    .catch((err) => {
      res.status(404).json({ msg: 'Cannot fetch user' })
    })
})

// Route to get categories of the specific user

app.get('/categories/:user_id', async (req, res) => {
  const user_id = req.params.user_id
  const response = await getCategories(user_id)
    .then(succ => {
      res.status(200).json(succ[0])
    })
    .catch(err => {
      res.status(404).json({ msg: 'Cannot fetch categories' })
    })
})

// Route to get tasks of specfic user and category

app.get('/tasks/:user_id/:category_id', async (req, res) => {
  const user_id = req.params.user_id
  const category_id = req.params.category_id
  const response = await getTasks(user_id, category_id)
    .then(succ => {
      res.status(200).json(succ[0])
    })
    .catch(err => {
      res.status(404).json({ msg: 'Task Creation Failed' })
    })
})

//route to post users
app.post('/users', async (req, res) => {
  const json = req.body
  const response = await postUsers(json)
    .then(resp => res.status(200).json({ msg: 'User Created Successfully' }))
    .catch(err => res.status(404).json({ msg: 'User Creation Failed' }))
})

//route to post to categories
app.post('/categories/:user_id', async (req, res) => {
  const user_id = req.params.user_id
  const json = req.body
  json["user_id"] = user_id
  const response = await postCategories(json)
    .then(resp => {
      res.status(200).json({ msg: "Category Created Successfully" })
    })
    .catch(err => {
      res.status(404).json({ msg: 'Category Creation Failed' })
    })
})

// route to post tasks
app.post('/tasks/:user_id/:category_id', async (req, res) => {
  const user_id = req.params.user_id
  const category_id = req.params.category_id
  const json = req.body
  json["user_id"] = user_id
  json["category_id"] = category_id
  const response = await postTasks(json)
    .then(resp => {
      res.status(200).json({ msg: 'Task Created Successfully' })
    })
    .catch(err => {
      res.status(404).json({ msg: 'Task creation failed' })
    })
  })

//route to get all data and also searched data
app.get('/admin/:key?', async (req, res) => {
  const params = req.params.key
  if(params){
    console.log("present")
    const response = await getAlldata(params)
    .then(succ => res.status(200).json(succ[0]))
    .catch(err => res.status(404).json({msg:'Data not fetched'}))
  }
  else{
    console.log("not")
    const response = await getAlldata()
    .then(succ => res.status(200).json(succ[0]))
    .catch(err => res.status(404).json({msg:'Data not fetched'}))
  }
  
})

setTimeout(() => {
  console.log("Delayed for 1 second.");
}, 3000);





app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})