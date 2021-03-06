import SendMail, { Templates } from '../services/mail'
import Pipeless from '../services/pipeless'
import mongoose from 'mongoose'

var Schema = mongoose.Schema

var UserSchema = new Schema({
    email: { type: String, lowercase: true, index: true, unique: true },
    username: { type: String, lowercase: true, index: true, unique: true },
    password: { type: String, select: false },
    image: { type: String },
    name: { type: String },
    roles: { type: String, lowercase: true, default: "default" },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false, select: false },
    deletedAt: { type: Date }
})

UserSchema.pre(/^find/, function(next) {
    this.find({ deleted : false })
    next()
});

UserSchema.post('save', user => {
    SendMail(Templates.newUser, `${user.name} <${user.email}>`, { name: user.name, email:user.email, link: process.env.NEXTAUTH_URL })
    const _ = Pipeless
    new _.Event(
        new _.Subject(process.env.APP_NAME, _.ObjectTypes.app),
        new _.Relationship(_.RelationshipTypes.created, null, true),
        new _.Subject(user._id, _.ObjectTypes.user) ).Save()
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)