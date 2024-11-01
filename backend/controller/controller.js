const { uploadFile } = require("../utils/fileUpload");
const { extractDataFromFile } = require("../utils/dataExtractor");

/**
 * Uploads file, extracts data, and returns JSON.
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @param {Function} next Express Next Function
 * @returns JSON data extracted from uploaded file
 */
const upload = (req, res, next) => {
    uploadFile(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return next(new Error("Error uploading file"));
        }

        try {
            const filePath = `./uploads/${req.file.originalname}`;
            const data = await extractDataFromFile(filePath);
            res.json(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};

module.exports = { upload };
