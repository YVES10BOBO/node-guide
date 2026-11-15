const express = require('express'); // import express framework
const app = express();

const port = 5000;

const student_routes = require('./routes/students_routes');

// MIDDLEWARE 1: CORS. Lets a frontend on another port (React at localhost:5173 or :3000)
// call this API. Without it the browser blocks the requests.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // in production, put your frontend URL instead of *
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // Browsers send an OPTIONS "preflight" request before POST/PUT/DELETE; answer it right away.
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// MIDDLEWARE 2: parse JSON bodies so req.body works in POST/PUT.
app.use(express.json());

// ENDPOINTS: everything in students_routes.js is available under /students
app.use('/students', student_routes);

// Home route: quick check that the server is alive.
app.get('/', (req, res) => {
    res.send('server is learning');
});

// START THE SERVER
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
