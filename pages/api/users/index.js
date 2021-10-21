import { Mongo } from '/services/mongo'
import { User } from '/models'

export async function getUsers( args ){
    return Mongo( async () => {
        try {
            const list = await User.find( args )
            return JSON.parse(JSON.stringify(list))
        } catch (error) {
            console.error(error);
            return []
        }
    } )
}

async function handler({ method, query }, res){
    if(method === 'GET'){
        const list = await getUsers( query )
        res.status(200).json(list)
    }else{
        res.status(507).end('Method not allowed')
    }
}
export default handler