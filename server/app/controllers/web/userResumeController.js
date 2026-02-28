const fs = require("fs");
const pdf = require("pdf-parse");
const userResumeAiModel = require("../../models/userResumeAi.Model");
const ErrorHandler = require("../../utils/ErrorHandler");

/**
 * Basic helper to attempt structuring data from extracted text.
 * In a real-world scenario, you'd use an LLM for this.
 */
const structureResumeText = (text) => {
    const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);

    const json = {
        personalInfo: {},
        skills: [],
        experience: [],
        education: []
    };

    // Very simple keyword based extraction (POC)
    let currentSection = "";

    lines.forEach(line => {
        const lowerLine = line.toLowerCase();

        if (lowerLine.includes("skill")) {
            currentSection = "skills";
        } else if (lowerLine.includes("experience") || lowerLine.includes("employment")) {
            currentSection = "experience";
        } else if (lowerLine.includes("education")) {
            currentSection = "education";
        } else {
            if (currentSection === "skills") {
                // Split by common delimiters
                const skillsList = line.split(/[,|•]/).map(s => s.trim()).filter(s => s.length > 0);
                json.skills.push(...skillsList);
            } else if (currentSection === "experience") {
                json.experience.push(line);
            } else if (currentSection === "education") {
                json.education.push(line);
            }
        }
    });

    // Cleanup skills
    json.skills = [...new Set(json.skills)];

    return json;
};

const userResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new ErrorHandler("Please upload a resume file", 400));
        }

        // 1. Read the PDF file
        const dataBuffer = fs.readFileSync(req.file.path);

        // 2. Extract text from PDF
        const data = await pdf(dataBuffer);
        const extractedText = data.text;

        // 3. Structure text into JSON
        const structuredJson = structureResumeText(extractedText);

        // 4. Save to database
        const newResume = new userResumeAiModel({
            userId: req.body.userId || "67bd686a634458f3316fbe71", // Fallback for testing
            resume: {
                fileName: req.file.filename,
                filePath: req.file.path,
                extractedText: extractedText,
            },
            aiResult: structuredJson // Storing the structured JSON in aiResult field
        });

        await newResume.save();

        res.status(201).json({
            success: true,
            message: "Resume uploaded and converted to JSON successfully",
            data: {
                id: newResume._id,
                fileName: newResume.resume.fileName,
                json: structuredJson
            }
        });
    } catch (error) {
        // Clean up file if error occurs
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

module.exports = { userResume };