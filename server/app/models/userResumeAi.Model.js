const mongoose = require("mongoose");

const userResumeAiSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userAuth",
            required: true,
        },

        resume: {
            fileName: String,
            filePath: String,
            extractedText: String,
        },

        aiResult: {
            type: Object,
            required: true,
        },

        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

let userResumeAiModel = mongoose.model("UserResumeAI", userResumeAiSchema);
module.exports = userResumeAiModel;