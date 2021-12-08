import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required: true
    },
    email: {
        type:String,
        trim: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    history: [
        {
            activity: {type: String},
            updatedAt: {type: Date, default: Date.now}
        }
    ],
    passwordRecords : [
        {
            oldPassword: {type: String},
            newPassword: {type: String},
            updatedAt: {type: Date, default: Date.now}
        }
    ],
  
    emailVerification: {
        type: String,
        enum: ['sent', 'verified', 'pending'],
        default: 'pending'
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    phoneVerification: {
        type: String,
        enum: ['sent', 'verified', 'pending'],
        default: 'pending'
    },
    emailDeadlineTime: {
        type: Date
    },
    phoneDeadlineTime: {
        type: Date
    }



}, {timestamps: true})


export default  mongoose.model("Customer", customerSchema)