import { Mongo } from '/services/mongo'
import { Role } from '/models'

import { getRole } from './'

import Auth from '/components/auth/api'
import Rules from '/components/auth/rules'


async function update( id, changes ){
    return Mongo( async () => {
        try {
            const item = await Role.findByIdAndUpdate( id , changes, { new : true } )
            return item ? JSON.parse(JSON.stringify(item)) : null
        } catch (error) {
            // console.error(error);
            return null
        }
    } )
}

async function remove( id ){
    return update( id, { deleted: true, deletedAt: new Date() } )
}

async function handler({ method, body, query }, res){ 
    const { id } = query
    
    let item = await getRole( id )

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
            const { active } = body
            item = await update( id, { active } )
            item ? 
                res.status(200).json(item) :
                res.status(400).end()
            break;
        default:
            res.status(405).end('Method not allowed')
            break;
    }
}

handler.auth = Rules["/api/roles/[id]"]

export default Auth(handler)