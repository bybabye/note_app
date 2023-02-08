import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true,
    },
    authorId: {
        type : String,
        require : true,
    }
}, {timestamps: true});


const folderModel = mongoose.model('Folder',folderSchema);

export default folderModel;