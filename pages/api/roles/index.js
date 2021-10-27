import { Mongo } from '/services/mongo'
import { Role } from '/models'
import Auth from '/components/auth/api'

export async function getRole( id ){
    return Mongo( async () => {
        try {
            const item = await Role.findById( id )
            return item ? JSON.parse(JSON.stringify(item)) : null
        } catch (error) {
            // console.error(error);
            return null
        }
    } )
}

export async function getRoles( args ){
    return Mongo( async () => {
        try {
            const list = await Role.find( args )
            return JSON.parse(JSON.stringify(list))
        } catch (error) {
            // console.error(error);
            return []
        }
    } )
}

async function add( data ){
    return Mongo( async () => {
        try {
            const _ = await new Role( data )
            const saved = await _.save()
            return saved
        } catch (error) {
            return false
        }
    })
}

async function handler({ method, query, body }, res){
    switch (method) {
        case 'GET' :
            const list = await getRoles( query )
            res.status(200).json(list)
            break;
        case 'POST' :
            const item = await add(body)
            if(item){
                res.status(200).json(item)
            }else{
                res.status(400).end()
            }
            break;
        default:
            res.status(507).end('Method not allowed')
            break;
    }
}

export default Auth(handler)