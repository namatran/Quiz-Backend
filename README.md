# Quiz-Backend

## Endpoints
### Questions Database
GET    /questions        - get all questions
POST   /questions        - create a question
PATCH  /questions/:id    - update a question
DELETE /questions/:id    - delete a question

### Answers Database
GET    /answers          - get all answers with question data
POST   /answers          - submit an answer (auto-grades)
PATCH  /answers/:id      - update an answer
DELETE /answers/:id      - delete an answer

## Learning Focus
The previous projects covered Express basics and SQL. This project went deeper on the Express side — specifically how requests are handled between the route and the response.

## What I learned

Middleware — functions that run on every request before hitting a route with app.use
- next() passes control forward to the next middleware or route. Without it the request hangs. next(error) skips to the error handler
- Custom logger — middleware that prints the method and path of every incoming request
- Error handling — a 4-argument middleware function that catches anything that goes wrong and returns a clean 500 response
More Express Router - Just made all the CRUD API and router http requests
Auto-grading — on POST /answers, the server fetches the correct answer from the database and sets choice to 1 or 0 automatically instead of trusting the client