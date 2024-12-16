const express = require('express');
const app = express();
const canvasRoutes = require('./routes/canvas');
const path = require('path');

// const exportRoutes = require('./routes/exportroute');

// Middleware to parse JSON requests
app.use(express.json());

// Root route to serve a welcome page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'endpoints.html'));
});

app.get('/examples',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','Examples.html'))
})

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
