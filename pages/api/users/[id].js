import mongoose from 'mongoose'
import { Mongo } from '/services/mongo'
import { User } from '/models'

import { getUser } from './'

import Auth from '/components/auth/api'
import Rules from '/components/auth/rules'
import _ from '/services/pipeless'

async function update( id, changes ){
    return Mongo( async () => {
        try {
            const item = await User.findByIdAndUpdate( id , changes, { new : true } )
            return item ? JSON.parse(JSON.stringify(item)) : null
        } catch (error) {
            return null
        }
    } )
}

async function remove( id ){
    return update( id, { deleted: true, deletedAt: new Date() } )
}

async function handler({ method, body, query }, res){ 
    const { id } = query

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end('Invalid ID')
    }
    
    let item = await getUser( id )

    if(item === null && !item){
        return res.status(404).end()
    }

    switch (method) {
        case 'GET' :
            res.status(200).json(item)
            break;
        case 'PUT' :
            item = await update( id, body )
            if(item){
                await new _.Event( 
                    _.Subject.User( body.token._id || 'unknown'), 
                    _.Relationship.Updated(),
                    _.Subject.User(item._id)
                ).Save()
                res.status(200).json(item)
            }else{
                res.status(400).end()
            }
            break;
        case 'DELETE' :
            item = await await remove(id)
            if(item){
                await new _.Event( 
                    _.Subject.User( body.token._id || 'unknown'), 
                    _.Relationship.Deleted(),
                    _.Subject.User(item._id)
                ).Save()
                res.status(200).json(item)
            }else{
                res.status(400).end()
            }
            break;
        case 'PATCH' :
            const { active } = body
            item = await update( id, { active } )
            if(item){
                await new _.Event( 
                    _.Subject.User( body.token._id || 'unknown'), 
                    _.Relationship.Status(item.active),
                    _.Subject.User(item._id)
                ).Save()
                res.status(200).json(item)
            }else{
                res.status(400).end()
            }
            break;
        default:
            res.status(405).end('Method not allowed')
            break;
    }
}

handler.auth = Rules["/api/users/[id]"]

export default Auth(handler)