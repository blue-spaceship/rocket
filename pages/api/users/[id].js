import { Mongo } from '/services/mongo'
import { User } from '/models'
import Auth from '/components/auth/api'

export async function getUser( id ){
    return Mongo( async () => {
        try {
            const item = await User.findById( id )
            return item ? JSON.parse(JSON.stringify(item)) : null
        } catch (error) {
            console.error(error);
            return {}
        }
    } )
}

async function handler(req, res){
    const { id } = req.query
    const user = await getUser( id )

    if(user){
        res.status(200).json(user)
    }else{
        res.status(404)
    }
}

handler.roles = 'admin'

export default Auth(handler)