import mongoose from 'mongoose'

import { UserSchema } from '/models/user'
import { RoleSchema } from '/models/role'

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
export const Role = mongoose.models.Role || mongoose.model('Role', RoleSchema)