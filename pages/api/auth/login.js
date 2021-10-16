import bcrypt from 'bcrypt'
import connectDB from '/services/mongo'
import { User } from '/models/index'

const handler = async (req, res) => {
    if(req.method === 'POST'){
        try {
            const user = await User.findOne({ username: req.body.username }).select('+password')
    
            if(!user){ 
                res.status(404).json({ error : 'Usuário não cadastrado.' })
            }
    
            else{
                const result = await bcrypt.compare(req.body.password, user.password)
                if(result){
                    const _user = await User.findById(user._id)
                    res.status(200).json( _user )
                }else{
                    res.status(401).json({ error : 'Senha incorreta.' })
                }
            }
        } catch (e) {
            res.status(500).end()
        }
    }else{
        res.status(405).send("Method Not Allowed")
    }
}

export default connectDB(handler)