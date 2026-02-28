const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const webRoutes = require("./app/routes/web/webRoutes");
const errorMiddleware = require("./app/middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

// web routes
app.use("/web", webRoutes);

// error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const DBNAME = process.env.DBNAME;

mongoose.connect(DBNAME)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
