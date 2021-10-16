import SendMail, { Templates } from '../services/mail'
import Pipeless from '../services/pipeless'
import mongoose from 'mongoose'

var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: { type: String },
    image: { type: String },
    email: { type: String, lowercase: true, index: true, unique: true },
    username: { type: String, lowercase: true, index: true, unique: true },
    password: { type: String, select: false },
    roles: { type: String, lowercase: true, default: "default" }
})

UserSchema.post('save', user => {
    SendMail(Templates.newUser, `${user.name} <${user.email}>`, { name: user.name, email:user.email, link: process.env.NEXTAUTH_URL })

    const _ = Pipeless
    new _.Event(
        new _.Subject(process.env.APP_NAME, _.ObjectTypes.app),
        new _.Relationship(_.RelationshipTypes.created, null, true),
        new _.Subject(user._id, _.ObjectTypes.user) ).Save()
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)