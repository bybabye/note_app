import mongoose from "mongoose";

const authorModel = new mongoose.Schema({
    uid: {
        type : String,
        require : true,
    },
    name: {
        type : String,
        require : true,
    }
}, {timestamps: true});


const AuthorModel = mongoose.model('Author',authorModel);

export default AuthorModel;