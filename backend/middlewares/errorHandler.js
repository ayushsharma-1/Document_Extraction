const errorHandler = (err, req, res, next) => {
    if (err) {
        console.error("Error:", err.message || "Unknown error");
        res.status(500).send("Something Went Wrong");
    } else {
        next();
    }
};

module.exports = { errorHandler };
