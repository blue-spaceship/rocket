import bcrypt from 'bcrypt'
import connectDB from '/services/mongo'
import { User } from '/models'

const handler = async (req, res) => {
    if(req.method === 'GET' && process.env.NEXT_INSTALL_CONFIG === "true"){
        const counter = await User.countDocuments()
        if(counter === 0){
            // const { username, password, email } = req.body

            const username = 'admin'
            const password = 'admin'
            const name = "Willian Rodrigues"
            const email = 'w.almeida.w@gmail.com'

            const salt = bcrypt.genSaltSync()
            const seed = new User({
                username,
                password: bcrypt.hashSync(password, salt),
                email,
                name,
                roles: 'admin'
            })
            await seed.save()
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