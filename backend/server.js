const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDB = require('./config/db')

// Routes
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const thirdAuthRoutes = require('./routes/thirdAuthRoutes')

// Middlewares
const passport = require('./middlewares/passport')
const sessionMiddleware = require('./middlewares/session')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

dotenv.config({ path: __dirname + '/.env' })

connectDB()

const app = express()

app.use(sessionMiddleware)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

// APIs
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/auth', thirdAuthRoutes)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  // Create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  )

  // Setup the logger
  app.use(morgan('combined', { stream: accessLogStream }))

  // Use frontend build version
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

app.get('/', (req, res) => {
  res.send('Hello')
})
app.get('/home', (req, res) => {
  res.send('Welcome to home')
})
app.get('/errLog', (req, res) => {
  res.send('Error in Login')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
