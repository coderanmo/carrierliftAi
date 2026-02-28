let mongoose = require('mongoose')
let userChatSchema = mongoose.model({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    },
    userChat: {
        type: [String],
        required: true,
    },
    chatbotMeaasge: {
        type: [message]
    }
},
    {
        timestamps: true
    }
)

let userChatbotModel = mongoose.model('userChatbot', userChatSchema)
module.exports = userChatbotModel   