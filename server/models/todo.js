import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: { // 👇 user connection added
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

});


export const Todo = mongoose.model("Todo", todoSchema);