const moment = require('moment')
const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
    },
        reactionBody: {
            type:String,
            required: true,
            maxlenght: 280, 

        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => moment(createdAt).format('LLL')
        }
    },
    {
        toJSON: {
            getters:true
        },
        id: false
    }        
)


module.exports = reactionSchema;