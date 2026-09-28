const express = require('express')
const app = express()
const port = 3000

const logRequest = (req, res, next) => {
    console.log(`${req.path}, Incoming request type ${req.method}`)  
    next() 
}

const errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: "Something went wrong" })
    console.error(err.message)
}

const questionsRouter = require('./src/routes/questions')
const answersRouter = require('./src/routes/answers')

app.use(logRequest)
app.use(express.json())
app.use('/questions', questionsRouter)
app.use('/answers', answersRouter)

app.get('/ping', (req, res) => {
    res.json({ message: "pong" })
})

// register error handler before we start listening to ensure it catches route errors
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})