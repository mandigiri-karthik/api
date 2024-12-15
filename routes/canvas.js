// canvasRoutes.js

const express = require('express');
const router = express.Router();

// Importing the controller
const {createCanvas,getCanvas,getCanvasElements,addCircle,addText,addLine,addRectangle,addTriangle} = require('../controllers/canvascontroller');

const{exportCanvas,getCanvasExport}=require('../controllers/exportController')

// POST route to create a new canvas
router.post('/create-canvas', createCanvas);

// GET route to fetch the canvas data
router.get('/get-canvas', getCanvas);

// GET route to fetch all canvas elements
router.get('/elements', getCanvasElements);

// POST routes for specific shapes
router.post('/add-circle', addCircle); // Route to add a circle
router.post('/add-text', addText); // Route to add text
router.post('/add-line', addLine); // Route to add a line
router.post('/add-rectangle', addRectangle); // Route to add a rectangle
router.post('/add-triangle', addTriangle); // Route to add a triangle
router.get('/export', getCanvasExport);
router.post('/export', exportCanvas);

module.exports = router;