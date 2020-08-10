const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const todoSchema = mongoose.Schema({
  description: {
    type: String,
    minlength: 1,
    required: true
  }
})

todoSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Todo', todoSchema)