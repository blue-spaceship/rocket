import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const ToDoSchema = new Schema({
    name: { type: String },
    completed: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    _rev: { type: String, nullable: true }
})