import { Mongo } from '/services/mongo'
import { User } from '/models'
import Auth from '/components/auth/api'
import { getUser } from './'

async function updateUser( id, changes ){
    return Mongo( async () => {
        try {
            const item = await User.findByIdAndUpdate( id , changes, { new : true } )
            return item ? JSON.parse(JSON.stringify(item)) : null
        } catch (error) {
            console.error(error);
            return {}
        }
    } )
}

async function inactiveUser( id ){
    return updateUser( id, { active: false } )
}

async function activeUser( id ){
    return updateUser( id, { active: true } )
}

async function removeUser( id ){
    return updateUser( id, { deleted: true, deletedAt: new Date() } )
}

async function handler({ method, body, query }, res){ 
    const { id } = query
    
    let item = await getUser( id )

    if( !item ){
        res.status(404).end()
    }

    switch (method) {
        case 'GET' :
            res.status(200).json(item)
            break;
        case 'PUT' :
            item = await updateUser( id, body )
            res.status(200).json(item)
            break;
        case 'DELETE' :
            await removeUser(id)
            res.status(200)
            break;
        case 'PATCH' :
            item = item.active ? await inactiveUser( id ) : await activeUser( id )
            res.status(200).json(item)
            break;
        default:
            res.status(507).end('Method not allowed')
            break;
    }
}

handler.roles = 'admin'

export default Auth(handler)