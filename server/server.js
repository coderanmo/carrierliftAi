const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const webRoutes = require("./app/routes/web/webRoutes");
const errorMiddleware = require("./app/middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });


app.post("/upload", upload.single("resume"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        res.json({
            message: "File uploaded successfully ✅",
            file: req.file,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


app.use("/web", webRoutes);

app.use(errorMiddleware);



const PORT = process.env.PORT || 5000; 
const DBNAME = process.env.DBNAME;

mongoose.connect(DBNAME)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
    