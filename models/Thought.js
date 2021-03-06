const { Schema, model } = require('mongoose')
const moment = require('moment')
const reactionSchema = require('./Reactions')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type:String,
            required: true,
            minlenght: 1,
            maxlenght: 280, 

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => moment(createdAt).format('LLL')
        },
        username: {
            type: Schema.Types.String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters:true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount') .get(function(){
    return this.reactions.length
})


const Thought = model('Thought', thoughtSchema)
module.exports = {Thought}