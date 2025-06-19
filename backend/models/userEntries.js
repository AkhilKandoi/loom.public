import mongoose from 'mongoose';

const userEntriesSchema = new mongoose.Schema({
    username:{type: String, required: true},
    fontStyle:{type: String},
    fontSize:{type: String},
    pageColor:{type: String},
    fontColor:{type: String},
    backgroundColor:{type: String},
    createdAt: { type: String },
    entry:{type:String}
})

const UserEntries = mongoose.model('userentries', userEntriesSchema)

export default UserEntries;