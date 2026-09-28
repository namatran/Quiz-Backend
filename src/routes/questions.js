const express = require('express')
const db = require("../../database.js")
const router = express.Router()

const getQuestions = db.prepare('SELECT questions.id, questions.question, questions.answers, questions.answer FROM questions') // Simple
const createQuestions = db.prepare('INSERT INTO questions (question, answers, answer) VALUES (?, ?, ?)')
const deleteQuestions = db.prepare('DELETE FROM questions WHERE id = ?')
const updateQuestions = db.prepare('UPDATE questions SET question = ?, answers = ?, answer = ? WHERE id = ?')

router.get('/', (req, res) => {
    const questions = getQuestions.all()
    res.json(questions)
})

router.post('/', (req, res) => {
    const { question, answers, answer } = req.body

    if (!question) return res.status(400).json({ message: 'Question is required' })

    createQuestions.run(question, answers, answer)
    
    res.status(201).json({ message: 'Question created' })

})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const result = deleteQuestions.run(id)

    if (result.changes > 0) {
        res.status(200).json({ message: 'Question deleted' })
    } else {
        res.status(404).json({ message: 'Question not found' })
    }
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const { question, answers, answer } = req.body

    if (question === undefined && answers === undefined && answer === undefined) {
        return res.status(400).json({ message: 'At least one field must be provided' })
    }

    const result = updateQuestions.run(question, answers, answer, id) // needs ID

    if (result.changes > 0) {
        res.status(200).json({ message: 'Question updated' })
    } else {
        res.status(404).json({ message: 'Question not found' })
    }
})

module.exports = router