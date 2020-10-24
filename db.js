const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/ahoy-node-passport'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})