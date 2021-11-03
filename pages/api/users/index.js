import { Mongo } from '/services/mongo'
import { User } from '/models'

import Auth from '/components/auth/api'
import Rules from '/components/auth/rules'

export async function getUser( id ){
    return Mongo( async () => {
        try {
            const item = await User.findById( id )
            return item ? JSON.parse(JSON.stringify(item)) : null
        } catch (error) {
            // console.error(error);
            return null
        }
    } )
}

export async function getUsers( args ){
    return Mongo( async () => {
        try {
            const list = await User.find( args ).sort({ active: -1, name: 1 })
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
            const _ = await new User( data )
            const saved = await _.save()
            return saved
        } catch (error) {
            console.error(error);
            return false
        }
    })
}

async function handler({ method, query, body }, res){
    switch (method) {
        case 'GET' :
            const list = await getUsers( query )
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
            res.status(405).end('Method not allowed')
            break;
    }
}

handler.auth = Rules["/api/users"]

export default Auth(handler)
