import connectDB from '/services/mongo'
import { Role } from '/models'

const roles = [
    { slug: 'admin', name: 'Administrador' },
    { slug: 'user-manager', name: 'Gerenciar Usuários' },
    { slug: 'roles-manager', name: 'Gerenciar Papeis' }
]

const handler = async (req, res) => {
    if(req.method === 'GET' && process.env.NEXT_INSTALL_CONFIG === "true"){
        const counter = await Role.countDocuments()
        if(counter === 0){
            await Role.create(roles)
            return res.status(200).end('Seed criado')
        }else{
            return res.status(201).end('Já foi semeado')
        }        
    }else{
        res.status(404)
    }

    res.end()
}

export default connectDB(handler)