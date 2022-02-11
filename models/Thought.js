const { Schema, model } = require('mongoose')
const moment = require('moment')

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
            type: String,
            required: true
        },
        reactions: [reactionSchema]


    },
    {
        toJSON: {
            getters:true
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount') .get(function(){
    return this.reactions.lenght
})


const Thought = model('Thought', thoughtSchema)