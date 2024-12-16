const express = require('express');
const app = express();
const canvasRoutes = require('./routes/canvas');
// const exportRoutes = require('./routes/exportroute');

// Middleware to parse JSON requests
app.use(express.json());

// Root route to serve a welcome page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Canvas API!</h1>');
});

// Use the canvas routes
app.use('/api', canvasRoutes);
// app.use('/api', exportRoutes);

const PORT = 3000;

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
