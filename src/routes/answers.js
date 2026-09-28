const express = require('express')
const db = require("../../database.js")
const router = express.Router()

// returning answers only; the join is unnecessary since no question fields are selected
const getAnswers = db.prepare('SELECT id, username, answer, choice FROM answers')

const getQuestion = db.prepare('SELECT answer FROM questions WHERE id = ?') // I legit did not know this
const createAnswers = db.prepare('INSERT INTO answers (username, answer, choice, question_id) VALUES (?, ?, ?, ?)')
const deleteAnswers = db.prepare('DELETE FROM answers WHERE id = ?')
const updateAnswers = db.prepare('UPDATE answers SET username = ?, answer = ?, choice = ?, question_id = ? WHERE id = ?')

router.get('/', (req, res) => {
    const answers = getAnswers.all()
    res.json(answers)
})

router.post('/', (req, res) => {
    const { username, answer, question_id } = req.body
    const question = getQuestion.get(question_id)

    if (!username) return res.status(400).json({ message: 'Username is required' })

    let choiceStatus = false
    if (answer === question.answer) {
        choiceStatus = true
    }

    createAnswers.run(username, answer, choiceStatus ? 1 : 0, question_id)

    res.status(201).json({ message: 'Answer created' })

})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const result = deleteAnswers.run(id)

    if (result.changes > 0) {
        res.status(200).json({ message: 'Answer deleted' })
    } else {
        res.status(404).json({ message: 'Answer not found' })
    }
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const { username, answer, choice, question_id } = req.body

    if (username === undefined && answer === undefined && choice === undefined && question_id === undefined) {
        return res.status(400).json({ message: 'At least one field must be provided' })
    }

    const result = updateAnswers.run(username, answer, choice, question_id, id) // needs ID

    if (result.changes > 0) {
        res.status(200).json({ message: 'Answer updated' })
    } else {
        res.status(404).json({ message: 'Answer not found' })
    }
})

module.exports = router