import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    content: {
        type : String,
    },
    
}, {timestamps: true});


const NotifcationModel = mongoose.model('Notification',notificationSchema);

export default NotifcationModel;