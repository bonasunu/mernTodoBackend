const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const Todo = require('./models/todo')

const MONGO_URI = config.MONGO_URI

try {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('connected to MongoDB')
} catch (error) {
  console.error(error.message)
}

app.use(express.json())

app.post('/api/todos', async (req, res) => {
  const body = req.body

  const newTodo = new Todo({
    description: body.description
  })

  const savedTodo = await newTodo.save()
  res.json(savedTodo.toJSON())
})

app.listen(config.PORT, () => console.log(`App listening PORT ${config.PORT}`))