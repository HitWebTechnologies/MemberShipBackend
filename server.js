require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors({ origin: 'https://app.hitwebtech.co.zw' }))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))

const routes = require('./members/routes')
app.use(routes)
// 404 - route not found
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'The API endpoint you reached does not exist. The only valid ones are POST /register and POST /register-login/:id'
  })
})

const initializeDatabases = require('./dbs')

initializeDatabases().then(db => {
  // Initialize the application once database connections are ready.
  app.listen(3000, () => console.log('Listening on port 3000'))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})