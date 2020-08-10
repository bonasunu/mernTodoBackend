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
  try {
    const body = req.body

    const newTodo = new Todo({
      description: body.description
    })

    const savedTodo = await newTodo.save()

    res.json(savedTodo.toJSON())
  } catch (error) {
    console.error(error.message)
  }
})

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find({})

    res.json(todos)

  } catch (error) {
    console.error(error.message)
  }
})

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params

    await Todo.findByIdAndRemove(id)

    res.json("todo deleted!")
  } catch (error) {
    console.error(error.message)
  }
})

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    
    const todo = {
      description: description
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true })
    res.json(updatedTodo)
  } catch (error) {
    console.error(error.message)
  }
})

app.listen(config.PORT, () => console.log(`App listening PORT ${config.PORT}`))