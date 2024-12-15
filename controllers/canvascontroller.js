// canvasController.js

const fs = require('fs');
const path = require('path');

// File paths for storing canvas data and canvas elements
const canvasDataFilePath = path.join(__dirname, '..', 'data', 'canvasData.json');
const canvasElementsFilePath = path.join(__dirname, '..', 'data', 'canvasElements.json');

// Function to save canvas data to a file
const saveCanvasData = (data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(canvasDataFilePath, jsonData);
        console.log('Canvas data saved successfully.');
    } catch (err) {
        console.error('Error saving canvas data:', err);
    }
};

// Function to read canvas data from the file
const getCanvasDataFromFile = () => {
    try {
        if (fs.existsSync(canvasDataFilePath)) {
            const rawData = fs.readFileSync(canvasDataFilePath, 'utf-8');
            console.log('Read canvas data:', rawData); // Log the raw data read from the file
            return rawData ? JSON.parse(rawData) : null; // Avoid parsing if file is empty
        }
    } catch (err) {
        console.error('Error reading canvas data:', err);
    }
    return null;
};

// Function to save canvas elements to a file
const saveCanvasElements = (data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(canvasElementsFilePath, jsonData);
        console.log('Canvas elements saved successfully.');
    } catch (err) {
        console.error('Error saving canvas elements:', err);
    }
};

// Function to read canvas elements from the file
const getCanvasElementsFromFile = () => {
    try {
        if (fs.existsSync(canvasElementsFilePath)) {
            const rawData = fs.readFileSync(canvasElementsFilePath, 'utf-8');
            console.log('Read canvas elements:', rawData); // Log the raw data read from the file
            return rawData ? JSON.parse(rawData) : []; // Return an empty array if the file is empty
        }
    } catch (err) {
        console.error('Error reading canvas elements:', err);
    }
    return [];
};

// Controller to handle POST request for creating a canvas
const createCanvas = (req, res) => {
    const { width, height } = req.body;

    // Simple validation
    if (!width || !height) {
        return res.status(400).json({ error: "Width and height are required." });
    }

    const canvasData = { width, height };
    saveCanvasData(canvasData); // Save to the file

    return res.status(201).json({
        message: "Canvas created successfully",
        canvas: canvasData,
    });
};

// Controller to handle GET request for fetching the canvas data
const getCanvas = (req, res) => {
    const canvasData = getCanvasDataFromFile(); // Read from the file

    if (!canvasData) {
        return res.status(404).json({ error: "No canvas data found." });
    }

    return res.status(200).json({
        message: "Canvas data fetched successfully",
        canvas: canvasData,
    });
};

// Controller to handle GET request for fetching all canvas elements
const getCanvasElements = (req, res) => {
    const elementsData = getCanvasElementsFromFile();

    if (!elementsData || elementsData.length === 0) {
        return res.status(404).json({ error: "No canvas elements found." });
    }

    return res.status(200).json({
        message: "Canvas elements fetched successfully",
        elements: elementsData,
    });
};

// Controller to add a Circle to the canvas
const addCircle = (req, res) => {
    const { x, y, radius, color } = req.body;

    // Simple validation
    if (typeof x !== 'number' || typeof y !== 'number' || typeof radius !== 'number' || !color) {
        return res.status(400).json({ error: "x, y, radius, and color are required." });
    }

    const newCircle = { type: 'circle', x, y, radius, color };

    const elementsData = getCanvasElementsFromFile();
    elementsData.push(newCircle);
    saveCanvasElements(elementsData);

    return res.status(201).json({
        message: "Circle added successfully",
        element: newCircle,
    });
};

// Controller to add Text to the canvas
const addText = (req, res) => {
    const { x, y, text, fontSize, color } = req.body;

    if (typeof x !== 'number' || typeof y !== 'number' || !text || !fontSize || !color) {
        return res.status(400).json({ error: "x, y, text, fontSize, and color are required." });
    }

    const newText = { type: 'text', x, y, text, fontSize, color };

    const elementsData = getCanvasElementsFromFile();
    elementsData.push(newText);
    saveCanvasElements(elementsData);

    return res.status(201).json({
        message: "Text added successfully",
        element: newText,
    });
};

// Controller to add a Line to the canvas
const addLine = (req, res) => {
    const { x1, y1, x2, y2, color } = req.body;

    if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number' || !color) {
        return res.status(400).json({ error: "x1, y1, x2, y2, and color are required." });
    }

    const newLine = { type: 'line', x1, y1, x2, y2, color };

    const elementsData = getCanvasElementsFromFile();
    elementsData.push(newLine);
    saveCanvasElements(elementsData);

    return res.status(201).json({
        message: "Line added successfully",
        element: newLine,
    });
};

// Controller to add a Rectangle to the canvas
const addRectangle = (req, res) => {
    const { x, y, width, height, color } = req.body;

    if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number' || typeof height !== 'number' || !color) {
        return res.status(400).json({ error: "x, y, width, height, and color are required." });
    }

    const newRectangle = { type: 'rectangle', x, y, width, height, color };

    const elementsData = getCanvasElementsFromFile();
    elementsData.push(newRectangle);
    saveCanvasElements(elementsData);

    return res.status(201).json({
        message: "Rectangle added successfully",
        element: newRectangle,
    });
};

// Controller to add a Triangle to the canvas
const addTriangle = (req, res) => {
    const { x1, y1, x2, y2, x3, y3, color } = req.body;

    if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number' || typeof x3 !== 'number' || typeof y3 !== 'number' || !color) {
        return res.status(400).json({ error: "x1, y1, x2, y2, x3, y3, and color are required." });
    }

    const newTriangle = { type: 'triangle', x1, y1, x2, y2, x3, y3, color };

    const elementsData = getCanvasElementsFromFile();
    elementsData.push(newTriangle);
    saveCanvasElements(elementsData);

    return res.status(201).json({
        message: "Triangle added successfully",
        element: newTriangle,
    });
};

module.exports = { 
    createCanvas, 
    getCanvas, 
    // addCanvasElement, 
    getCanvasElements, 
    addCircle, 
    addText, 
    addLine, 
    addRectangle, 
    addTriangle,getCanvasDataFromFile,getCanvasElementsFromFile
};
