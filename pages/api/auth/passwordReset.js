import bcrypt from 'bcrypt'
import connectDB from '/services/mongo'
import { User } from '/models'
import TokenGen from "rand-token"
import SendMail, { Templates } from '../../../services/mail'

const handler = async (req, res) => {
    if(req.method === 'POST'){
        try {
            const user = await User.findOne({ $or : [
                { username: req.body.reference },
                { email: req.body.reference }
            ] })
    
            if(!user){ 
                res.status(404).json({ error : 'Usuário não cadastrado.' })
            }

            const randonNewPassword = TokenGen.generate(6)
            const salt = bcrypt.genSaltSync()

            await User.findByIdAndUpdate(user.id, { password : bcrypt.hashSync( randonNewPassword, salt ) } )
            SendMail( Templates.forgetPassword , `${user.name} <${user.email}>`, { newPassword : randonNewPassword })

            res.status(200).end()
        } catch (error) {
            // console.error(error)
            res.status(500).end()
        }
    }else{
        res.status(405).send("Method Not Allowed")
    }
}

export default connectDB(handler)