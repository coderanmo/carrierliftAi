const express = require("express");
const upload = require("../../config/multer");
const { userResume } = require("../../controllers/web/userResumeController");

const router = express.Router();

/* Upload Resume */
router.post("/user-resume", upload.single("resume"), userResume);

module.exports = router;