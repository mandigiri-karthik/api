// controllers/canvasController.js
const logger = require('../services/logger');  // Import logger from services
const { getCanvasDataFromFile, getCanvasElementsFromFile } = require('./canvascontroller');

// Export Canvas function
const exportCanvas = (req, res) => {
    const canvasData = req.body.canvasData || getCanvasDataFromFile();
    const elementsData = req.body.elementsData || getCanvasElementsFromFile();

    if (!canvasData) {
        return res.status(404).json({ error: "No canvas data found." });
    }

    let svgContent = `<svg width="${canvasData.width}" height="${canvasData.height}" xmlns="http://www.w3.org/2000/svg">`;

    elementsData.forEach((element) => {
        switch (element.type) {
            case 'circle':
                svgContent += `<circle cx="${element.x}" cy="${element.y}" r="${element.radius}" fill="${element.color}" />`;
                break;
            case 'text':
                svgContent += `<text x="${element.x}" y="${element.y}" font-size="${element.fontSize}" fill="${element.color}">${element.text}</text>`;
                break;
            case 'line':
                svgContent += `<line x1="${element.x1}" y1="${element.y1}" x2="${element.x2}" y2="${element.y2}" stroke="${element.color}" />`;
                break;
            case 'rectangle':
                svgContent += `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="${element.color}" />`;
                break;
            case 'triangle':
                svgContent += `<polygon points="${element.x1},${element.y1} ${element.x2},${element.y2} ${element.x3},${element.y3}" fill="${element.color}" />`;
                break;
            default:
                break;
        }
    });

    svgContent += `</svg>`;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Canvas</title>
    </head>
    <body>
        <h1>Canvas Export</h1>
        ${svgContent}
    </body>
    </html>
    `;

    // Log the export action
    logger.info(`Canvas export successful. Dimensions: ${canvasData.width}x${canvasData.height}`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', 'attachment; filename=canvas-export.html');
    res.send(htmlContent);
};

// GET method for canvas export (This can be used for displaying/exporting the default canvas)
const getCanvasExport = (req, res) => {
    const canvasData = getCanvasDataFromFile();
    const elementsData = getCanvasElementsFromFile();

    if (!canvasData) {
        return res.status(404).json({ error: "No canvas data found." });
    }

    let svgContent = `<svg width="${canvasData.width}" height="${canvasData.height}" xmlns="http://www.w3.org/2000/svg">`;

    elementsData.forEach((element) => {
        switch (element.type) {
            case 'circle':
                svgContent += `<circle cx="${element.x}" cy="${element.y}" r="${element.radius}" fill="${element.color}" />`;
                break;
            case 'text':
                svgContent += `<text x="${element.x}" y="${element.y}" font-size="${element.fontSize}" fill="${element.color}">${element.text}</text>`;
                break;
            case 'line':
                svgContent += `<line x1="${element.x1}" y1="${element.y1}" x2="${element.x2}" y2="${element.y2}" stroke="${element.color}" />`;
                break;
            case 'rectangle':
                svgContent += `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="${element.color}" />`;
                break;
            case 'triangle':
                svgContent += `<polygon points="${element.x1},${element.y1} ${element.x2},${element.y2} ${element.x3},${element.y3}" fill="${element.color}" />`;
                break;
            default:
                break;
        }
    });

    svgContent += `</svg>`;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Canvas</title>
    </head>
    <body>
        <h1>Canvas Export</h1>
        ${svgContent}
    </body>
    </html>
    `;

    // Log the export action
    logger.info(`Canvas info with the Dimensions: ${canvasData.width}x${canvasData.height} is successfully exported`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', 'attachment; filename=canvas-export.html');
    res.send(htmlContent);
};

module.exports = { exportCanvas, getCanvasExport };

