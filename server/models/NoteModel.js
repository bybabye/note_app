import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
    content: {
        type : String,
    },
    folderId: {
        type : String,
        require : true,
    }
}, {timestamps: true});


const noteModel = mongoose.model('Note',nodeSchema);

export default noteModel;