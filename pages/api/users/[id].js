import mongoose from 'mongoose'
import { Mongo } from '/services/mongo'
import { User } from '/models'
import Auth from '/components/auth/api'
import { getUser } from './'

async function update( id, changes ){
    return Mongo( async () => {
        try {
            const item = await User.findByIdAndUpdate( id , changes, { new : true } )
            return item ? JSON.parse(JSON.stringify(item)) : null
        } catch (error) {
            // console.error(error);
            return null
        }
    } )
}

async function remove( id ){
    return updateUser( id, { deleted: true, deletedAt: new Date() } )
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
            item ? res.status(200).json(item) : res.status(400).end() 
            break;
        case 'DELETE' :
            item = await await remove(id)
            item ? res.status(200).end() : res.status(400).end() 
            break;
        case 'PATCH' :
            const active = { body }
            item = await update( id, { active } )
            item ? 
                res.status(200).json(item) :
                res.status(400).end()
            break;
        default:
            res.status(507).end('Method not allowed')
            break;
    }
}

export default Auth(handler)