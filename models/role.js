import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const RoleSchema = new Schema({
    _id: { type: String, lowercase: true, index: true, unique: true },
    name: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false, select: false },
    deletedAt: { type: Date }
},{
    _id: false,
})

RoleSchema.pre(/^find/, function(next) {
    this.find({ deleted : false })
    next()
});