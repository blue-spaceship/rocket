import mongoose from 'mongoose'

import { UserSchema } from '/models/user'
import { RoleSchema } from '/models/role'
import { ToDoSchema } from '/models/todo'

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
export const Role = mongoose.models.Role || mongoose.model('Role', RoleSchema)
export const Todo = mongoose.models.Todo || mongoose.model('Todo', ToDoSchema)

export default { User, Role, Todo }