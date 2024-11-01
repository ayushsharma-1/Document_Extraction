const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { PORT } = require("./config/constants");
const routes = require("./routes/routes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Apply security headers
app.use(helmet());

// Logger
app.use(morgan("dev"));

// CORS configuration for specific origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
];
app.use(cors({ origin: allowedOrigins }));

// JSON parsing and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/api/v1", routes());

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.info(`
    -----------------------------
      Server Listening on port ${PORT}
      Allowed Origins: ${allowedOrigins.join(", ")}
    -----------------------------
    `);
});

module.exports = app;
