const { createWorker } = require("tesseract.js");

const extractDataFromFile = async (filePath) => {
    const worker = await createWorker();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data: { text } } = await worker.recognize(filePath);
    await worker.terminate();
    return text;
};

module.exports = { extractDataFromFile };
